import { THEMES } from "./themes";

export const CHROME_SYNC_STORAGE_THEME_KEY = "theme";

export const getStorage = async (key) => {
  const data = await chrome.storage.sync.get(key);
  return data[CHROME_SYNC_STORAGE_THEME_KEY]
    ? data[CHROME_SYNC_STORAGE_THEME_KEY]
    : THEMES.pulsating;
};

export const setStorage = (key, value) => {
  chrome.storage.sync.set({ [key]: value });
};
