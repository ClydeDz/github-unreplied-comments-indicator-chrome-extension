import { CHROME_SYNC_STORAGE_THEME_KEY, getStorage } from "../common/storage";
import { THEMES } from "../common/themes";

setInterval(async function () {
  const selectedTheme = await getStorage(CHROME_SYNC_STORAGE_THEME_KEY);

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
        themeClassnames.push("github-unreplied-comments-backgroundcolor-theme");
      }

      parent.classList.add(...themeClassnames);
    });
}, 2000);
