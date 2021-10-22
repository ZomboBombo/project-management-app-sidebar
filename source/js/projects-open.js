import Utils from './utils';


// --------- DOM-элементы ---------
const sidebar = document.querySelector('#sidebar');

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
 *** Объект с описанием методов
 *** для включения/отключения "tabindex"
 *** у ссылок списка "Проектов".
 */
 export const ProjectsLinksManipulation = {
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

// --- Первичное добавление "свёрнутого" состояния для списка проектов ---
projectsList.classList.add(Utils.class_mod.PROJECTS_LIST_CLOSED_MOD);

// *** Настройка для отключения интерактивности ссылок  ***
/*
 * --- Необходима для того, чтобы избежать попадания фокуса на ссылки,
 * --- вложенные в список "Проекты", когда сам список скрыт.
 */
ProjectsLinksManipulation.deactivateTabindex();


// *** Функция для обработчика события Клика по кнопке открытия списка "Проектов" ***
export const onProjectsOpenButtonClick = (evt) => {
  evt.preventDefault();
  projectsList.classList.toggle(Utils.class_mod.PROJECTS_LIST_CLOSED_MOD);

  switch (Utils.constant.IS_TRUE) {
    case projectsList.classList.contains(Utils.class_mod.PROJECTS_LIST_CLOSED_MOD):
      ProjectsLinksManipulation.deactivateTabindex();
      break;

    default:
      ProjectsLinksManipulation.activateTabindex();
  }

  // --- Условие для открытия Сайдбара при клике на "Проекты" ---
  if (sidebar.classList.contains(Utils.class_mod.SIDEBAR_CLOSED)) {
    sidebar.classList.remove(Utils.class_mod.SIDEBAR_CLOSED);
  }
};


// --- Добавление обработчиков событий ---
projectsOpenButton.addEventListener('click', onProjectsOpenButtonClick);
