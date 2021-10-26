import Utils from './utils';


// ---------- КОНСТАНТЫ -----------
const LOCAL_STORAGE_THEME_STATE = 'Current theme state';
const ALTERNATIVE_THEME_CLASS = 'light-theme';
const THEME_SWITCHER_ACTIVE_CLASS_MOD = 'theme-switcher__button--active';

/*
 * --- Словарик для названий цветовых Тем:
 * --- ---
 * --- * для "интеграции" с содержимым подписи к кнопке;
 * --- * для записи значений в localStorage;
 */
const ThemeName = {
  text_content: {
    DEFAULT: 'Тёмную',
    ALTERNATIVE: 'Светлую',
  },

  local_storage: {
    DEFAULT: 'Default',
    ALTERNATIVE: 'Alternative',
  },
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

/*
 *** Условие для проверки текущего состояния Темы:
 *** ---
 *** ЕСЛИ запись в localStorage равняется "...ALTERNATIVE",
 *** ТО установить альтернативную ("Светлую") тему на сайте. 
 */
const currentThemeState = localStorage.getItem(LOCAL_STORAGE_THEME_STATE);
if (currentThemeState === ThemeName.local_storage.ALTERNATIVE) {
  body.setAttribute('class', ALTERNATIVE_THEME_CLASS);
  themeNameTextBlock.textContent = ThemeName.text_content.DEFAULT;
  themeSwitcher.classList.add(THEME_SWITCHER_ACTIVE_CLASS_MOD);
}


// *** Функция для обработчика события клика на кнпоку переключения темы ***
const onThemeSwitcherClick = (evt) => {
  evt.preventDefault();

  themeSwitcher.classList.toggle(THEME_SWITCHER_ACTIVE_CLASS_MOD);

  switch (Utils.constant.IS_TRUE) {
    case themeSwitcher.classList.contains(THEME_SWITCHER_ACTIVE_CLASS_MOD):
      body.setAttribute('class', ALTERNATIVE_THEME_CLASS);
      themeNameTextBlock.textContent = ThemeName.text_content.DEFAULT;
      themeSwitcher.classList.add(THEME_SWITCHER_ACTIVE_CLASS_MOD);
      localStorage.setItem(LOCAL_STORAGE_THEME_STATE, ThemeName.local_storage.ALTERNATIVE);
      break;

    default:
      body.removeAttribute('class');
      themeNameTextBlock.textContent = ThemeName.text_content.ALTERNATIVE;
      themeSwitcher.classList.remove(THEME_SWITCHER_ACTIVE_CLASS_MOD);
      localStorage.setItem(LOCAL_STORAGE_THEME_STATE, ThemeName.local_storage.DEFAULT);
  }
};


// --- Добавление обработчиков событий ---
themeSwitcher.addEventListener('click', onThemeSwitcherClick);
