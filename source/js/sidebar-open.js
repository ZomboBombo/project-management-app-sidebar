import Utils from './utils';
import { onSearchClick, onSearchInput, resetSearchInput } from './search-input';
import { ProjectsLinksManipulation } from './projects-open';


// --------- DOM-элементы ---------
const sidebar = document.querySelector('#sidebar');
const sidebarToggleButton = sidebar.querySelector('#sidebar-toggle-button');

const searchInput = sidebar.querySelector('#search-input');

const projectsSection = sidebar.querySelector('#projects-section');
const projectsList = projectsSection.querySelector('#projects-list');


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
sidebar.classList.add(Utils.class_mod.SIDEBAR_CLOSED);

// *** Функция для обработчика события Клика по кнопке-переключателю состояния Сайдбара ***
const onSidebarToggleButtonClick = (evt) => {
  evt.preventDefault();

  switch (Utils.constant.IS_TRUE) {
    case sidebar.classList.contains(Utils.class_mod.SIDEBAR_CLOSED):
      sidebar.classList.remove(Utils.class_mod.SIDEBAR_CLOSED);
      searchInput.removeEventListener('click', onSearchClick);
      searchInput.removeEventListener('keydown', onSearchInput);
      break;

    default:
      sidebar.classList.add(Utils.class_mod.SIDEBAR_CLOSED);
      searchInput.addEventListener('click', onSearchClick);
      searchInput.addEventListener('keydown', onSearchInput);
      resetSearchInput();
  }

  // --- Условие для корректного закрытия списка "Проектов" ---
  if (!projectsList.classList.contains(Utils.class_mod.PROJECTS_LIST_CLOSED_MOD)) {
    projectsList.classList.add(Utils.class_mod.PROJECTS_LIST_CLOSED_MOD);
    ProjectsLinksManipulation.deactivateTabindex();
  }
};


// --- Добавление обработчиков событий ---
sidebarToggleButton.addEventListener('click', onSidebarToggleButtonClick);
