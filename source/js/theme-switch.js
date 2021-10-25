import Utils from './utils';


// ---------- КОНСТАНТЫ -----------
const ThemeName = {
  DEFAULT: 'Тёмную',
  ALTERNATIVE: 'Светлую',
};


// --------- DOM-элементы ---------
const body = document.querySelector('body');
const themeSwitcherBlock = body.querySelector('#theme-switcher-block');
const themeSwitcherDescription = themeSwitcherBlock.querySelector('.theme-switcher__description');
const themeNameTextBlock = themeSwitcherDescription.querySelector('#theme-name');
const themeSwitcher = themeSwitcherBlock.querySelector('#theme-switcher');


/*
=======================================================================
--------------------------- ОСНОВНАЯ ЛОГИКА ---------------------------
=======================================================================
*/

// *** Функция для обработчика события клика на кнпоку переключения темы ***
const onThemeSwitcherClick = (evt) => {
  evt.preventDefault();

  themeSwitcher.classList.toggle('theme-switcher__button--active');

  switch (Utils.constant.IS_TRUE) {
    case themeSwitcher.classList.contains('theme-switcher__button--active'):
      body.setAttribute('class', 'light-theme');
      themeNameTextBlock.textContent = ThemeName.DEFAULT;
      themeSwitcher.classList.add('theme-switcher__button--active');
      break;

    default:
      body.removeAttribute('class');
      themeNameTextBlock.textContent = ThemeName.ALTERNATIVE;
      themeSwitcher.classList.remove('theme-switcher__button--active');
  }
};


// --- Добавление обработчиков событий ---
themeSwitcher.addEventListener('click', onThemeSwitcherClick);
