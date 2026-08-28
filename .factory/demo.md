# Demo sandbox

- URL: `https://linux-kid-lab.sociobot.in/demo` (local: `http://localhost:5173/demo`)
- Sample: ages 8–13 are selected; “Make a four-part loop,” “Send a postcard
  from a moon,” and “Build a secret alphabet” start complete.
- Reset: choose **Reset demo** in the persistent yellow banner.
- Leave: choose **Start for real**. Demo progress and demo license data are
  discarded instead of copied.
- Storage: activity data uses IndexedDB database `demo:linux-kid-lab`. License
  test data uses localStorage keys prefixed with `demo:`. Real storage is not
  read or written while the demo banner is present.
- Offline check: visit `/demo`, wait for the service worker, disconnect the
  browser, and reload. The sample shelf remains available.

The automated claim tests always begin in a fresh browser context and use this
sample data. The license test intercepts the Sociobot verification response; it
does not contact billing or spend money.
