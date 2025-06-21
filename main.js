window.Telegram.WebApp.ready();

const user = Telegram.WebApp.initDataUnsafe?.user;
const avatar = document.getElementById('avatar');
const username = document.getElementById('username');
const userid = document.getElementById('userid');
const wins = document.getElementById('wins');
const profilePopup = document.getElementById('profilePopup');
const closeBtn = document.getElementById('closeBtn');
const langBtn = document.getElementById('langBtn');

let currentLang = 'uk';

const translations = {
  uk: {
    wins: "Перемоги: 0",
    close: "Закрити",
    home: "Головна",
    rules: "Правила",
    awards: "Нагороди",
    support: "Підтримка"
  },
  ru: {
    wins: "Победы: 0",
    close: "Закрыть",
    home: "Главная",
    rules: "Правила",
    awards: "Награды",
    support: "Поддержка"
  },
  en: {
    wins: "Wins: 0",
    close: "Close",
    home: "Home",
    rules: "Rules",
    awards: "Awards",
    support: "Support"
  }
};

function setLanguage(lang) {
  currentLang = lang;
  for (const el of document.querySelectorAll('[data-i18n]')) {
    const key = el.getAttribute('data-i18n');
    el.textContent = translations[lang][key] || el.textContent;
  }
  wins.textContent = translations[lang].wins;
  closeBtn.textContent = translations[lang].close;
}

if (user) {
  avatar.src = `https://t.me/i/userpic/320/${user.id}.jpg`;
  username.textContent = user.username ? '@' + user.username : user.first_name;
  userid.textContent = `ID: ${user.id}`;

  const tgLang = user.language_code || 'uk';
  currentLang = tgLang.startsWith('ru') ? 'ru' : tgLang.startsWith('en') ? 'en' : 'uk';
  setLanguage(currentLang);
} else {
  avatar.src = 'avatar.png';
  setLanguage(currentLang);
}

avatar.addEventListener('click', e => {
  e.stopPropagation();
  profilePopup.classList.toggle('active');
});

closeBtn.addEventListener('click', () => profilePopup.classList.remove('active'));

document.addEventListener('click', e => {
  if (!profilePopup.contains(e.target) && e.target !== avatar) {
    profilePopup.classList.remove('active');
  }
});

langBtn.addEventListener('click', () => {
  const next = currentLang === 'uk' ? 'ru' : currentLang === 'ru' ? 'en' : 'uk';
  setLanguage(next);
});
