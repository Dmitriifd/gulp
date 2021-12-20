const { src, dest } = require('gulp'); 

// Плагины
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const concat = require('gulp-concat');
const cssimport = require('gulp-cssimport');
const autoprefixer = require('gulp-autoprefixer');
const csso = require('gulp-csso'); // сжатие стилей
const rename = require('gulp-rename'); 
const size = require('gulp-size'); 
const shorthand = require('gulp-shorthand'); // сокращения для css свойств
const groupCssMedia = require('gulp-group-css-media-queries');
const webpCss = require('gulp-webp-css');

// Конфигурация
const path = require('../config/path.js');
const app = require('../config/app.js');

//Обработка Css
const css = () => {
    return src(path.css.src, { sourcemaps: true })
    // Плагин
    // Плагин
    .pipe(plumber({
        errorHandler: notify.onError(error => ({
            title: 'CSS',
            message: error.message
        }))
    }))
    .pipe(concat('main.css')) // имя файла который должен вернуть
    .pipe(cssimport())
    .pipe(webpCss())
    .pipe(autoprefixer())
    .pipe(shorthand())
    .pipe(groupCssMedia())
    .pipe(size({ title: 'main.css' }))
    .pipe(dest(path.css.dest, { sourcemaps: true }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(csso())
    .pipe(size({ title: 'main.min.css' }))
    .pipe(dest(path.css.dest, { sourcemaps: true }))
}

module.exports = css;