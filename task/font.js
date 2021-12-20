const { src, dest } = require('gulp'); 

// Плагины
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const newer = require('gulp-newer'); // чтобы повторно не конвертировать уже обработанные шрифты
const fonter = require('gulp-fonter'); 
const ttw2woff2 = require('gulp-ttf2woff2'); 

// Конфигурация
const path = require('../config/path.js');
const app = require('../config/app.js');

//Обработка Font
const font = () => {
    return src(path.font.src)
    // Плагин
    // Плагин
    .pipe(plumber({
        errorHandler: notify.onError(error => ({
            title: 'Font',
            message: error.message
        }))
    }))
    .pipe(newer(path.font.dest))
    .pipe(fonter(app.fonter))
    .pipe(dest(path.font.dest))
    .pipe(ttw2woff2())
    .pipe(dest(path.font.dest))
}

module.exports = font;