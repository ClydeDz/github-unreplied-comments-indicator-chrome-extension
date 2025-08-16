import { CHROME_SYNC_STORAGE_THEME_KEY, getStorage } from "../common/storage";
import { THEMES } from "../common/themes";

let intervalId = "";
try {
  console.log("a", intervalId);
  intervalId = setInterval(async function () {
    console.log("b");
    const storageTheme = await getStorage(CHROME_SYNC_STORAGE_THEME_KEY);
    const selectedTheme = storageTheme[CHROME_SYNC_STORAGE_THEME_KEY]
      ? storageTheme[CHROME_SYNC_STORAGE_THEME_KEY]
      : THEMES.leftBorder;

    Array.from(document.querySelectorAll(".js-comments-holder"))
      .filter((parent) => {
        const commentDivs = parent.querySelectorAll(".js-comment");
        return commentDivs.length === 1;
      })
      .forEach((parent) => {
        const themeClassnames = ["github-unreplied-comments"];
        parent.classList.remove(
          "github-unreplied-comments-leftBorder-theme",
          "github-unreplied-comments-pulsating-theme",
          "github-unreplied-comments-backgroundcolor-theme"
        );

        if (selectedTheme === THEMES.leftBorder) {
          themeClassnames.push("github-unreplied-comments-leftBorder-theme");
        } else if (selectedTheme === THEMES.pulsating) {
          themeClassnames.push("github-unreplied-comments-pulsating-theme");
        } else if (selectedTheme === THEMES.backgroundColor) {
          themeClassnames.push(
            "github-unreplied-comments-backgroundcolor-theme"
          );
        }

        parent.classList.add(...themeClassnames);
      });
  }, 2000);
  console.log("c", intervalId);
} catch {
  clearInterval(intervalId);
}
