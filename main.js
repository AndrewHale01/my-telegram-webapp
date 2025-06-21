const tg = window.Telegram.WebApp;

const langSelect = document.getElementById("langSelect");
const langBtn = document.getElementById("langBtn");
const avatar = document.getElementById("avatar");
const profilePopup = document.getElementById("profilePopup");
const closeBtn = document.getElementById("closeBtn");

const usernameEl = document.getElementById("username");
const useridEl = document.getElementById("userid");
const winsEl = document.getElementById("wins");

const translations = {
  uk: {
    username: "Ім'я користувача",
    useridPrefix: "ID: ",
    winsPrefix: "Перемоги: ",
    home: "Головна",
    rules: "Правила",
    awards: "Нагороди",
    support: "Підтримка",
    closeBtn: "Закрити",
  },
  en: {
    username: "Username",
    useridPrefix: "ID: ",
    winsPrefix: "Wins: ",
    home: "Home",
    rules: "Rules",
    awards: "Awards",
    support: "Support",
    closeBtn: "Close",
  },
  ru: {
    username: "Имя пользователя",
    useridPrefix: "ID: ",
    winsPrefix: "Побед: ",
    home: "Главная",
    rules: "Правила",
    awards: "Награды",
    support: "Поддержка",
    closeBtn: "Закрыть",
  }
};

let currentLang = "uk";

function applyTranslations(lang) {
  const user = tg.initDataUnsafe?.user || {};
  usernameEl.textContent = user.username || user.first_name || translations[lang].username;
  useridEl.textContent = translations[lang].useridPrefix + (user.id || 0);

  const winsCount = localStorage.getItem("winsCount") || 5;
  winsEl.textContent = translations[lang].winsPrefix + winsCount;

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  closeBtn.textContent = translations[lang].closeBtn;
}

// Toggle profile popup
avatar.addEventListener("click", () => {
  profilePopup.classList.toggle("active");
  langSelect.style.display = "none"; // auto-hide lang menu
});

// Toggle language menu
langBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  langSelect.style.display = langSelect.style.display === "flex" ? "none" : "flex";
  langSelect.style.flexDirection = "column";
});

// Click outside to close dropdown
window.addEventListener("click", () => {
  langSelect.style.display = "none";
});

// Close profile popup
closeBtn.addEventListener("click", () => {
  profilePopup.classList.remove("active");
});

// Language buttons
document.querySelectorAll("#langSelect button").forEach(btn => {
  btn.addEventListener("click", () => {
    const selectedLang = btn.getAttribute("data-lang");
    currentLang = selectedLang;
    applyTranslations(currentLang);
    langSelect.style.display = "none";
  });
});

// Init on load
window.addEventListener("DOMContentLoaded", () => {
  const user = tg.initDataUnsafe?.user;
  if (user?.photo_url) {
    avatar.src = user.photo_url;
  }
  applyTranslations(currentLang);
  tg.ready?.();
});
