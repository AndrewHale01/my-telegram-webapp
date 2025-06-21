const tg = window.Telegram.WebApp;

const avatar = document.getElementById("avatar");
const profilePopup = document.getElementById("profilePopup");
const langBtn = document.getElementById("langBtn");
const langPopup = document.getElementById("langPopup");
const langOptions = document.querySelectorAll(".lang-option");

const usernameEl = document.getElementById("username");
const useridEl = document.getElementById("userid");
const winsEl = document.getElementById("wins");

const translations = {
  uk: {
    home: "Головна",
    rules: "Правила",
    awards: "Нагороди",
    support: "Підтримка",
    wins: "Перемоги"
  },
  en: {
    home: "Home",
    rules: "Rules",
    awards: "Awards",
    support: "Support",
    wins: "Wins"
  },
  ru: {
    home: "Главная",
    rules: "Правила",
    awards: "Награды",
    support: "Поддержка",
    wins: "Победы"
  }
};

avatar.addEventListener("click", () => {
  profilePopup.classList.toggle("active");
  langPopup.classList.remove("active");
});

langBtn.addEventListener("click", () => {
  langPopup.classList.toggle("active");
  profilePopup.classList.remove("active");
});

langOptions.forEach(btn => {
  btn.addEventListener("click", () => {
    const lang = btn.dataset.lang;
    applyTranslations(lang);
    langPopup.classList.remove("active");
  });
});

function applyTranslations(lang) {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    el.textContent = translations[lang][key];
  });

  const count = winsEl.dataset.count || 0;
  winsEl.textContent = `${translations[lang].wins}: ${count}`;
}

window.addEventListener("DOMContentLoaded", () => {
  if (tg.initDataUnsafe?.user) {
    const user = tg.initDataUnsafe.user;
    usernameEl.textContent = user.username || `${user.first_name} ${user.last_name || ''}`;
    useridEl.textContent = "ID: " + user.id;
  }
});
