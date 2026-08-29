import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { readFileSync } from 'node:fs';

const packageMetadata = JSON.parse(readFileSync('package.json', 'utf8')) as { version: string };

async function expectNoSeriousAxeIssues(page: Page) {
  const result = await new AxeBuilder({ page }).analyze();
  const serious = result.violations.filter(item => item.impact === 'serious' || item.impact === 'critical');
  expect(serious, serious.map(item => `${item.id}: ${item.help}`).join('\n')).toEqual([]);
}

test('landing page explains the job and has a sound document outline', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('Linux Kid Lab — Pick local creative activities');
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Pick one creative activity after school');
  await expect(page.getByRole('link', { name: 'Try it with sample data' })).toBeVisible();
  await expect(page.getByText('The paths show drawing, coding, and sound activities.')).toBeVisible();
  await expect(page.getByText(`Version ${packageMetadata.version}.`, { exact: false })).toBeVisible();
  await expect(page.getByText('One tape. Many ways to make.')).toHaveCount(0);
  await expect(page.locator('main')).toHaveCount(1);
  await expectNoSeriousAxeIssues(page);
});

test('@claim:twenty-activities the free shelf contains 20 activities', async ({ page }) => {
  await page.goto('/demo');
  await page.getByRole('button', { name: 'Ages 5–7' }).click();
  await expect(page.locator('.activity-card')).toHaveCount(20);
  await expect(page.getByText('20 activities', { exact: true })).toBeVisible();
});

test('@claim:three-steps every one of the 20 activity cards opens three steps', async ({ page }) => {
  await page.goto('/demo');
  await page.getByRole('button', { name: 'Ages 5–7' }).click();
  const activityIds = await page.locator('[data-open]').evaluateAll(buttons => buttons.map(button => button.getAttribute('data-open')));
  expect(activityIds).toHaveLength(20);
  for (const id of activityIds) {
    await page.locator(`[data-open="${id}"]`).click();
    await expect(page.locator('.activity-steps li')).toHaveCount(3);
    await page.getByRole('button', { name: 'Close activity' }).click();
  }
});

test('@claim:paper-alternatives every activity includes a paper alternative', async ({ page }) => {
  await page.goto('/demo');
  await page.getByRole('button', { name: 'Ages 5–7' }).click();
  const activityIds = await page.locator('[data-open]').evaluateAll(buttons => buttons.map(button => button.getAttribute('data-open')));
  expect(activityIds).toHaveLength(20);
  for (const id of activityIds) {
    await page.locator(`[data-open="${id}"]`).click();
    await expect(page.locator('.paper-alternative')).toContainText('Paper alternative');
    await expect(page.locator('.paper-alternative p')).not.toBeEmpty();
    await page.getByRole('button', { name: 'Close activity' }).click();
  }
});

test('@claim:local-progress completed activities survive a reload', async ({ page }) => {
  await page.goto('/demo');
  const card = page.locator('[data-open="maze-message"]').locator('..');
  await card.getByRole('button').click();
  await page.getByRole('button', { name: 'Stamp it made' }).click();
  await expect(page.locator('.progress-strip strong')).toHaveText('4 of 20');
  await page.reload();
  await expect(page.locator('.progress-strip strong')).toHaveText('4 of 20');
  await expect(page.locator('[data-open="maze-message"]').locator('..').locator('.stamp')).toContainText('Made');
});

test('@claim:demo-sandbox demo progress is isolated and resettable', async ({ page }) => {
  await page.goto('/demo');
  await expect(page.locator('.progress-strip strong')).toHaveText('3 of 20');
  await page.getByRole('link', { name: 'Parent setup' }).click();
  await page.getByRole('button', { name: 'Clear sample progress' }).click();
  await expect(page.getByRole('status')).toContainText('Sample progress cleared.');
  await page.getByRole('link', { name: 'Linux Kid Lab home' }).click();
  await expect(page.locator('.progress-strip strong')).toHaveText('0 of 20');
  await page.getByRole('link', { name: 'Demo' }).click();
  await page.getByRole('button', { name: 'Reset demo' }).click();
  await expect(page.locator('.progress-strip strong')).toHaveText('3 of 20');
  await page.getByRole('button', { name: 'Start for real' }).click();
  await expect(page).toHaveURL('/');
  await expect(page.locator('.progress-strip strong')).toHaveText('0 of 20');
});

