import type { Band } from './activities';

export interface LabState {
  bands: Band[];
  completed: Record<string, string>;
  twists: Record<string, number>;
}

export const freshState = (): LabState => ({ bands:['5–7','8–10'], completed:{}, twists:{} });
export const demoState = (): LabState => ({
  bands:['8–10','11–13'],
  completed:{ 'loop-beat':'2026-08-22', 'moon-postcard':'2026-08-24', 'secret-alphabet':'2026-08-27' },
  twists:{ 'one-button':1 }
});

const openDb = (demo: boolean): Promise<IDBDatabase> => new Promise((resolve, reject) => {
  const request = indexedDB.open(demo ? 'demo:linux-kid-lab' : 'linux-kid-lab', 1);
  request.onupgradeneeded = () => request.result.createObjectStore('lab');
  request.onsuccess = () => resolve(request.result);
  request.onerror = () => reject(request.error);
});

export async function loadState(demo: boolean): Promise<LabState> {
  const db = await openDb(demo);
  const value = await new Promise<LabState | undefined>((resolve, reject) => {
    const request = db.transaction('lab').objectStore('lab').get('state');
    request.onsuccess = () => resolve(request.result as LabState | undefined);
    request.onerror = () => reject(request.error);
  });
  db.close();
  if (value) return value;
  const seeded = demo ? demoState() : freshState();
  await saveState(seeded, demo);
  return seeded;
}

export async function saveState(state: LabState, demo: boolean): Promise<void> {
  const db = await openDb(demo);
  await new Promise<void>((resolve, reject) => {
    const transaction = db.transaction('lab', 'readwrite');
    transaction.objectStore('lab').put(state, 'state');
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });
  db.close();
}

export async function clearDemo(): Promise<void> {
  await new Promise<void>((resolve) => {
    const request = indexedDB.deleteDatabase('demo:linux-kid-lab');
    request.onsuccess = request.onerror = request.onblocked = () => resolve();
  });
}
