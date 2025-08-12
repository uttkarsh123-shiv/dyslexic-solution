import 'dotenv/config';

const apiKey = process.env.OPENAI_API_KEY;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "aiSimplify") {
    (async () => {
      try {
        // const apiKey = "process.env.OPENAI_API_KEY"; // Keep safe, don’t put in content.js

        const response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
              { role: "system", content: "Simplify text for dyslexic readers. Use short, clear sentences." },
              { role: "user", content: message.text }
            ]
          })
        });

        const data = await response.json();
        sendResponse({ simplified: data.choices[0].message.content });
      } catch (error) {
        console.error(error);
        sendResponse({ simplified: null });
      }
    })();
    return true; // keeps channel open for async
  }
});
