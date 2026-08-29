import './styles.css';
import { activities, bands, toolLinks, type Activity, type Band } from './activities';
import { clearDemo, demoState, freshState, loadState, saveState, type LabState } from './storage';

const app = document.querySelector<HTMLDivElement>('#app')!;
const slug = 'linux-kid-lab';
let demo = location.pathname === '/demo' || new URLSearchParams(location.search).get('demo') === '1';
let state: LabState = freshState();
let activeActivity: Activity | null = null;
let statusMessage = '';
let importError = '';
let licenseNotice = '';
let licenseDetailsOpen = false;
let lastActivityId = '';

const escapeHtml = (value: string) => value.replace(/[&<>'"]/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]!));
const licenseTokenKey = () => `${demo ? 'demo:' : ''}sb_license:${slug}`;
const licenseStatusKey = () => `${demo ? 'demo:' : ''}sb_license_status:${slug}`;
const isLicensed = () => {
  try { return JSON.parse(localStorage.getItem(licenseStatusKey()) || 'null')?.valid === true; }
  catch { return false; }
};

function routePath() {
  const known = ['/', '/demo', '/settings', '/privacy', '/terms', '/print', '/404'];
  return known.includes(location.pathname) ? location.pathname : '/404';
}

const titles: Record<string, string> = {
  '/':'Linux Kid Lab — Pick local creative activities',
  '/demo':'Demo — Linux Kid Lab',
  '/settings':'Parent setup — Linux Kid Lab',
  '/privacy':'Privacy — Linux Kid Lab',
  '/terms':'Terms — Linux Kid Lab',
  '/print':'Print tokens — Linux Kid Lab',
  '/404':'Page not found — Linux Kid Lab'
};

function header() {
  return `<a class="skip-link" href="#main">Skip to main content</a>
    ${demo ? `<aside class="demo-bar" aria-label="Demo mode"><strong>Demo — sample data, nothing is saved</strong><span><button class="text-button" data-action="reset-demo">Reset demo</button><button class="text-button" data-action="start-real">Start for real</button></span></aside>` : ''}
    <header class="site-header">
      <a class="wordmark" href="/" data-nav aria-label="Linux Kid Lab home"><span aria-hidden="true">▶</span> Linux Kid Lab</a>
      <nav aria-label="Main navigation">
        <a href="/#activities">Activities</a>
        <a href="/demo" data-nav>Demo</a>
        <a href="/settings" data-nav>Parent setup</a>
        <a href="/privacy" data-nav>Privacy</a>
      </nav>
    </header>`;
}

function footer() {
  return `<footer><p><strong>Linux Kid Lab</strong> — short local activities for young makers.</p>
    <nav aria-label="Footer navigation"><a href="/privacy" data-nav>Privacy</a><a href="/terms" data-nav>Terms</a><a href="https://hello-factory.sociobot.in/" rel="external">Built by Param Factory <span class="sr-only">(external)</span></a></nav>
    <p>Version 1.0.1 · Generated illustration disclosed in the <a href="https://github.com/B-Divyesh/sf-linux-kid-lab" rel="external">project notes <span class="sr-only">(external)</span></a>.</p></footer>`;
}

function shell(content: string) {
  return `${header()}<div id="route-status" class="sr-only" aria-live="polite"></div>${content}${footer()}
    <div id="app-status" class="toast ${statusMessage ? 'show' : ''}" role="status">${escapeHtml(statusMessage)}</div>
    <div id="offline-status" class="offline-chip" role="status" hidden>You are offline. Saved activities still work.</div>
    ${activeActivity ? activityDialog(activeActivity) : ''}`;
}

function facts() {
  return `<ul class="facts" aria-label="Product facts">
    <li><strong>Offline</strong><span>Works after the first visit</span></li>
    <li><strong>Private</strong><span>Progress stays on this device</span></li>
    <li><strong>Price</strong><span>20 activities are free</span></li>
  </ul>`;
}

function progressStrip() {
  const count = Object.keys(state.completed).length;
  return `<div class="progress-strip" aria-label="Activity progress">
    <div><span class="eyebrow">Your tape counter</span><strong>${count} of ${activities.length}</strong><span>activities made</span></div>
    <progress class="meter" value="${count}" max="${activities.length}" aria-label="${count} of ${activities.length} activities made">${count} of ${activities.length}</progress>
    <a class="small-link" href="/print" data-nav>Print progress tokens</a>
  </div>`;
}

function activityCard(activity: Activity) {
  const done = Boolean(state.completed[activity.id]);
  return `<article class="activity-card ${done ? 'done' : ''}" data-kind="${activity.kind}">
    <div class="tape-holes" aria-hidden="true"><i></i><i></i></div>
    <p class="card-meta"><span>${activity.band}</span><span>${activity.kind}</span><span>${activity.minutes} min</span></p>
    <h3>${escapeHtml(activity.title)}</h3>
    <p>${escapeHtml(activity.intro)}</p>
    <button class="card-action" data-open="${activity.id}">${done ? 'Make it again' : 'Start this activity'}</button>
    ${done ? '<span class="stamp" aria-label="Completed">✓ Made</span>' : ''}
  </article>`;
}

function activityShelf(showIntro = true) {
  const visible = activities.filter(a => state.bands.includes(a.band));
  const cards = visible.length ? visible.map(activityCard).join('') : `<div class="empty-state"><span aria-hidden="true">□ □ □</span><h3>Your shelf is empty</h3><p>Choose at least one age band to see activities.</p><a class="button secondary" href="/settings" data-nav>Choose age bands</a></div>`;
  return `<section id="activities" class="activity-section" aria-labelledby="activity-heading">
    ${showIntro ? `<div class="section-heading"><span class="eyebrow">The activity shelf</span><h2 id="activity-heading">Pick one thing to make</h2><p>Each card has three steps and one open tool suggestion.</p></div>` : `<h2 id="activity-heading" class="sr-only">Sample activity shelf</h2>`}
    <div class="filter-row" aria-label="Age band filters">${bands.map(b => `<button class="filter ${state.bands.includes(b) ? 'selected' : ''}" data-band="${b}" aria-pressed="${state.bands.includes(b)}">Ages ${b}</button>`).join('')}<span>${visible.length} activities</span></div>
    <div class="activity-grid">${cards}</div>
  </section>`;
}

function landing() {
  return shell(`<main id="main">
    <section class="hero poster-tear">
      <div class="hero-copy">
        <span class="kicker">A calm shelf for Linux families</span>
        <h1 tabindex="-1">Pick one creative activity after school</h1>
        <p class="lede">For parents whose child needs a next step after their first learning app.</p>
        <div class="hero-action"><a class="button primary" href="/demo" data-nav>Try it with sample data</a><span>Loads a sample family’s activity shelf.</span></div>
        ${facts()}
      </div>
      <figure class="hero-art"><picture><source srcset="/hero-cassette-640.avif 640w, /hero-cassette.avif 1024w" sizes="(max-width: 800px) calc(100vw - 64px), 520px" type="image/avif"><source srcset="/hero-cassette-640.webp 640w, /hero-cassette.webp 1024w" sizes="(max-width: 800px) calc(100vw - 64px), 520px" type="image/webp"><img src="/hero-cassette.jpg" width="1024" height="1024" alt="A cassette sends tape paths toward paper shapes, pixel art, and sound pads." fetchpriority="high" decoding="async"></picture><figcaption>One tape. Many ways to make.</figcaption></figure>
    </section>
    ${progressStrip()}
    ${activityShelf()}
    <section class="steps-section" aria-labelledby="how-heading"><div class="section-heading"><span class="eyebrow">How it works</span><h2 id="how-heading">From “what now?” to making</h2></div>
      <ol class="steps"><li><strong>Choose ages</strong><span>A parent picks one or more age bands.</span></li><li><strong>Pick a card</strong><span>A child follows three short steps.</span></li><li><strong>Stamp it made</strong><span>The device saves progress for next time.</span></li></ol>
    </section>
    <section class="privacy-block" aria-labelledby="boundaries-heading"><div><span class="eyebrow">Clear boundaries</span><h2 id="boundaries-heading">A launcher, not a lesson plan</h2></div><div><p>There are no accounts, ads, chat, scores, or behavior tracking.</p><p>Tool links may need an installed app or internet access. Every activity also works with paper.</p><a href="/privacy" data-nav>Read the privacy note</a></div></section>
    ${paidSection()}
  </main>`);
}

function demoPage() {
  return shell(`<main id="main" class="demo-main"><section class="demo-intro"><span class="kicker">Sample shelf for ages 8–13</span><h1 tabindex="-1">Pick the sample family’s next activity</h1><p>Three activities are complete. Open another card to see every step.</p></section>${progressStrip()}${activityShelf(false)}</main>`);
}

function paidSection() {
  const licensed = isLicensed();
  return `<section class="paid-section" aria-labelledby="pack-heading"><div class="price-sticker"><span>PACK</span><small>licensed</small></div><div><span class="eyebrow">Optional take-home pack</span><h2 id="pack-heading">Print the whole activity deck</h2><p>The free shelf includes all 20 activities and progress tokens.</p><p>An active pack license adds cut-out activity cards and a four-week weekend mix.</p>
    ${licensed ? `<p class="license-ok">✓ Pack active on this device</p><a class="button primary" href="/print?pack=1" data-nav>Print the activity pack</a>` : `<p class="purchase-unavailable" role="status">Purchase setup is unavailable right now. The free shelf and progress tokens remain available.</p>`}
    <details ${licenseDetailsOpen ? 'open' : ''}><summary>Have a license?</summary><form id="license-form"><label for="license">Paste your license</label><div class="inline-form"><input id="license" name="license" autocomplete="off" required><button class="button secondary" type="submit" aria-label="Verify license">Verify license</button></div><p class="form-note">Verification uses Sociobot billing. The free shelf stays available offline.</p><p class="error" role="status">${escapeHtml(licenseNotice)}</p></form></details>
    <p class="legal-note">Sociobot is the merchant of record. Refunds are handled there. See <a href="/terms" data-nav>terms</a>.</p></div></section>`;
}

function activityDialog(activity: Activity) {
  const twistIndex = state.twists[activity.id] ?? 0;
  const done = Boolean(state.completed[activity.id]);
  return `<div class="dialog-backdrop"><section class="activity-dialog" role="dialog" aria-modal="true" aria-labelledby="dialog-title" tabindex="-1">
    <button class="dialog-close" aria-label="Close activity" data-action="close-dialog">×</button><span class="kicker">Ages ${activity.band} · ${activity.minutes} minutes · ${activity.kind}</span><h2 id="dialog-title">${escapeHtml(activity.title)}</h2><p>${escapeHtml(activity.intro)}</p>
    <ol class="activity-steps">${activity.steps.map((s,i) => `<li><span>${i+1}</span>${escapeHtml(s)}</li>`).join('')}</ol>
    <div class="twist"><span class="eyebrow">Try this twist</span><p>${escapeHtml(activity.twists[twistIndex % activity.twists.length])}</p><button class="text-button" data-action="new-twist">Give me another twist</button></div>
    <div class="tool-row"><span>Suggested open tool:</span>${activity.tools.map(tool => `<a href="${toolLinks[tool]}" rel="external">Open ${tool} <span class="sr-only">(external)</span></a>`).join('')}<small>Paper works too. External tool links may need internet.</small></div>
    <button class="button primary complete-button" data-action="complete">${done ? 'Made it again' : 'Stamp it made'}</button>
  </section></div>`;
}

function settingsPage() {
  return shell(`<main id="main" class="narrow-page"><span class="kicker">Parent setup</span><h1 tabindex="-1">Choose what appears on the shelf</h1><p>These choices stay in this browser. Children can still change filters on the shelf.</p>
    <section aria-labelledby="age-heading"><h2 id="age-heading">Age bands</h2><form id="settings-form" class="band-list">${bands.map(b => `<label><input type="checkbox" name="band" value="${b}" ${state.bands.includes(b) ? 'checked' : ''}><span><strong>Ages ${b}</strong><small>${activities.filter(a=>a.band===b).length} activities</small></span></label>`).join('')}<button class="button primary" type="submit">Save age bands</button></form></section>
    <section aria-labelledby="data-heading"><h2 id="data-heading">Move or clear your data</h2><div class="data-actions"><button class="button secondary" data-action="export">Export progress as JSON</button><label class="button secondary file-button">Import progress<input id="import-file" type="file" accept="application/json"></label><button class="danger-button" data-action="reset-real">Clear saved progress</button></div><p class="error" role="alert">${escapeHtml(importError)}</p></section>
    <section aria-labelledby="tools-heading"><h2 id="tools-heading">Open tools</h2><p>Activity cards link to official open-tool websites. Install the tools you want through your Linux software app.</p><ul class="tool-list">${Object.entries(toolLinks).map(([name,url]) => `<li><a href="${url}" rel="external">${name} <span class="sr-only">(external)</span></a></li>`).join('')}</ul></section>
  </main>`);
}

function printPage() {
  const packRequested = new URLSearchParams(location.search).get('pack') === '1';
  const packAllowed = packRequested && isLicensed();
  const complete = activities.filter(a => state.completed[a.id]);
  return shell(`<main id="main" class="print-page"><div class="print-toolbar"><div><span class="kicker">Print at 100% scale</span><h1 tabindex="-1">Cut out your progress tokens</h1></div><button class="button primary" data-action="print">Print this sheet</button></div>
    ${complete.length ? `<section aria-labelledby="token-heading"><h2 id="token-heading">Made by me</h2><div class="token-grid">${complete.map(a => `<article class="token"><span aria-hidden="true">★</span><strong>${escapeHtml(a.title)}</strong><small>${escapeHtml(state.completed[a.id])}</small></article>`).join('')}</div></section>` : `<section class="empty-state"><h2>No tokens yet</h2><p>Finish one activity to add its token here.</p><a class="button secondary" href="/#activities">Pick an activity</a></section>`}
    ${packAllowed ? `<section class="pack-print" aria-labelledby="deck-heading"><h2 id="deck-heading">Take-home activity deck</h2><div class="print-card-grid">${activities.map(a => `<article><span>Ages ${a.band} · ${a.minutes} min</span><h3>${escapeHtml(a.title)}</h3><ol>${a.steps.map(s=>`<li>${escapeHtml(s)}</li>`).join('')}</ol></article>`).join('')}</div><h2>Four-week weekend mix</h2><ol class="weekend-mix"><li>Week 1: Shape creature and maze message</li><li>Week 2: Loop beat and secret alphabet</li><li>Week 3: Moon postcard and one-button toy</li><li>Week 4: Paper controller and remix rules</li></ol></section>` : packRequested ? `<section class="empty-state"><h2>The activity deck needs a pack license</h2><p>Progress tokens remain free.</p><a class="button primary" href="/#pack-heading">See the $12 pack</a></section>` : ''}
  </main>`);
}

function privacyPage() {
  return shell(`<main id="main" class="text-page"><span class="kicker">Last updated 28 August 2026</span><h1 tabindex="-1">Your activity data stays in this browser</h1><p>Linux Kid Lab stores age choices, completed activities, and twists in IndexedDB on this device.</p><h2>What leaves this device</h2><p>Nothing leaves during normal activity use. The site has no analytics, ads, accounts, or chat.</p><p>Official tool links open another website. That website has its own privacy policy.</p><p>License verification sends only your license token to Sociobot billing. It runs after you paste or receive a license.</p><h2>Delete or move your data</h2><p>Parent setup can export a JSON copy or clear saved progress. Browser storage controls can also remove everything.</p><h2>Demo data</h2><p>Demo mode uses a separate IndexedDB database named <code>demo:linux-kid-lab</code>. Leaving or resetting the demo discards it.</p><h2>Contact</h2><p>Questions can go to <a href="mailto:privacy@sociobot.in">privacy@sociobot.in</a>.</p></main>`);
}

function termsPage() {
  return shell(`<main id="main" class="text-page"><span class="kicker">Last updated 29 August 2026</span><h1 tabindex="-1">Terms for using Linux Kid Lab</h1><p>You may use the free activities at home, in a classroom, or in a community group.</p><h2>Parent supervision</h2><p>An adult decides which external tools and websites a child may open. Follow each tool’s own terms.</p><h2>Activity pack licenses</h2><p>An active pack license adds printable activity cards and a weekend mix. It does not remove the free activities or progress tokens.</p><p>Sociobot is the merchant of record. A refund revokes the pack license.</p><h2>No warranty</h2><p>The site is provided as available. Keep your exported copy if saved progress matters to you.</p><h2>Contact</h2><p>Questions can go to <a href="mailto:support@sociobot.in">support@sociobot.in</a>.</p></main>`);
}

function notFoundPage() {
  return shell(`<main id="main" class="not-found"><div aria-hidden="true" class="tangled-tape">404</div><h1 tabindex="-1">This tape has no activity</h1><p>The address may be wrong, or the page moved.</p><a class="button primary" href="/" data-nav>Return to the activity shelf</a></main>`);
}

function render(focus = false) {
  const path = routePath();
  document.title = titles[path];
  document.querySelector('link[rel="canonical"]')?.setAttribute('href', `https://linux-kid-lab.sociobot.in${path === '/404' ? location.pathname : path}`);
  const pages: Record<string, () => string> = {'/':landing,'/demo':demoPage,'/settings':settingsPage,'/privacy':privacyPage,'/terms':termsPage,'/print':printPage,'/404':notFoundPage};
  app.innerHTML = pages[path]();
  bindEvents();
  updateOnlineState();
  if (focus) {
    const h1 = document.querySelector<HTMLElement>('h1');
    h1?.focus();
    const status = document.querySelector('#route-status');
    if (status && h1) status.textContent = h1.textContent;
  }
  if (activeActivity) requestAnimationFrame(() => document.querySelector<HTMLElement>('.activity-dialog')?.focus());
}

function closeActivity(restoreFocus = true) {
  activeActivity = null;
  render();
  if (restoreFocus && lastActivityId) {
    requestAnimationFrame(() => document.querySelector<HTMLElement>(`[data-open="${lastActivityId}"]`)?.focus());
  }
}

function go(url: string) {
  history.pushState({}, '', url);
  const nextDemo = location.pathname === '/demo' || new URLSearchParams(location.search).get('demo') === '1';
  if (nextDemo !== demo) {
    demo = nextDemo;
    loadState(demo).then(newState => { state = newState; activeActivity = null; render(true); });
  } else { activeActivity = null; render(true); }
  scrollTo({top:0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'});
}

function announce(message: string) {
  statusMessage = message;
  render();
  window.setTimeout(() => { statusMessage = ''; const toast = document.querySelector('.toast'); toast?.classList.remove('show'); }, 3200);
}

async function verifyLicense(token: string) {
  licenseDetailsOpen = true;
  licenseNotice = 'Checking the license…'; render();
  try {
    const response = await fetch(`https://api.sociobot.in/api/v1/products/${slug}/verify?license=${encodeURIComponent(token)}`);
    const result = await response.json() as {valid:boolean; reason?:string};
    localStorage.setItem(licenseStatusKey(), JSON.stringify({valid:result.valid, checkedAt:Date.now()}));
    if (result.valid) { licenseNotice = 'License verified. The print pack is ready.'; }
    else { licenseNotice = 'This license is not active. Check the token or use the buy link.'; }
  } catch {
    licenseNotice = 'The license could not be checked. Connect to the internet and try again.';
  }
  render();
}

function bindEvents() {
  document.querySelectorAll<HTMLAnchorElement>('a[data-nav]').forEach(link => link.addEventListener('click', event => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || link.target) return;
    event.preventDefault();
    let destination = link.getAttribute('href')!;
    if (demo && destination !== '/demo') {
      const url = new URL(destination, location.origin);
      url.searchParams.set('demo', '1');
      destination = `${url.pathname}${url.search}${url.hash}`;
    }
    go(destination);
  }));
  document.querySelectorAll<HTMLButtonElement>('[data-open]').forEach(button => button.addEventListener('click', () => { lastActivityId=button.dataset.open!; activeActivity = activities.find(a=>a.id===button.dataset.open)!; render(); }));
  document.querySelectorAll<HTMLButtonElement>('[data-band]').forEach(button => button.addEventListener('click', async () => {
    const band = button.dataset.band as Band;
    state.bands = state.bands.includes(band) ? state.bands.filter(b=>b!==band) : [...state.bands, band];
    await saveState(state, demo); render();
  }));
  document.querySelector('.dialog-backdrop')?.addEventListener('click', event => { if (event.target === event.currentTarget) closeActivity(); });
  document.querySelectorAll<HTMLElement>('[data-action]').forEach(element => element.addEventListener('click', async event => {
    const action = element.dataset.action;
    if (action === 'close-dialog') { event.stopPropagation(); closeActivity(); }
    if (action === 'new-twist' && activeActivity) { state.twists[activeActivity.id] = ((state.twists[activeActivity.id] ?? 0) + 1) % 3; await saveState(state,demo); render(); }
    if (action === 'complete' && activeActivity) { state.completed[activeActivity.id] = new Date().toISOString().slice(0,10); await saveState(state,demo); const title=activeActivity.title; activeActivity=null; announce(`${title} is stamped made.`); }
    if (action === 'reset-demo') { await clearDemo(); localStorage.removeItem(`demo:sb_license:${slug}`); localStorage.removeItem(`demo:sb_license_status:${slug}`); state=demoState(); await saveState(state,true); announce('Sample data reset.'); }
    if (action === 'start-real') { await clearDemo(); localStorage.removeItem(`demo:sb_license:${slug}`); localStorage.removeItem(`demo:sb_license_status:${slug}`); go('/'); }
    if (action === 'export') exportData();
    if (action === 'reset-real' && confirm('Clear every completed activity and age choice on this device?')) { state=freshState(); await saveState(state,false); announce('Saved progress cleared.'); }
    if (action === 'print') window.print();
  }));
  const settingsForm = document.querySelector<HTMLFormElement>('#settings-form');
  settingsForm?.addEventListener('submit', async event => { event.preventDefault(); state.bands = [...new FormData(settingsForm).getAll('band')] as Band[]; await saveState(state,demo); announce('Age bands saved.'); });
  const importFile = document.querySelector<HTMLInputElement>('#import-file');
  importFile?.addEventListener('change', () => importData(importFile.files?.[0]));
  const licenseForm = document.querySelector<HTMLFormElement>('#license-form');
  licenseForm?.addEventListener('submit', event => { event.preventDefault(); const token=String(new FormData(licenseForm).get('license')||'').trim(); if(token){ licenseDetailsOpen=true; localStorage.setItem(licenseTokenKey(),token); verifyLicense(token); } });
  document.querySelector<HTMLElement>('.activity-dialog')?.addEventListener('keydown', trapDialogFocus);
}

function trapDialogFocus(event: KeyboardEvent) {
  if (event.key === 'Escape') { closeActivity(); return; }
  if (event.key !== 'Tab') return;
  const dialog = document.querySelector<HTMLElement>('.activity-dialog')!;
  const focusable = [...dialog.querySelectorAll<HTMLElement>('a,button,input,[tabindex]:not([tabindex="-1"])')];
  const first=focusable[0], last=focusable.at(-1)!;
  if(event.shiftKey && document.activeElement===first){event.preventDefault();last.focus();}
  if(!event.shiftKey && document.activeElement===last){event.preventDefault();first.focus();}
}

function exportData() {
  const blob = new Blob([JSON.stringify({version:1, exportedAt:new Date().toISOString(), ...state}, null, 2)], {type:'application/json'});
  const link=document.createElement('a'); link.href=URL.createObjectURL(blob); link.download='linux-kid-lab-progress.json'; link.click(); URL.revokeObjectURL(link.href); announce('Progress exported as JSON.');
}

async function importData(file?: File) {
  if (!file) return;
  try {
    const parsed=JSON.parse(await file.text()) as Partial<LabState>;
    if(!Array.isArray(parsed.bands) || !parsed.bands.every(b=>bands.includes(b)) || !parsed.completed || typeof parsed.completed!=='object') throw new Error();
    const validIds=new Set(activities.map(a=>a.id));
    state={bands:parsed.bands,completed:Object.fromEntries(Object.entries(parsed.completed).filter(([id,date])=>validIds.has(id)&&typeof date==='string')),twists:parsed.twists && typeof parsed.twists==='object' ? parsed.twists : {}};
    await saveState(state,demo); importError=''; announce('Progress imported.');
  } catch { importError='That file is not a Linux Kid Lab progress export. Choose the JSON file from this app.'; render(); }
}

function updateOnlineState() {
  const chip=document.querySelector<HTMLElement>('#offline-status');
  if(chip) chip.hidden=navigator.onLine;
}

async function handleIncomingLicense() {
  const params=new URLSearchParams(location.search); const token=params.get('license');
  if(token){ localStorage.setItem(licenseTokenKey(),token); params.delete('license'); history.replaceState({},'',`${location.pathname}${params.size?'?'+params:''}${location.hash}`); await verifyLicense(token); return; }
  const stored=localStorage.getItem(licenseTokenKey()); if(!stored) return;
  try { const cache=JSON.parse(localStorage.getItem(licenseStatusKey())||'null'); if(!cache || Date.now()-cache.checkedAt>86_400_000) void verifyLicense(stored); } catch { void verifyLicense(stored); }
}

async function start() {
  try { state=await loadState(demo); }
  catch { state=demo?demoState():freshState(); statusMessage='Saved progress could not be opened. This visit will not be saved.'; }
  render();
  await handleIncomingLicense();
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js').then(reg => {
    reg.addEventListener('updatefound',()=>{ const worker=reg.installing; worker?.addEventListener('statechange',()=>{ if(worker.state==='installed'&&navigator.serviceWorker.controller) announce('An update is ready. Reload to use it.'); }); });
  }).catch(()=>{});
}

addEventListener('popstate', async () => { const nextDemo=location.pathname==='/demo'; if(nextDemo!==demo){demo=nextDemo;state=await loadState(demo);} activeActivity=null;render(true); });
addEventListener('online',updateOnlineState); addEventListener('offline',updateOnlineState);
start();
