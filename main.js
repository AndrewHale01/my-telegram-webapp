// Переклади для текстів у popup і нижньому меню
const translations = {
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
  ru: {
    username: "Имя пользователя",
    useridPrefix: "ID: ",
    winsPrefix: "Побед: ",
    home: "Главная",
    rules: "Правила",
    awards: "Награды",
    support: "Поддержка",
    closeBtn: "Закрыть",
  },
};

// Поточна мова за замовчуванням
let currentLang = 'uk';

// Telegram WebApp API
const tg = window.Telegram?.WebApp;

// DOM елементи
const langBtn = document.getElementById('langBtn');
const profilePopup = document.getElementById('profilePopup');
const closeBtn = document.getElementById('closeBtn');
const avatar = document.getElementById('avatar');

const usernameEl = document.getElementById('username');
const useridEl = document.getElementById('userid');
const winsEl = document.getElementById('wins');

// Логіка перемикання мов
function translatePage(lang) {
  currentLang = lang;

  // Оновлюємо тексти у профілі
  const user = tg?.initDataUnsafe?.user || null;
  usernameEl.textContent = user ? user.username || user.first_name || translations[lang].username : translations[lang].username;
  useridEl.textContent = user ? translations[lang].useridPrefix + user.id : translations[lang].useridPrefix + '0';

  // Для прикладу, кількість перемог з localStorage або 0
  const winsCount = localStorage.getItem('winsCount') || '0';
  winsEl.textContent = translations[lang].winsPrefix + winsCount;

  // Оновлюємо кнопки в нижньому меню
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  // Кнопка Закрити
  closeBtn.textContent = translations[lang].closeBtn;

  // Змінимо alt аватару для доступності
  avatar.alt = user ? (user.first_name || user.username) + " avatar" : "Avatar";
}

// Показ/схов профіль при кліку на аватар
avatar.addEventListener('click', () => {
  profilePopup.classList.toggle('active');
});

// Закриття профілю кнопкою Закрити
closeBtn.addEventListener('click', () => {
  profilePopup.classList.remove('active');
});

// Перемикання мов по кнопці (кожен клік — нова мова циклом)
langBtn.addEventListener('click', () => {
  if (currentLang === 'uk') currentLang = 'en';
  else if (currentLang === 'en') currentLang = 'ru';
  else currentLang = 'uk';

  translatePage(currentLang);
});

// При завантаженні сторінки
window.addEventListener('DOMContentLoaded', () => {
  translatePage(currentLang);

  // Встановимо аватар, якщо є фото з Telegram
  const user = tg?.initDataUnsafe?.user || null;
  if (user && user.photo_url) {
    avatar.src = user.photo_url;
  }

  // Додатково можна ініціалізувати Telegram WebApp:
  if (tg) {
    tg.ready();
  }
});
