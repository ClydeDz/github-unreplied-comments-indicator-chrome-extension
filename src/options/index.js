import {
  getStorage,
  setStorage,
  CHROME_SYNC_STORAGE_THEME_KEY,
} from "../common/storage";
import { THEMES } from "../common/themes";

const SELECTED_TEXT = "(Selected)";
const UNSELECTED_TEXT = "(Unselected)";

document.addEventListener("DOMContentLoaded", async function () {
  const storageTheme = await getStorage(CHROME_SYNC_STORAGE_THEME_KEY);
  const theme = storageTheme[CHROME_SYNC_STORAGE_THEME_KEY]
    ? storageTheme[CHROME_SYNC_STORAGE_THEME_KEY]
    : THEMES.leftBorder;

  const options = document.querySelectorAll(".option-link");

  options.forEach((option) => {
    option.textContent =
      theme === option.dataset.option ? SELECTED_TEXT : UNSELECTED_TEXT;

    option.addEventListener("click", function (e) {
      e.preventDefault();

      options.forEach((l) => {
        l.textContent = UNSELECTED_TEXT;
      });

      this.textContent = SELECTED_TEXT;
      setStorage(CHROME_SYNC_STORAGE_THEME_KEY, this.dataset.option);
      console.log(this.dataset.option);
    });
  });
});
