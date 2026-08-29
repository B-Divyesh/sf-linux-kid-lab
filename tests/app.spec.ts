import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { readFileSync } from 'node:fs';

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
  await page.getByRole('button', { name: 'Reset demo' }).click();
  await expect(page.locator('.progress-strip strong')).toHaveText('3 of 20');
  await page.getByRole('button', { name: 'Start for real' }).click();
  await expect(page).toHaveURL('/');
  await expect(page.locator('.progress-strip strong')).toHaveText('0 of 20');
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
    const cache = await caches.open('linux-kid-lab-v6');
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

test('keyboard dialog restores focus and the 390px layout does not overflow', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/demo');
  const opener = page.locator('[data-open="maze-message"]');
  await opener.focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('dialog')).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(opener).toBeFocused();
  const widths = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, client: document.documentElement.clientWidth }));
  expect(widths.scroll).toBeLessThanOrEqual(widths.client);
  await expectNoSeriousAxeIssues(page);
});

test('@claim:paid-pack license verification activates the paid print pack', async ({ page }) => {
  await page.route('https://api.sociobot.in/api/v1/products/linux-kid-lab/verify?license=test-license', route => route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify({ valid: true, reason: 'ok', expires_at: null })
  }));
  await page.goto('/demo');
  await page.getByRole('link', { name: 'Linux Kid Lab home' }).click();
  await expect(page).toHaveURL(/\/?demo=1/);
  await page.getByText('Have a license?').click();
  await page.getByLabel('Paste your license').fill('test-license');
  await page.getByRole('button', { name: 'Verify license' }).click();
  await expect(page.getByText('Pack active on this device')).toBeVisible();
  await page.getByRole('link', { name: 'Print the activity pack' }).click();
  await expect(page.locator('.print-card-grid article')).toHaveCount(20);
  await expect(page.getByRole('heading', { name: 'Four-week weekend mix' })).toBeVisible();
  await expect(page.locator('.weekend-mix li')).toHaveText([
    'Week 1: Shape creature and maze message',
    'Week 2: Loop beat and secret alphabet',
    'Week 3: Moon postcard and one-button toy',
    'Week 4: Paper controller and remix rules'
  ]);
});

test('@claim:no-accounts-or-ads the demo asks for no account and contains no ads or chat', async ({ page }) => {
  await page.goto('/demo');
  await page.getByRole('link', { name: 'Linux Kid Lab home' }).click();
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

test('@claim:license-privacy an explicit license check sends a token only to Sociobot billing', async ({ page }) => {
  const requests: string[] = [];
  page.on('request', request => requests.push(request.url()));
  await page.route('https://api.sociobot.in/api/v1/products/linux-kid-lab/verify?license=test-license', route => route.fulfill({
    status: 200, contentType: 'application/json', body: JSON.stringify({ valid: false, reason: 'invalid' })
  }));
  await page.goto('/demo');
  await page.getByRole('link', { name: 'Linux Kid Lab home' }).click();
  await page.getByText('Have a license?').click();
  await page.getByLabel('Paste your license').fill('test-license');
  await page.getByRole('button', { name: 'Verify license' }).click();
  await expect(page.getByText('This license is not active. Check the token or use the buy link.')).toBeVisible();
  const external = requests.filter(url => new URL(url).origin !== 'http://127.0.0.1:4173');
  expect(external).toEqual(['https://api.sociobot.in/api/v1/products/linux-kid-lab/verify?license=test-license']);
});

test('mobile first-read shows the demo action before the fold', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const action = await page.getByRole('link', { name: 'Try it with sample data' }).boundingBox();
  expect(action).not.toBeNull();
  expect(action!.y + action!.height).toBeLessThanOrEqual(844);
});

test('invalid license recovery remains open and visible', async ({ page }) => {
  await page.route('https://api.sociobot.in/api/v1/products/linux-kid-lab/verify?license=not-active', route => route.fulfill({
    status: 200, contentType: 'application/json', body: JSON.stringify({ valid: false, reason: 'invalid' })
  }));
  await page.goto('/demo');
  await page.getByRole('link', { name: 'Linux Kid Lab home' }).click();
  await page.getByText('Have a license?').click();
  await page.getByLabel('Paste your license').fill('not-active');
  await page.getByRole('button', { name: 'Verify license' }).click();
  await expect(page.locator('details')).toHaveAttribute('open', '');
  await expect(page.getByText('This license is not active. Check the token or use the buy link.')).toBeVisible();
});

test('an unavailable purchase setup never renders a dead checkout link', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('Purchase setup is unavailable right now. The free shelf and progress tokens remain available.')).toBeVisible();
  await expect(page.locator('a[href*="api.sociobot.in/api/v1/products/linux-kid-lab/checkout"]')).toHaveCount(0);
});

test('static deployment config gives unknown paths a real 404 and hashes get immutable caching', () => {
  const config = JSON.parse(readFileSync('public/staticwebapp.config.json', 'utf8'));
  expect(config.navigationFallback).toBeUndefined();
  expect(config.responseOverrides['404']).toEqual({ rewrite: '/404.html', statusCode: 404 });
  expect(config.routes.slice(0, 7).map((route: { route: string }) => route.route)).toEqual(['/', '/demo', '/settings', '/privacy', '/terms', '/print', '/404']);
  expect(config.routes.find((route: { route: string }) => route.route === '/assets/*').headers['Cache-Control']).toBe('public, max-age=31536000, immutable');
});

test('dark system theme has no serious axe issues on every product route', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark', reducedMotion: 'reduce' });
  for (const path of ['/', '/demo', '/settings?demo=1', '/privacy?demo=1', '/terms?demo=1', '/print?demo=1', '/missing-tape']) {
    await page.goto(path);
    await expectNoSeriousAxeIssues(page);
  }
});

test('mobile header, footer, tool links, and age checkboxes have 44px targets', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/settings?demo=1');
  const sizes = await page.locator('.site-header a, footer a, .tool-list a, .band-list input').evaluateAll(nodes => nodes.filter(node => getComputedStyle(node).display !== 'none').map(node => {
    const rect = node.getBoundingClientRect();
    return { width: rect.width, height: rect.height };
  }));
  expect(sizes.length).toBeGreaterThan(0);
  expect(sizes.filter(size => size.width < 44 || size.height < 44), JSON.stringify(sizes)).toEqual([]);
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
