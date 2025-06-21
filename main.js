console.log("app.js запущено");

if (!window.Telegram) {
  window.Telegram = {
    WebApp: {
      initDataUnsafe: {
        user: {
          id: 123456,
          first_name: "Тест",
          username: "test_user",
          photo_url: "https://telegram.org/img/t_logo.png"
        }
      },
      ready: () => console.log("Telegram WebApp готовий (мок)")
    }
  };
}

const tg = window.Telegram.WebApp;

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

const langBtn = document.getElementById("langBtn");
const profilePopup = document.getElementById("profilePopup");
const closeBtn = document.getElementById("closeBtn");
const avatar = document.getElementById("avatar");

const usernameEl = document.getElementById("username");
const useridEl = document.getElementById("userid");
const winsEl = document.getElementById("wins");

function translate(lang) {
  const user = tg?.initDataUnsafe?.user || {};

  usernameEl.textContent = user.username || user.first_name || translations[lang].username;
  useridEl.textContent = translations[lang].useridPrefix + (user.id || 0);

  const winsCount = localStorage.getItem("winsCount") || 5;
  winsEl.textContent = translations[lang].winsPrefix + winsCount;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  closeBtn.textContent = translations[lang].closeBtn;
}

langBtn.addEventListener("click", () => {
  if (currentLang === "uk") currentLang = "en";
  else if (currentLang === "en") currentLang = "ru";
  else currentLang = "uk";

  translate(currentLang);
});

avatar.addEventListener("click", () => {
  profilePopup.classList.toggle("active");
});

closeBtn.addEventListener("click", () => {
  profilePopup.classList.remove("active");
});

window.addEventListener("DOMContentLoaded", () => {
  translate(currentLang);

  const user = tg?.initDataUnsafe?.user;
  if (user?.photo_url) {
    avatar.src = user.photo_url;
  }

  tg.ready?.();
});
