import { src, dest } from 'gulp';

// --- Оптимизация изображений ---
import imagemin from 'gulp-imagemin';
import webp from 'gulp-webp';
import svgstore from 'gulp-svgstore';
import cheerio from 'gulp-cheerio';

// --- Вспомогательные утилиты ---
import rename from 'gulp-rename';
// const pipeline = require('readable-stream').pipeline;

/*
--- Импорт утилитарных модулей ---
--- ---
--- 1) с описанием путей к Файлам проекта
--- 2) модуль с константами и утилитами
*/ 
import PATH_TO from '../path-to';
import Utils from '../utils';


/*
=====================================================
------------------- ОСНОВНОЙ ТАСК -------------------
=====================================================
*/

// --- Список составных путей к наборам изображений в разных форматах ---
const path_to_images_set = {
  of_all_formats: PATH_TO.source.images + '**/*.{png,jpg,svg}',
  of_bitmaps: PATH_TO.source.images + '**/*.{png,jpg}',
  of_svg_icons: PATH_TO.source.images + '**/{icon-*}.svg',
};


// *** Оптимизация изображений ***
export const images = () => {
  return Utils.pipeline(
    src(path_to_images_set.of_all_formats),
    imagemin([
      imagemin.optipng({
        optimizationLevel: 5
      }),
      imagemin.mozjpeg({
        quality: 90,
        progressive: true
      }),
      imagemin.svgo()
    ]),
    dest(PATH_TO.source.images)
  );
};


// *** Переформатирование изображений в WebP ***
export const transformToWebp = () => {
  return Utils.pipeline(
    src(path_to_images_set.of_bitmaps),
    webp({
      quality: 90
    }),
    dest(PATH_TO.source.images)
    );
  };

  
// *** Сборка SVG-спрайта ***
export const sprite = () => {
  return Utils.pipeline(
    src(path_to_images_set.of_svg_icons),
    cheerio({
      run: ($) => {
        $('[fill]').removeAttr('fill');
      },
      parserOptions: {
        xmlMode: true
      },
    }),
    svgstore({
      inlineSvg: true
    }),
    rename('sprite_auto.svg'),
    dest(PATH_TO.build.images)
  );
};

// *** Функция для ручной оптимизации изображений ***
export const imagesoptimisation = () => {
  images();
  transformToWebp();
};