test('@claim:demo-indexeddb demo data uses its own IndexedDB database', async ({ page }) => {
  await page.goto('/demo');
  const beforeLeaving = await page.evaluate(async () => (await indexedDB.databases()).map(database => database.name));
  expect(beforeLeaving).toContain('demo:linux-kid-lab');
  expect(beforeLeaving).not.toContain('linux-kid-lab');
  await page.getByRole('button', { name: 'Start for real' }).click();
  await expect(page.locator('.progress-strip strong')).toHaveText('0 of 20');
  const afterLeaving = await page.evaluate(async () => (await indexedDB.databases()).map(database => database.name));
  expect(afterLeaving).toContain('linux-kid-lab');
  expect(afterLeaving).not.toContain('demo:linux-kid-lab');
});

test('@claim:json-export exports progress as JSON', async ({ page }) => {
  await page.goto('/demo');
  await page.getByRole('link', { name: 'Parent setup' }).click();
  await expect(page).toHaveURL(/\/settings\?demo=1/);
  const downloadEvent = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Export progress as JSON' }).click();
  const download = await downloadEvent;
  expect(download.suggestedFilename()).toBe('linux-kid-lab-progress.json');
  const body = await (await download.createReadStream()).toArray();
  const data = JSON.parse(Buffer.concat(body).toString('utf8'));
  expect(data.version).toBe(1);
  expect(Object.keys(data.completed)).toHaveLength(3);
});

test('@claim:json-import imports valid progress and applies it to the shelf', async ({ page }) => {
  await page.goto('/settings?demo=1');
  const imported = {
    version: 1,
    bands: ['5–7'],
    completed: { 'shape-creature': '2026-08-28' },
    twists: { 'shape-creature': 2 }
  };
  await page.locator('#import-file').setInputFiles({
    name: 'linux-kid-lab-progress.json',
    mimeType: 'application/json',
    buffer: Buffer.from(JSON.stringify(imported))
  });
  await expect(page.getByRole('status')).toContainText('Progress imported.');
  await page.goto('/demo');
  await expect(page.locator('.activity-card')).toHaveCount(7);
  await expect(page.locator('[data-open="shape-creature"]').locator('..').locator('.stamp')).toContainText('Made');
});

test('@claim:clear-progress parents can clear saved progress', async ({ page }) => {
  await page.goto('/');
  await page.locator('[data-open="maze-message"]').click();
  await page.getByRole('button', { name: 'Stamp it made' }).click();
  await expect(page.locator('.progress-strip strong')).toHaveText('1 of 20');
  await page.getByRole('link', { name: 'Parent setup' }).click();
  page.once('dialog', dialog => dialog.accept());
  await page.getByRole('button', { name: 'Clear saved progress' }).click();
  await expect(page.getByRole('status')).toContainText('Saved progress cleared.');
  await page.getByRole('link', { name: 'Linux Kid Lab home' }).click();
  await expect(page.locator('.progress-strip strong')).toHaveText('0 of 20');
});

test('@claim:open-tool-suggestion every activity has a working official tool link', async ({ page, request }) => {
  const officialToolUrls = new Set([
    'https://tuxpaint.org/',
    'https://www.audacityteam.org/',
    'https://www.piskelapp.com/',
    'https://www.libreoffice.org/',
    'https://scratch.mit.edu/projects/editor/',
    'https://krita.org/',
    'https://github.com/inkscape/inkscape/releases/latest',
    'https://stellarium.org/'
  ]);
  await page.goto('/demo');
  await page.getByRole('button', { name: 'Ages 5–7' }).click();
  const activityIds = await page.locator('[data-open]').evaluateAll(buttons => buttons.map(button => button.getAttribute('data-open')));
  expect(activityIds).toHaveLength(20);
  const usedUrls = new Set<string>();
  for (const id of activityIds) {
    await page.locator(`[data-open="${id}"]`).click();
    const links = page.locator('.tool-row a');
    expect(await links.count(), `${id} needs an open-tool suggestion`).toBeGreaterThan(0);
    for (let index = 0; index < await links.count(); index += 1) {
      const href = await links.nth(index).getAttribute('href');
      expect(href, `${id} must use an approved official destination`).not.toBeNull();
      expect(officialToolUrls.has(href!)).toBe(true);
      usedUrls.add(href!);
    }
    await page.getByRole('button', { name: 'Close activity' }).click();
  }
  expect(usedUrls).toEqual(officialToolUrls);
  for (const url of officialToolUrls) {
    const response = await request.get(url, { failOnStatusCode: false, maxRedirects: 5, timeout: 20_000 });
    expect(response.status(), `${url} must be reachable from the shipped open-tool link`).toBeGreaterThanOrEqual(200);
    expect(response.status(), `${url} must be reachable from the shipped open-tool link`).toBeLessThan(400);
  }
});

