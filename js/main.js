(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onProjectsOpenButtonClick = exports.ProjectsLinksManipulation = void 0;

var _utils = _interopRequireDefault(require("./utils"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
} // --------- DOM-элементы ---------


var sidebar = document.querySelector('#sidebar');
var projectsSection = sidebar.querySelector('#projects-section');
var projectsOpenButton = projectsSection.querySelector('#projects-open-button');
var projectsList = projectsSection.querySelector('#projects-list');
var projectsLinks = projectsList.querySelectorAll('.projects__list-link');
/*
=======================================================================
--------------------------- ОСНОВНАЯ ЛОГИКА ---------------------------
=======================================================================
*/

/*
 *** Объект с описанием методов
 *** для включения/отключения "tabindex"
 *** у ссылок списка "Проектов".
 */

var ProjectsLinksManipulation = {
  deactivateTabindex: function deactivateTabindex() {
    Array.from(projectsLinks).forEach(function (element) {
      element.setAttribute('tabindex', -1);
    });
  },
  activateTabindex: function activateTabindex() {
    Array.from(projectsLinks).forEach(function (element) {
      element.removeAttribute('tabindex');
    });
  }
}; // --- Первичное добавление "свёрнутого" состояния для списка проектов ---

exports.ProjectsLinksManipulation = ProjectsLinksManipulation;
projectsList.classList.add(_utils["default"].class_mod.PROJECTS_LIST_CLOSED_MOD); // *** Настройка для отключения интерактивности ссылок  ***

/*
 * --- Необходима для того, чтобы избежать попадания фокуса на ссылки,
 * --- вложенные в список "Проекты", когда сам список скрыт.
 */

ProjectsLinksManipulation.deactivateTabindex(); // *** Функция для обработчика события Клика по кнопке открытия списка "Проектов" ***

var onProjectsOpenButtonClick = function onProjectsOpenButtonClick(evt) {
  evt.preventDefault();
  projectsList.classList.toggle(_utils["default"].class_mod.PROJECTS_LIST_CLOSED_MOD);

  switch (_utils["default"].constant.IS_TRUE) {
    case projectsList.classList.contains(_utils["default"].class_mod.PROJECTS_LIST_CLOSED_MOD):
      ProjectsLinksManipulation.deactivateTabindex();
      break;

    default:
      ProjectsLinksManipulation.activateTabindex();
  } // --- Условие для открытия Сайдбара при клике на "Проекты" ---


  if (sidebar.classList.contains(_utils["default"].class_mod.SIDEBAR_CLOSED)) {
    sidebar.classList.remove(_utils["default"].class_mod.SIDEBAR_CLOSED);
  }
}; // --- Добавление обработчиков событий ---


exports.onProjectsOpenButtonClick = onProjectsOpenButtonClick;
projectsOpenButton.addEventListener('click', onProjectsOpenButtonClick);

},{"./utils":5}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resetSearchInput = exports.onSearchInput = exports.onSearchClick = void 0;

var _utils = _interopRequireDefault(require("./utils"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
} // --------- DOM-элементы ---------


var sidebar = document.querySelector('#sidebar');
var searchInput = sidebar.querySelector('#search-input');
/*
=======================================================================
--------------------------- ОСНОВНАЯ ЛОГИКА ---------------------------
=======================================================================
*/
// *** Функция для обработки события Клика на поле Поиска ***

var onSearchClick = function onSearchClick() {
  // --- Условие для открытия Сайдбара при клике на поле Поиска ---
  if (sidebar.classList.contains(_utils["default"].class_mod.SIDEBAR_CLOSED)) {
    sidebar.classList.remove(_utils["default"].class_mod.SIDEBAR_CLOSED);
    searchInput.removeEventListener('click', onSearchClick);
    searchInput.removeEventListener('keydown', onSearchInput);
  }
}; // *** Функция для обработки события Ввода в поле Поиска ***


exports.onSearchClick = onSearchClick;

var onSearchInput = function onSearchInput(evt) {
  // --- Условие для открытия Сайдбара при вводе в поле Поиска ---
  switch (_utils["default"].constant.IS_TRUE) {
    case evt.key.toUpperCase() === _utils["default"].key_code.TAB.toUpperCase():
    case evt.key.toUpperCase() === _utils["default"].key_code.ESC.toUpperCase():
    case evt.key.toUpperCase() === _utils["default"].key_code.ESC_ABBREVIATED.toUpperCase():
      break;

    default:
      if (sidebar.classList.contains(_utils["default"].class_mod.SIDEBAR_CLOSED)) {
        sidebar.classList.remove(_utils["default"].class_mod.SIDEBAR_CLOSED);
        searchInput.removeEventListener('click', onSearchClick);
        searchInput.removeEventListener('keydown', onSearchInput);
      }

  }
}; // *** Функция для сброса значения поля ***


exports.onSearchInput = onSearchInput;

var resetSearchInput = function resetSearchInput() {
  searchInput.value = _utils["default"].constant.EMPTY_VALUE;
}; // --- Добавление обработчиков событий ---


exports.resetSearchInput = resetSearchInput;
searchInput.addEventListener('click', onSearchClick);
searchInput.addEventListener('keydown', onSearchInput);

},{"./utils":5}],3:[function(require,module,exports){
"use strict";

var _utils = _interopRequireDefault(require("./utils"));

var _searchInput = require("./search-input");

var _projectsOpen = require("./projects-open");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
} // --------- DOM-элементы ---------


var sidebar = document.querySelector('#sidebar');
var sidebarToggleButton = sidebar.querySelector('#sidebar-toggle-button');
var searchInput = sidebar.querySelector('#search-input');
var projectsSection = sidebar.querySelector('#projects-section');
var projectsList = projectsSection.querySelector('#projects-list');
/*
=======================================================================
--------------------------- ОСНОВНАЯ ЛОГИКА ---------------------------
=======================================================================
*/

/*
 * --- Необходимое первичное добавление Сайдбару и некоторым его вложенным элементам
 * --- соответствующих модификаторов, чтобы корректно свернуть всё необходимое,
 * --- т.к. по умолчанию Сайдбар и все его "внутренности" всегда "развёрнуты"
 */

sidebar.classList.add(_utils["default"].class_mod.SIDEBAR_CLOSED); // *** Функция для обработчика события Клика по кнопке-переключателю состояния Сайдбара ***

var onSidebarToggleButtonClick = function onSidebarToggleButtonClick(evt) {
  evt.preventDefault();

  switch (_utils["default"].constant.IS_TRUE) {
    case sidebar.classList.contains(_utils["default"].class_mod.SIDEBAR_CLOSED):
      sidebar.classList.remove(_utils["default"].class_mod.SIDEBAR_CLOSED);
      searchInput.removeEventListener('click', _searchInput.onSearchClick);
      searchInput.removeEventListener('keydown', _searchInput.onSearchInput);
      break;

    default:
      sidebar.classList.add(_utils["default"].class_mod.SIDEBAR_CLOSED);
      searchInput.addEventListener('click', _searchInput.onSearchClick);
      searchInput.addEventListener('keydown', _searchInput.onSearchInput);
      (0, _searchInput.resetSearchInput)();
  } // --- Условие для корректного закрытия списка "Проектов" ---


  if (!projectsList.classList.contains(_utils["default"].class_mod.PROJECTS_LIST_CLOSED_MOD)) {
    projectsList.classList.add(_utils["default"].class_mod.PROJECTS_LIST_CLOSED_MOD);

    _projectsOpen.ProjectsLinksManipulation.deactivateTabindex();
  }
}; // --- Добавление обработчиков событий ---


sidebarToggleButton.addEventListener('click', onSidebarToggleButtonClick);

},{"./projects-open":1,"./search-input":2,"./utils":5}],4:[function(require,module,exports){
"use strict";

var _utils = _interopRequireDefault(require("./utils"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
} // ---------- КОНСТАНТЫ -----------


var LOCAL_STORAGE_THEME_STATE = 'Current theme state';
var ALTERNATIVE_THEME_CLASS = 'light-theme';
var THEME_SWITCHER_ACTIVE_CLASS_MOD = 'theme-switcher__button--active';
/*
 * --- Словарик для названий цветовых Тем:
 * --- ---
 * --- * для "интеграции" с содержимым подписи к кнопке;
 * --- * для записи значений в localStorage;
 */

var ThemeName = {
  text_content: {
    DEFAULT: 'Тёмную',
    ALTERNATIVE: 'Светлую'
  },
  local_storage: {
    DEFAULT: 'Default',
    ALTERNATIVE: 'Alternative'
  }
}; // --------- DOM-элементы ---------

var body = document.querySelector('body');
var themeSwitcherBlock = body.querySelector('#theme-switcher-block');
var themeSwitcherDescription = themeSwitcherBlock.querySelector('.theme-switcher__description');
var themeNameTextBlock = themeSwitcherDescription.querySelector('#theme-name');
var themeSwitcher = themeSwitcherBlock.querySelector('#theme-switcher');
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

var currentThemeState = localStorage.getItem(LOCAL_STORAGE_THEME_STATE);

if (currentThemeState === ThemeName.local_storage.ALTERNATIVE) {
  body.setAttribute('class', ALTERNATIVE_THEME_CLASS);
  themeNameTextBlock.textContent = ThemeName.text_content.DEFAULT;
  themeSwitcher.classList.add(THEME_SWITCHER_ACTIVE_CLASS_MOD);
} // *** Функция для обработчика события клика на кнпоку переключения темы ***


var onThemeSwitcherClick = function onThemeSwitcherClick(evt) {
  evt.preventDefault();
  themeSwitcher.classList.toggle(THEME_SWITCHER_ACTIVE_CLASS_MOD);

  switch (_utils["default"].constant.IS_TRUE) {
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
}; // --- Добавление обработчиков событий ---


themeSwitcher.addEventListener('click', onThemeSwitcherClick);

},{"./utils":5}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  /* --- Список различных констант ---  */
  constant: {
    IS_TRUE: true,
    EMPTY_VALUE: ''
  },

  /* --- Список модификаторов классов ---  */
  class_mod: {
    SIDEBAR_CLOSED: 'closed-sidebar',
    PROJECTS_LIST_CLOSED_MOD: 'projects__list--closed'
  },

  /* --- Список кодов клавиш ---  */
  key_code: {
    TAB: 'Tab',
    ESC: 'Escape',
    ESC_ABBREVIATED: 'Esc'
  }
};
exports["default"] = _default;

},{}]},{},[1,2,3,4,5]);
