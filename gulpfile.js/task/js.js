const { src, dest } = require('gulp'); 

// Плагины
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const babel = require('gulp-babel');
const webpack = require('webpack-stream');

// Конфигурация
const path = require('../config/path.js');
const app = require('../config/app.js');

//Обработка JavaScript
const js = () => {
    return src(path.js.src, { sourcemaps: app.isDev })
    // Плагин
    // Плагин
    .pipe(plumber({
        errorHandler: notify.onError(error => ({
            title: 'JavaScript',
            message: error.message
        }))
    }))
    .pipe(babel())
    .pipe(webpack(app.webpack))
    .pipe(dest(path.js.dest, { sourcemaps: app.isDev }))
    .pipe($.browserSync.stream());
}

module.exports = js;