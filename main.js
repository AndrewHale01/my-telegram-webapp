// Дані користувача Telegram
const user = window.Telegram.WebApp.initDataUnsafe?.user;

// Синхронізація профілю
if (user) {
  const avatar = document.getElementById("avatar-small");
  const username = document.getElementById("username");
  const userid = document.getElementById("userid");

  avatar.src = `https://t.me/i/userpic/320/${user.id}.jpg`;
  username.textContent = user.username ? '@' + user.username : user.first_name;
  userid.textContent = 'ID: ' + user.id;
} else {
  document.getElementById("avatar-small").src = "avatar.png"; // fallback
  document.getElementById("avatar-small").style.display = "block";
}

// Показ/сховати профіль
document.getElementById('avatar-small').onclick = function (e) {
  e.stopPropagation();
  document.getElementById('profile-popup').classList.add('active');
};
function hideProfile() {
  document.getElementById('profile-popup').classList.remove('active');
}
document.addEventListener('click', function (e) {
  const popup = document.getElementById('profile-popup');
  const avatar = document.getElementById('avatar-small');
  if (!popup.contains(e.target) && e.target !== avatar) {
    popup.classList.remove('active');
  }
});

// Переклад
const translations = {
  en: {
    wins: "Wins: 0",
    close: "Close",
    home: "Home",
    rules: "Rules",
    awards: "Awards",
    support: "Support",
  },
  uk: {
    wins: "Перемоги: 0",
    close: "Закрити",
    home: "Головна",
    rules: "Правила",
    awards: "Нагороди",
    support: "Підтримка",
  },
  ru: {
    wins: "Победы: 0",
    close: "Закрыть",
    home: "Главная",
    rules: "Правила",
    awards: "Награды",
    support: "Поддержка",
  },
};

let currentLang = 'uk';

// Визначити мову з Telegram
const tgLang = window.Telegram.WebApp.initDataUnsafe?.user?.language_code || 'uk';
if (tgLang.startsWith('en')) currentLang = 'en';
else if (tgLang.startsWith('ru')) currentLang = 'ru';

// Встановити переклад
function setLanguage(lang) {
  const texts = translations[lang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (texts[key]) el.textContent = texts[key];
  });
  currentLang = lang;
}
setLanguage(currentLang);

// Перемикання мови
function toggleLanguage() {
  const next = currentLang === 'uk' ? 'ru' : currentLang === 'ru' ? 'en' : 'uk';
  setLanguage(next);
}
