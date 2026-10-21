const databaseName = 'chapter-studio-drafts';
let databasePromise;
function openDatabase() {
  if (!databasePromise) databasePromise = new Promise((resolve, reject) => {
    if (!globalThis.indexedDB) return reject(new Error('图片自动保存不可用'));
    const request = indexedDB.open(databaseName, 1);
    request.onupgradeneeded = () => request.result.createObjectStore('media');
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => { databasePromise = undefined; reject(request.error); };
    request.onblocked = () => { databasePromise = undefined; reject(new Error('请关闭其他编辑器页面后重试')); };
  });
  return databasePromise;
}
export async function writeDraftMedia(media) {
  const database = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction('media', 'readwrite');
    transaction.objectStore('media').put(media, 'current');
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
    transaction.onabort = () => reject(transaction.error || new Error('图片自动保存失败'));
  });
}
export async function readDraftMedia() {
  const database = await openDatabase();
  return new Promise((resolve, reject) => {
    const request = database.transaction('media', 'readonly').objectStore('media').get('current');
    request.onsuccess = () => resolve(request.result || {art:'', background:''});
    request.onerror = () => reject(request.error);
  });
}
