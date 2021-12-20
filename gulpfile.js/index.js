global.$ = {
    //Пакеты
    gulp: require('gulp'),
    gp: require('gulp-load-plugins')(),
    browserSync: require('browser-sync').create(),

    // Конфигурация
    path: require('./config/path.js'),
    app: require('./config/app.js'),
}

// src - Метод src вызываем в самом начале и передаем путь до исходных данных
// pipe() -  передача потока записи
// dest() - ему мы доложны указать путь для сохранения полученых файлов
// watch() - наблюдение за файлами
// series() - когда нужно запустить несколько задач друг за другом
// parallel() - для одновременного выполнения задач когда их порядок не имеет значения

// Маски
// return src('./src/html/*.html') - *.html все html файлы
// return src('./src/html/*.*') - *.* все  файлы
// return src('./src/html/*.{html,css}') - *.{html, css} перечислить нужные файлы
// return src('./src/{html,css}/*.{html,css}') - *.{html, css} тоже самое для директорий
// return src('./src/**/*.*') - поиск всех файлов в src независимо от вложености
// return src(['./src/**/*.css', './src/**/*.js']) - можно указать не одну маску а целый массив
// return src(['./src/**/*.*, '!./src/**/*.js']) - ! исключения, все файлы за исключением js

// Задачи
const requireDir = require('require-dir');
const task = requireDir('./task', {recurse: true})
// const clear = require('./task/clear.js');
// const server = require('./task/server.js');
// const pug = require('./task/pug.js');
// // const css = require('./task/css.js');
// const scss = require('./task/scss.js');
// const js = require('./task/js.js');
// const img = require('./task/img.js');
// const font = require('./task/font.js');
// // const html = require('./task/html');

const { watch } = require("gulp");

// Наблюдение
const watcher = () => {
    watch($.path.pug.watch, task.pug);
    watch($.path.scss.watch, task.scss);
    watch($.path.js.watch, task.js);
    watch($.path.img.watch, task.img);
    watch($.path.font.watch, task.font);
    // watch(path.css.watch, css).on('all', browserSync.reload)
    // watch('./src/html/**/*.html', html) // Передача 2х параметров: маска файлов а которыми надо следить и список задач которые необходимо запускать при их изменении
    
} 

const build = $.gulp.series(
    task.clear,
    $.gulp.parallel(task.pug, task.scss, task.js, task.img, task.font)
);
const dev = $.gulp.series(
    build,
    $.gulp.parallel(watcher, task.server)
);

// Задачи - экспорт задач

exports.pug = task.pug;
exports.scss = task.scss;
exports.js = task.js;
exports.img = task.img;
exports.font = task.font;
// exports.css = css;



// Сборка
// exports.dev = series(
//     // clear, // удаление в самом начале
//     // parallel(pug, scss, js, img, font), // css или scss
//     // // html,
//     build,
//     parallel(watcher, server)
// );

exports.default = $.app.isProd ? build : dev;

// команды для сборки
// 'gulp' - режим разработки
// 'gulp --production' - сборка production