import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

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
  await page.goto('/');
  await page.getByRole('button', { name: 'Ages 11–13' }).click();
  await expect(page.locator('.activity-card')).toHaveCount(20);
  await expect(page.getByText('20 activities', { exact: true })).toBeVisible();
});

test('@claim:three-steps every activity card opens three steps', async ({ page }) => {
  await page.goto('/demo');
  const cards = page.locator('.activity-card');
  const count = await cards.count();
  for (let index = 0; index < count; index += 1) {
    await cards.nth(index).getByRole('button').click();
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
    const cache = await caches.open('linux-kid-lab-v4');
    const js = await cache.match('/assets/app.js');
    const css = await cache.match('/assets/app.css');
    return { js: (await js?.text())?.length ?? 0, css: (await css?.text())?.length ?? 0 };
  });
  expect(cachedBytes.js).toBeGreaterThan(1_000);
  expect(cachedBytes.css).toBeGreaterThan(1_000);
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
  await page.goto('/?demo=1');
  await page.getByText('Have a license?').click();
  await page.getByLabel('Paste your license').fill('test-license');
  await page.getByRole('button', { name: 'Verify license' }).click();
  await expect(page.getByText('Pack active on this device')).toBeVisible();
  await page.getByRole('link', { name: 'Print the activity pack' }).click();
  await expect(page.locator('.print-card-grid article')).toHaveCount(20);
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
