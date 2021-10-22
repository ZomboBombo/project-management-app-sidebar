import Utils from './utils';


// --------- DOM-элементы ---------
const sidebar = document.querySelector('#sidebar');
const searchInput = sidebar.querySelector('#search-input');


/*
=======================================================================
--------------------------- ОСНОВНАЯ ЛОГИКА ---------------------------
=======================================================================
*/

// *** Функция для обработки события Клика на поле Поиска ***
export const onSearchClick = () => {
  // --- Условие для открытия Сайдбара при клике на поле Поиска ---
  if (sidebar.classList.contains(Utils.class_mod.SIDEBAR_CLOSED)) {
    sidebar.classList.remove(Utils.class_mod.SIDEBAR_CLOSED);
    searchInput.removeEventListener('click', onSearchClick);
    searchInput.removeEventListener('keydown', onSearchInput);
  }
};


// *** Функция для обработки события Ввода в поле Поиска ***
export const onSearchInput = (evt) => {
  // --- Условие для открытия Сайдбара при вводе в поле Поиска ---
  switch (Utils.constant.IS_TRUE) {
    case evt.key.toUpperCase() === Utils.key_code.TAB.toUpperCase():
    case evt.key.toUpperCase() === Utils.key_code.ESC.toUpperCase():
    case evt.key.toUpperCase() === Utils.key_code.ESC_ABBREVIATED.toUpperCase():
      break;

    default:
      if (sidebar.classList.contains(Utils.class_mod.SIDEBAR_CLOSED)) {
        sidebar.classList.remove(Utils.class_mod.SIDEBAR_CLOSED);
        searchInput.removeEventListener('click', onSearchClick);
        searchInput.removeEventListener('keydown', onSearchInput);
      }
  }
};


// *** Функция для сброса значения поля ***
export const resetSearchInput = () => {
  searchInput.value = Utils.constant.EMPTY_VALUE;
};


// --- Добавление обработчиков событий ---
searchInput.addEventListener('click', onSearchClick);
searchInput.addEventListener('keydown', onSearchInput);
