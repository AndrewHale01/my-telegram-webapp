fetch(`/api/user-wins?user_id=${user.id}`)
  .then(res => res.json())
  .then(data => {
    document.getElementById('wins').textContent = `Wins: ${data.wins}`;
  });
Telegram.WebApp.ready();

const avatar = document.getElementById('avatar-small');
const profilePopup = document.getElementById('profile-popup');
const settingsIcon = document.getElementById('settings-icon');
const settingsPopup = document.getElementById('settings-popup');

let currentLang = 'en';

const translations = {
  en: {
    wins: 'Wins: 0',
    close: 'Close'
  },
  uk: {
    wins: 'Перемоги: 0',
    close: 'Закрити'
  }
};

// Функція перекладу елементів
function applyLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('language', lang);

  const tr = translations[lang] || translations.en;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (tr[key]) el.textContent = tr[key];
  });
}

// Отримати користувача Telegram
const user = Telegram.WebApp.initDataUnsafe?.user;

if (user) {
  const savedLang = localStorage.getItem('language');
  const defaultLang = ['uk', 'en'].includes(user.language_code) ? user.language_code : 'en';
  applyLanguage(savedLang && translations[savedLang] ? savedLang : defaultLang);

  const avatarUrl = `https://t.me/i/userpic/320/${user.id}.jpg`;
  avatar.src = avatarUrl;
  avatar.style.display = 'block';

  document.getElementById('username').textContent = user.username
    ? '@' + user.username
    : `${user.first_name} ${user.last_name || ''}`;
  document.getElementById('userid').textContent = 'ID: ' + user.id;
} else {
  avatar.style.display = 'none';
}

avatar.addEventListener('click', (e) => {
  e.stopPropagation();
  profilePopup.classList.add('active');
  settingsPopup.classList.remove('active');
});

settingsIcon.addEventListener('click', (e) => {
  e.stopPropagation();
  settingsPopup.classList.toggle('active');
  profilePopup.classList.remove('active');
});

function changeLanguage(lang) {
  applyLanguage(lang);
  settingsPopup.classList.remove('active');
}

document.addEventListener('click', function (e) {
  if (!profilePopup.contains(e.target) && e.target !== avatar) {
    profilePopup.classList.remove('active');
  }
  if (!settingsPopup.contains(e.target) && e.target !== settingsIcon) {
    settingsPopup.classList.remove('active');
  }
});