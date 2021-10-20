// ----------- КОНСТАНТЫ ----------
const IS_TRUE = true;
const SIDEBAR_CLOSED = 'closed-sidebar';
const PROJECTS_LIST_CLOSED_MOD = 'projects__list--closed';

/*
 *** Объект с описанием методов
 *** для включения/отключения "tabindex"
 *** у ссылок списка "Проектов".
 */
const ProjectsLinksManipulation = {
  deactivateTabindex: () => {
    Array.from(projectsLinks).forEach((element) => {
      element.setAttribute('tabindex', -1);
    })
  },

  activateTabindex: () => {
    Array.from(projectsLinks).forEach((element) => {
      element.removeAttribute('tabindex');
    })
  },
};


// --------- DOM-элементы ---------
const sidebar = document.querySelector('#sidebar');
const sidebarToggleButton = sidebar.querySelector('#sidebar-toggle-button');

const projectsSection = sidebar.querySelector('#projects-section');
const projectsOpenButton = projectsSection.querySelector('#projects-open-button');
const projectsList = projectsSection.querySelector('#projects-list');
const projectsLinks = projectsList.querySelectorAll('.projects__list-link');


/*
=======================================================================
--------------------------- ОСНОВНАЯ ЛОГИКА ---------------------------
=======================================================================
*/

/*
 * --- Необходимое первичное добавление Сайдбару и некоторым его вложенным элементов
 * --- соответствующих модификаторов, чтобы корректно свернуть всё необходимое,
 * --- т.к. по умолчанию Сайдбар и все его "внутренности" всегда "развёрнуты"
 */ 
sidebar.classList.add(SIDEBAR_CLOSED);
projectsList.classList.add(PROJECTS_LIST_CLOSED_MOD);

// *** Настройка для отключения интерактивности ссылок  ***
/*
 * --- Необходима для того, чтобы избежать попадания фокуса на ссылки,
 * --- вложенные в список "Проекты", когда сам список скрыт.
 */
ProjectsLinksManipulation.deactivateTabindex();


// *** Функция для обработчика события Клика по кнопке-переключателю состояния Сайдбара ***
const onSidebarToggleButtonClick = (evt) => {
  evt.preventDefault();
  sidebar.classList.toggle(SIDEBAR_CLOSED);

  // --- Условие для корректного закрытия списка "Проектов" ---
  if (!projectsList.classList.contains(PROJECTS_LIST_CLOSED_MOD)) {
    projectsList.classList.add(PROJECTS_LIST_CLOSED_MOD);
    ProjectsLinksManipulation.deactivateTabindex();
  }
};

// *** Функция для обработчика события Клика по кнопке открытия списка "Проектов" ***
const onProjectsOpenButtonClick = (evt) => {
  evt.preventDefault();
  projectsList.classList.toggle(PROJECTS_LIST_CLOSED_MOD);

  switch (IS_TRUE) {
    case projectsList.classList.contains(PROJECTS_LIST_CLOSED_MOD):
      ProjectsLinksManipulation.deactivateTabindex();
      break;

    default:
      ProjectsLinksManipulation.activateTabindex();
  }

  // --- Условие для открытия Сайдбара при клике на "Проекты" ---
  if (sidebar.classList.contains(SIDEBAR_CLOSED)) {
    sidebar.classList.remove(SIDEBAR_CLOSED);
  }
};


// --- Добавление обраотчиков событий ---
sidebarToggleButton.addEventListener('click', onSidebarToggleButtonClick);
projectsOpenButton.addEventListener('click', onProjectsOpenButtonClick);
