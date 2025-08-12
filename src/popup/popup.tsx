import React, { useState } from "react";
import './popup.css'
const App = () => {
  const [showPopup, setShowPopup] = useState(false);

    const handleSimplifyClick = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0].id) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "change_font" });
      }
    });
  };
const handleSimplifyWeb = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0].id) {
      chrome.tabs.sendMessage(tabs[0].id, { action: "simplify_text" });
    }
  });
};
  

  return (
    <div>      
        <h2>Dyslexia Support Tool</h2>
        <p>
          This tool helps users with dyslexia by changing fonts, adjusting spacing,
          and offering text-to-speech features. It’s designed to enhance readability
          and reduce cognitive load while reading.
        </p>
        <p>
          🧠 Features:
        </p>
  <ul>
            <li>Dyslexia-friendly font</li>
            <li>Line height adjustment</li>
            <li>Letter spacing control</li>
            <li>Text-to-speech toggle</li>
          </ul>
        <div className="btn-grp flex gap-10">
            <button    onClick={handleSimplifyClick} className="border p-2 text-[12px] rounded-full hover:bg-slate-500 hover:text-yellow-50 hover:transi">Change Text</button>
            <button onClick={handleSimplifyWeb} className="border p-2 text-[12px] rounded-full bg-slate-500 text-yellow-50">Simplify Web</button>
        </div>
    </div>
  );
};

export default App;
