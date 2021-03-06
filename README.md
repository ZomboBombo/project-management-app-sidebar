
# Сайдбар для компании *«Lepekhin Art Studio»*

***Сайдбар*** — часть полноценного приложения для управления проектами внутри компании.
Идея и дизайн взяты из тестового задания от [*студии Евгения Лепёхина*](https://lepekhin.studio/ "Ссылка на сайт студии Евгения Лепёхина") на позицию *HTML-верстальщика*.

--  
***Затраченное время***: 26 часов.

***Используемые технологии***:
* HTML/CSS;
* JavaScript *(синтаксис ES6)*;
* CSS-препроцессор *Sass (синтаксис SCSS)*;
* для сборки: *Gulp*, *Babel*;


## Поддержка устройствами

 1. **ДОСТУПНЫЕ РАЗРЕШЕНИЯ ЭКРАНОВ**
	 * ***Сайдбар*** корректно отображается на разрешении экрана *1920х1080*.
	 * *Максимальная ширина* контейнера — *1920px*: на ширине экрана *шире максимальной* ***Сайдбар*** и основное содержимое сайта будет отцентровано посередине.
	 * *Минимальная ширина* ***Сайдбара*** — *768px*: если ширина экрана *уже* минимальной, будет отображено *модальное окно с уведомлением* о неподдерживаемости устройством данного приложения.
	 
2. **БРАУЗЕРЫ**  
***Сайдбар*** корректно отображается и функционирует во всех современных популярных браузерах:
	* *Mozilla Firefox @93.0.x*
	* *Google Chrome @95.0.x*
	* *Microsoft Edge @95.0.x*
	* *Opera @80.0.x*
	* *Яндекс.Браузер @21.9.x*

3. **ПЛАТФОРМЫ**  
Данная версия приложения настроена для использования на устройствах, работющих под ***ОС&nbsp;Windows***.


## Функционал
В приложении доступна функция изменения *цветовой Темы* ***Сайдбара***.
Установленная Тема сохраняется в *localStorage* браузера, поэтому при следующем открытии страницы с приложением к ***Сайдбару*** применится последняя выбранная цветовая Тема.


## Порядок работы со сборкой

### Для начала работы у вас должны быть установлены:
* *Node.js*: не ниже **v.14.15.5**
* *npm*: **6.14.11** или выше
* *Gulp*: не ниже **v4**

### Основные команды для работы
* Установка всех необходимых пакетов — `npm i`
* Запуск проекта для разработки: — `npm start`
* Сборка проекта для продакшена: — `npm run build`
* Запуск проверки на соответствия код-гайдам — `npm test`
