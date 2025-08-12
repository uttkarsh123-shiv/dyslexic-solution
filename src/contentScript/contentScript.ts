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

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "change_font") {
    injectOpenDyslexicFont();
  }

  if (message.action === "simplify_text") {
    document.querySelectorAll("p").forEach(p => {
      if (p.innerText.length > 50) {
        chrome.runtime.sendMessage(
          { action: "aiSimplify", text: p.innerText },
          (response) => {
            if (response?.simplified) {
              p.innerText = response.simplified;
            }
          }
        );
      }
    });
  }
});
