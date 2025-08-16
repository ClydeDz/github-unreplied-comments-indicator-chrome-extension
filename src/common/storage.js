export const CHROME_SYNC_STORAGE_THEME_KEY = "theme";

export const getStorage = async (key) => {
  const data = await chrome.storage.sync.get(key);
  console.log("getStorage", data);
  return data;
};

export const setStorage = (key, value) => {
  chrome.storage.sync.set({ [key]: value });
};
