import { CHROME_SYNC_STORAGE_THEME_KEY, getStorage } from "../common/storage";
import { CLASSNAMES, THEMES } from "../common/themes";

const removeClassnames = (parent) => {
  parent.classList.remove(
    CLASSNAMES[THEMES.leftBorder],
    CLASSNAMES[THEMES.pulsating],
    CLASSNAMES[THEMES.backgroundColor]
  );
};

const removeHighlightFromRepliedComments = () => {
  Array.from(document.querySelectorAll(".js-comments-holder"))
    .filter((parent) => {
      const commentDivs = parent.querySelectorAll(".js-comment");
      return commentDivs.length > 1;
    })
    .forEach((parent) => {
      removeClassnames(parent);
    });
};

const addHighlightToUnrepliedComments = (selectedTheme) => {
  Array.from(document.querySelectorAll(".js-comments-holder"))
    .filter((parent) => {
      const commentDivs = parent.querySelectorAll(".js-comment");
      return commentDivs.length === 1;
    })
    .forEach((parent) => {
      removeClassnames(parent);

      const themeClassnames = ["github-unreplied-comments"];
      themeClassnames.push(CLASSNAMES[selectedTheme]);

      parent.classList.add(...themeClassnames);
    });
};

const intervalId = setInterval(async function () {
  try {
    const selectedTheme = await getStorage(CHROME_SYNC_STORAGE_THEME_KEY);
    removeHighlightFromRepliedComments();
    addHighlightToUnrepliedComments(selectedTheme);
  } catch {
    clearInterval(intervalId);
    console.info(
      "⚠️ GitHub Unreplied Comments Indicator:",
      "Please reload the page since the extension was reloaded"
    );
  }
}, 2000);
