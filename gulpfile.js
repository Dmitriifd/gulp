// Подключение нужных пакетов
import gulp from 'gulp';
import browserSync from 'browser-sync'; 

// Конфигурация
import path from './config/path.js';
import app from './config/app.js';

// Задачи
import clear from './task/clear.js';
import pug from './task/pug.js';
// // const css = require('./task/css.js');
// const scss = require('./task/scss.js');
// const js = require('./task/js.js');
// const img = require('./task/img.js');
// const font = require('./task/font.js');
// // const html = require('./task/html');

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

// Сервер
const server = () => {
    browserSync.init({
        server: {
            baseDir: path.root
        }
    })
}

// Наблюдение
const watcher = () => {
    gulp.watch(path.pug.watch, pug).on('all', browserSync.reload)
    // watch(path.scss.watch, scss).on('all', browserSync.reload)
    // watch(path.js.watch, js).on('all', browserSync.reload)
    // watch(path.img.watch, img).on('all', browserSync.reload)
    // watch(path.font.watch, font).on('all', browserSync.reload)
    // watch(path.css.watch, css).on('all', browserSync.reload)
    // watch('./src/html/**/*.html', html) // Передача 2х параметров: маска файлов а которыми надо следить и список задач которые необходимо запускать при их изменении
    
} 

const build = gulp.series(
    clear,
    gulp.parallel(pug)
    // parallel(pug, scss, js, img, font)
);
const dev = gulp.series(
    build,
    gulp.parallel(watcher, server)
);

// Задачи - экспорт задач
export { pug }

// exports.pug = pug;
// exports.scss = scss;
// exports.js = js;
// exports.img = img;
// exports.font = font;
// exports.css = css;



// Сборка
// exports.dev = series(
//     // clear, // удаление в самом начале
//     // parallel(pug, scss, js, img, font), // css или scss
//     // // html,
//     build,
//     parallel(watcher, server)
// );

export default app.isProd ? build : dev;

// команды для сборки
// 'gulp' - режим разработки
// 'gulp --production' - сборка production