test('@claim:print-tokens completed activities produce printable tokens', async ({ page }) => {
  await page.goto('/demo');
  await page.getByRole('link', { name: 'Print progress tokens' }).click();
  await expect(page).toHaveURL(/\/print\?demo=1/);
  await expect(page.locator('.token')).toHaveCount(3);
  await expect(page.getByRole('button', { name: 'Print this sheet' })).toBeVisible();
});

test('@claim:local-privacy the demo activity flow makes only same-origin requests', async ({ page }) => {
  const origins = new Set<string>();
  page.on('request', request => origins.add(new URL(request.url()).origin));
  await page.goto('/demo');
  await page.locator('[data-open="one-button"]').click();
  await page.getByRole('button', { name: 'Give me another twist' }).click();
  await page.getByRole('button', { name: 'Close activity' }).click();
  expect([...origins]).toEqual(['http://127.0.0.1:4173']);
});

test('@claim:offline-reload the demo reloads after the network is disabled', async ({ page, context }) => {
  await page.goto('/demo');
  await page.evaluate(() => navigator.serviceWorker.ready);
  await page.reload();
  await expect.poll(() => page.evaluate(() => Boolean(navigator.serviceWorker.controller))).toBe(true);
  const cachedBytes = await page.evaluate(async () => {
    const cache = await caches.open('linux-kid-lab-v10');
    const keys = await cache.keys();
    const assets = keys.filter(key => /\/assets\/.*\.(js|css)$/.test(new URL(key.url).pathname));
    return Promise.all(assets.map(async asset => (await (await cache.match(asset))?.text())?.length ?? 0));
  });
  expect(cachedBytes).toHaveLength(2);
  expect(cachedBytes.every(size => size > 1_000)).toBe(true);
  await context.setOffline(true);
  await page.reload({ waitUntil: 'domcontentloaded' });
  await expect(page.getByRole('heading', { level: 1 })).toHaveText("Pick the sample family’s next activity");
  await expect(page.locator('.activity-card').first()).toBeVisible();
});

test('activity dialog contains immediate reverse-Tab, handles global Escape, and restores its opener', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/demo');
  const opener = page.locator('[data-open="maze-message"]');
  await opener.focus();
  await page.keyboard.press('Enter');
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await expect(page.getByRole('button', { name: 'Stamp it made' })).toBeFocused();
  expect(await page.evaluate(() => Boolean(document.activeElement?.closest('[role="dialog"]')))).toBe(true);
  await page.keyboard.press('Escape');
  await expect(opener).toBeFocused();

  await page.keyboard.press('Enter');
  await expect(dialog).toBeFocused();
  await page.locator('footer a[href*="github.com"]').focus();
  expect(await page.evaluate(() => Boolean(document.activeElement?.closest('[role="dialog"]')))).toBe(false);
  await page.keyboard.press('Escape');
  await expect(dialog).toHaveCount(0);
  await expect(opener).toBeFocused();

  const widths = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, client: document.documentElement.clientWidth }));
  expect(widths.scroll).toBeLessThanOrEqual(widths.client);
  await expectNoSeriousAxeIssues(page);
});

test('@claim:no-accounts-or-ads the demo asks for no account and contains no ads or chat', async ({ page }) => {
  await page.goto('/privacy?demo=1');
  await expect(page.getByText('There are no accounts, ads, chat, scores, or behavior tracking.')).toBeVisible();
  await expect(page.locator('input[type="password"], iframe, [role="dialog"][aria-label*="chat" i]')).toHaveCount(0);
  const sources = await page.locator('[src]').evaluateAll(nodes => nodes.map(node => node.getAttribute('src')));
  expect(sources.filter(source => source?.startsWith('http'))).toEqual([]);
});

