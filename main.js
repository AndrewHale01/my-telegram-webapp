window.addEventListener("DOMContentLoaded", () => {
  const tg = window.Telegram.WebApp;
  const user = tg.initDataUnsafe?.user;
  const langCode = tg.initDataUnsafe?.user?.language_code || "uk";

  const avatar = document.getElementById("avatar-small");
  const popup = document.getElementById("profile-popup");
  const usernameEl = document.getElementById("username");
  const useridEl = document.getElementById("userid");
  const winsEl = document.getElementById("wins");

  const langBtn = document.getElementById("language-btn");
  const langMenu = document.getElementById("language-menu");

  // Локалізація
  const translations = {
    uk: {
      wins: "Перемоги: ",
      id: "ID: ",
    },
    ru: {
      wins: "Победы: ",
      id: "ID: ",
    },
    en: {
      wins: "Wins: ",
      id: "ID: ",
    },
  };

  // Визначаємо початкову мову
  let currentLang = langCode.startsWith("ru")
    ? "ru"
    : langCode.startsWith("en")
    ? "en"
    : "uk";

  function applyLanguage() {
    if (user) {
      usernameEl.textContent = user.username ? `@${user.username}` : user.first_name;
      useridEl.textContent = `${translations[currentLang].id}${user.id}`;
      winsEl.textContent = `${translations[currentLang].wins}0`;
    }
  }

  // Показати профіль
  if (user) {
    avatar.src = `https://t.me/i/userpic/320/${user.id}.jpg`;
    applyLanguage();

    avatar.addEventListener("click", (e) => {
      e.stopPropagation();
      popup.classList.toggle("active");
      langMenu.style.display = "none";
    });

    document.addEventListener("click", (e) => {
      if (
        !popup.contains(e.target) &&
        e.target !== avatar &&
        !langMenu.contains(e.target) &&
        e.target !== langBtn
      ) {
        popup.classList.remove("active");
        langMenu.style.display = "none";
      }
    });
  } else {
    avatar.style.display = "none";
  }

  // Перемикання мови
  langBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    langMenu.style.display = langMenu.style.display === "flex" ? "none" : "flex";
  });

  langMenu.querySelectorAll("button").forEach((btn) => {
    btn.addEventListener("click", () => {
      currentLang = btn.dataset.lang;
      applyLanguage();
      langMenu.style.display = "none";
    });
  });
});
