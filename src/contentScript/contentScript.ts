const injectOpenDyslexicFont = () => {
  const style = document.createElement("style");
  style.textContent = `
    @font-face {
      font-family: 'OpenDyslexic';
      src: url('${chrome.runtime.getURL("../fonts/OpenDyslexic-Bold.otf")}') format('opentype');
      font-weight: normal;
      font-style: normal;
    }

    *:not(script):not(style) {
      font-family: 'OpenDyslexic', Arial, sans-serif !important;
    }
  `;
  document.head.appendChild(style);
};

const applyOpenDyslexic = () => {
  injectOpenDyslexicFont();
};

// Listen for message from popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "change_font") {
    applyOpenDyslexic();
  }
});