test('@claim:local-age-bands parent age choices remain in the demo browser after reload', async ({ page }) => {
  await page.goto('/demo');
  await page.getByRole('link', { name: 'Parent setup' }).click();
  await page.getByLabel('Ages 5–7').check();
  await page.getByRole('button', { name: 'Save age bands' }).click();
  await page.reload();
  await expect(page.getByLabel('Ages 5–7')).toBeChecked();
  await expect(page.getByLabel('Ages 8–10')).toBeChecked();
  await expect(page.getByLabel('Ages 11–13')).toBeChecked();
});

test('mobile first-read shows the demo action before the fold', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const action = await page.getByRole('link', { name: 'Try it with sample data' }).boundingBox();
  expect(action).not.toBeNull();
  expect(action!.y + action!.height).toBeLessThanOrEqual(844);
});

test('the direct ?demo=1 entry opens the populated sample shelf', async ({ page }) => {
  await page.goto('/?demo=1');
  await expect(page).toHaveTitle('Demo — Linux Kid Lab');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Pick the sample family’s next activity');
  await expect(page.getByLabel('Demo mode')).toBeVisible();
  await expect(page.locator('.activity-card')).toHaveCount(13);
  await expect(page.getByRole('button', { name: 'Reset demo' })).toBeVisible();
});

test('static deployment config gives unknown paths a real 404 and hashes get immutable caching', () => {
  const config = JSON.parse(readFileSync('public/staticwebapp.config.json', 'utf8'));
  expect(config.navigationFallback).toBeUndefined();
  expect(config.responseOverrides['404']).toEqual({ rewrite: '/404.html', statusCode: 404 });
  expect(config.routes.slice(0, 7).map((route: { route: string }) => route.route)).toEqual(['/', '/demo', '/settings', '/privacy', '/terms', '/print', '/404']);
  expect(config.routes.find((route: { route: string }) => route.route === '/assets/*').headers['Cache-Control']).toBe('public, max-age=31536000, immutable');
  expect(config.mimeTypes['.avif']).toBe('image/avif');
  const manifest = JSON.parse(readFileSync('public/manifest.webmanifest', 'utf8'));
  expect(manifest.start_url).toBe(`/?v=${packageMetadata.version}`);
});

test('a real static 404 keeps its cassette styling under style-src self without a CSP console error', async ({ page }) => {
  const pageErrors: string[] = [];
  const notFound = readFileSync('public/404.html', 'utf8');
  const styles = readFileSync('public/404.css', 'utf8');
  page.on('console', message => { if (message.type() === 'error') pageErrors.push(message.text()); });
  await page.route('**/missing-tape', route => route.fulfill({
    status: 404,
    contentType: 'text/html',
    headers: { 'Content-Security-Policy': "default-src 'self'; style-src 'self'" },
    body: notFound
  }));
  await page.route('**/404.css', route => route.fulfill({ status: 200, contentType: 'text/css', body: styles }));
  const response = await page.goto('/missing-tape');
  expect(response?.status()).toBe(404);
  await expect(page.locator('style')).toHaveCount(0);
  await expect(page.locator('link[rel="stylesheet"]')).toHaveAttribute('href', '/404.css');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://linux-kid-lab.sociobot.in/404');
  await expect(page.locator('meta[name="description"]')).toHaveCount(1);
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', 'https://linux-kid-lab.sociobot.in/social-card.webp');
  await expect(page.locator('header .wordmark')).toHaveText(/Linux Kid Lab/);
  await expect(page.locator('footer a[href="/privacy"]')).toHaveCount(1);
  await expect(page.locator('footer a[href="/terms"]')).toHaveCount(1);
  await expect(page.locator('main')).toHaveCount(1);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('This tape has no activity');
  await expect(page.locator('.tape')).toHaveCSS('color', 'rgb(184, 46, 46)');
  // Chromium reports an HTTP 404 navigation as a resource error. It is not a
  // page error; the regression is for the previously emitted CSP error.
  expect(pageErrors.filter(error => !error.includes('server responded with a status of 404'))).toEqual([]);
});

const routeMatrixCases = [
  { path: '/', label: 'home' },
  { path: '/demo', label: 'demo' },
  { path: '/settings?demo=1', label: 'parent setup' },
  { path: '/privacy?demo=1', label: 'privacy' },
  { path: '/terms?demo=1', label: 'terms' },
  { path: '/print?demo=1', label: 'print' },
  { path: '/missing-tape', label: 'not found' }
];

const routeMatrixViewports = [
  { width: 1440, height: 900, label: 'desktop' },
  { width: 390, height: 844, label: 'mobile' }
];

