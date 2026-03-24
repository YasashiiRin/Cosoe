let isEnabled = false

console.log("Content script loaded for Zalo terminal mode")

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.toggle !== undefined) {
    isEnabled = !isEnabled

    if (isEnabled) {
      document.body.classList.add("terminal-mode")
      console.log("Terminal mode: ON")
      document.body.classList.add("terminal-mode")
      document.title = "Terminal"
      if (!titleInterval) {
        titleInterval = setInterval(() => {
          if (document.title !== "Terminal") {
            document.title = "Terminal";
          }
        }, 800);
      }
    } else {
      document.body.classList.remove("terminal-mode")
      console.log("Terminal mode: OFF")
    }

    sendResponse({ success: true, enabled: isEnabled })
  }
  return true
})

///short cut tongle sidebar
const style = document.createElement("style");
style.innerHTML = `
.hide-me {
  display: none !important;
}
`;
document.head.appendChild(style);

let isHidden = false;

document.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.key.toLowerCase() === "y") {
    e.preventDefault();

    isHidden = !isHidden;

    document.getElementById("sidebarNav").classList.toggle("hide-me", isHidden);
  }
});
// end

//blur
///short cut tongle sidebar
const style1 = document.createElement("style");
style1.innerHTML = `
.blur-me {
  filter: blur(5px) !important;
}
`;
document.head.appendChild(style1);

let isBlur = false;

document.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.key.toLowerCase() === "j") {
    e.preventDefault();

    isBlur = !isBlur;

    document.getElementById("messageViewContainer").classList.toggle("blur-me", isBlur);
  }
});
// end

function hideInsideElements() {
  document.querySelectorAll(".rich-input.empty").forEach((el) => {
    el.setAttribute("placeholder", "$")
  })
  const el1 = document.getElementById("chat-box-bar-id")
  if (el1) el1.style.display = "none"

  const el2 = document.getElementById("header")
  if (el2) el2.style.display = "none"

  document.querySelectorAll(".list-chat-box-banner").forEach((el) => {
    el.style.display = "none"
  })
}

function hideOutsideElements() {
  document.querySelectorAll(".zavatar-container").forEach((el) => {
    el.style.display = "none"
  })

  const el = document.getElementById("main-tab")
  if (el) el.style.display = "none"

  const el2 = document.getElementById("contact-search")
  if (el2) el2.style.display = "none"

  const el3 = document.querySelectorAll(".flx.flx-al-c.tab-main.w100.rel.small.border-bottom")
  if (el3) {
    el3.forEach((el) => {
      el.style.display = "none"
    })
  }

  const el4 = document.querySelectorAll(".conversation-list__banner__full-mode")
  if (el4) {
    el4.forEach((el) => {
      el.style.display = "none"
    })
  }

}

hideOutsideElements()

const observer = new MutationObserver(() => {
  hideInsideElements()
  hideOutsideElements()
})

observer.observe(document.body, {
  childList: true,
  subtree: true,
})

////

function forceDarkMode() {
  const style = document.createElement("style")
  style.innerHTML = `
    * {
        background-color: #000 !important;
        background: #000 !important;
    }
    * {
        color: #00ff00 !important;
    }
    * {
        border-color: #222 !important;
    }

    * {
        box-shadow: none !important;
    }

    input, textarea, [contenteditable="true"] {
        background: #000 !important;
        color: #00ff00 !important;
    }
    ::placeholder {
        color: #00ff00 !important;
        opacity: 0.5 !important;
    }

    ::-webkit-scrollbar {
        background: #000 !important;
    }
    ::-webkit-scrollbar-thumb {
        background: #222 !important;
    }
    `
  document.head.appendChild(style)
}

forceDarkMode()

function nukeFavicon() {
  document.querySelectorAll("link[rel*='icon']").forEach((el) => el.remove())
  const link = document.createElement("link")
  link.rel = "icon"
  link.href = "data:,"
  document.head.appendChild(link)
}
setInterval(nukeFavicon, 500)
