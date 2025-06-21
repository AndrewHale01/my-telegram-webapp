Telegram.WebApp.ready();

const user = Telegram.WebApp.initDataUnsafe?.user;
const avatar = document.getElementById("avatar-small");
const usernameEl = document.getElementById("username");
const useridEl = document.getElementById("userid");
const profilePopup = document.getElementById("profile-popup");
const settingsPopup = document.getElementById("settings-popup");
const settingsIcon = document.getElementById("settings-icon");
const winsEl = document.getElementById("wins");
const closeBtn = document.getElementById("close-btn");

// Переклади
const translations = {
  en: {
    wins: "Wins: 0",
    close: "Close"
  },
  uk: {
    wins: "Перемоги: 0",
    close: "Закрити"
  }
};

function applyLanguage(lang) {
  const t = translations[lang] || translations.en;
  winsEl.textContent = t.wins;
  closeBtn.textContent = t.close;
  localStorage.setItem("lang", lang);
}

// Отримати мову
let lang = localStorage.getItem("lang");
if (!lang && user?.language_code) {
  lang = ["uk", "en"].includes(user.language_code) ? user.language_code : "en";
}
applyLanguage(lang || "en");

// Заповнення профілю
if (user) {
  usernameEl.textContent = user.username ? `@${user.username}` : `${user.first_name} ${user.last_name || ''}`;
  useridEl.textContent = `ID: ${user.id}`;
  avatar.src = `https://t.me/i/userpic/320/${user.id}.jpg`;
}

// Відкриття/закриття
avatar.onclick = (e) => {
  e.stopPropagation();
  profilePopup.classList.add("active");
  settingsPopup.classList.remove("active");
};

settingsIcon.onclick = (e) => {
  e.stopPropagation();
  settingsPopup.classList.toggle("active");
  profilePopup.classList.remove("active");
};

closeBtn.onclick = () => profilePopup.classList.remove("active");

document.addEventListener("click", (e) => {
  if (!profilePopup.contains(e.target) && e.target !== avatar) {
    profilePopup.classList.remove("active");
  }
  if (!settingsPopup.contains(e.target) && e.target !== settingsIcon) {
    settingsPopup.classList.remove("active");
  }
});

// Зміна мови
window.changeLanguage = function(lang) {
  applyLanguage(lang);
  settingsPopup.classList.remove("active");
};