test.describe('@regression:route-matrix routes are independently ready before visual and accessibility checks', () => {
  // Axe walks the rendered document. Twenty seconds covers a cold IndexedDB
  // open, service-worker registration, and one complete axe scan, while still
  // failing a genuinely stalled route quickly. The old test attempted 28 such
  // scans under one 30-second timeout.
  test.setTimeout(20_000);

  for (const viewport of routeMatrixViewports) {
    for (const colorScheme of ['light', 'dark'] as const) {
      for (const route of routeMatrixCases) {
        test(`${viewport.label} ${colorScheme} ${route.label} preserves structure, reflow, reduced motion, and axe`, async ({ page }) => {
          await page.setViewportSize(viewport);
          await page.emulateMedia({ colorScheme, reducedMotion: 'reduce' });
          await page.goto(route.path, { waitUntil: 'domcontentloaded' });
          await expect(page.locator('#app[data-ready="true"]')).toHaveCount(1);
          await expect(page.locator('h1')).toHaveCount(1);
          await expect(page.locator('main')).toHaveCount(1);
          const layout = await page.evaluate(() => ({
            clientWidth: document.documentElement.clientWidth,
            scrollWidth: document.documentElement.scrollWidth,
            animationDurations: [...document.querySelectorAll<HTMLElement>('body *')].map(element => getComputedStyle(element).animationDuration),
            transitionDurations: [...document.querySelectorAll<HTMLElement>('body *')].map(element => getComputedStyle(element).transitionDuration)
          }));
          expect(layout.scrollWidth, `${route.path} overflowed at ${viewport.width}px in ${colorScheme}`).toBeLessThanOrEqual(layout.clientWidth);
          expect(layout.animationDurations.every(duration => duration === '0s'), `${route.path} animated with reduced motion`).toBe(true);
          expect(layout.transitionDurations.every(duration => duration === '0s'), `${route.path} transitioned with reduced motion`).toBe(true);
          await expectNoSeriousAxeIssues(page);
        });
      }
    }
  }
});

test('every mobile interactive target is at least 44 by 44 CSS pixels', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const path of ['/', '/demo', '/settings?demo=1', '/privacy?demo=1', '/terms?demo=1', '/print?demo=1']) {
    await page.goto(path);
    const sizes = await page.locator('a:visible, button:visible, input:visible, summary:visible, select:visible, textarea:visible, [tabindex]:not([tabindex="-1"]):visible').evaluateAll(nodes => [...new Set(nodes)].map(node => {
      const rect = node.getBoundingClientRect();
      return {
        target: (node.textContent || node.getAttribute('aria-label') || node.getAttribute('name') || node.tagName).trim().replace(/\s+/g, ' ').slice(0, 80),
        width: Number(rect.width.toFixed(1)),
        height: Number(rect.height.toFixed(1))
      };
    }));
    expect(sizes.length, `${path} should expose interactive targets`).toBeGreaterThan(0);
    expect(sizes.filter(size => size.width < 44 || size.height < 44), `${path}: ${JSON.stringify(sizes)}`).toEqual([]);
  }
  await page.goto('/demo');
  await page.locator('[data-open="maze-message"]').click();
  const dialogSizes = await page.locator('[role="dialog"] a:visible, [role="dialog"] button:visible, [role="dialog"] input:visible, [role="dialog"] summary:visible, [role="dialog"] [tabindex]:not([tabindex="-1"]):visible').evaluateAll(nodes => [...new Set(nodes)].map(node => {
    const rect = node.getBoundingClientRect();
    return { target: (node.textContent || node.getAttribute('aria-label') || node.tagName).trim().replace(/\s+/g, ' ').slice(0, 80), width: Number(rect.width.toFixed(1)), height: Number(rect.height.toFixed(1)) };
  }));
  expect(dialogSizes.filter(size => size.width < 44 || size.height < 44), `dialog: ${JSON.stringify(dialogSizes)}`).toEqual([]);
});

test('privacy, terms, and unknown routes have distinct titles and one h1', async ({ page }) => {
  for (const [path, title] of [
    ['/privacy', 'Privacy — Linux Kid Lab'],
    ['/terms', 'Terms — Linux Kid Lab'],
    ['/missing-tape', 'Page not found — Linux Kid Lab']
  ]) {
    await page.goto(path);
    await expect(page).toHaveTitle(title);
    await expect(page.locator('h1')).toHaveCount(1);
  }
});
