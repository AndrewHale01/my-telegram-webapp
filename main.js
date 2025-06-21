const tg = window.Telegram.WebApp;
const avatar = document.getElementById("avatar");
const profilePopup = document.getElementById("profilePopup");
const closeBtn = document.getElementById("closeBtn");

const usernameEl = document.getElementById("username");
const useridEl = document.getElementById("userid");
const winsEl = document.getElementById("wins");

const langBtn = document.getElementById("langBtn");
const langPopup = document.getElementById("langPopup");
const langOptions = document.querySelectorAll(".lang-option");

// Переклади
const translations = {
  uk: {
    home: "Головна",
    rules: "Правила",
    awards: "Нагороди",
    support: "Підтримка",
    wins: "Перемоги",
    close: "Закрити"
  },
  en: {
    home: "Home",
    rules: "Rules",
    awards: "Awards",
    support: "Support",
    wins: "Wins",
    close: "Close"
  },
  ru: {
    home: "Главная",
    rules: "Правила",
    awards: "Награды",
    support: "Поддержка",
    wins: "Победы",
    close: "Закрыть"
  }
};

// Аватар → показати профіль
avatar.addEventListener("click", () => {
  profilePopup.classList.toggle("active");
  langPopup.classList.remove("active");
});

// Закрити профіль
closeBtn.addEventListener("click", () => {
  profilePopup.classList.remove("active");
});

// Кнопка мови
langBtn.addEventListener("click", () => {
  langPopup.classList.toggle("active");
  profilePopup.classList.remove("active");
});

// Обробка вибору мови
langOptions.forEach(btn => {
  btn.addEventListener("click", () => {
    const lang = btn.getAttribute("data-lang");
    applyTranslations(lang);
    langPopup.classList.remove("active");
  });
});

// Функція перекладу
function applyTranslations(lang) {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  winsEl.textContent = `${translations[lang].wins}: ${winsEl.dataset.count || 0}`;
  closeBtn.textContent = translations[lang].close;
}

// Отримати юзера з Telegram WebApp
function initUserProfile() {
  const user = tg.initDataUnsafe?.user;
  if (user) {
    usernameEl.textContent = user.username || `${user.first_name} ${user.last_name || ""}`;
    useridEl.textContent = `ID: ${user.id}`;
    winsEl.dataset.count = 0;
    winsEl.textContent = `Перемоги: 0`;
  } else {
    console.warn("Telegram user not found. Open inside Telegram app.");
  }
}

// Запуск
initUserProfile();
applyTranslations("uk");
