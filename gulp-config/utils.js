// --- Вспомогательные утилиты ---
const pipeline = require('readable-stream').pipeline;

// --- Серверные утилиты ---
const browserSync = require('browser-sync').create();


export default {
  pipeline: pipeline,
  browserSync: browserSync
};
