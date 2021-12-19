// Подключение нужных пакетов
const { watch, series, parallel } = require('gulp');
const browserSync = require('browser-sync').create(); 

// Конфигурация
const path = require('./config/path.js');

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

const clear = require('./task/clear.js');
const pug = require('./task/pug.js');
const css = require('./task/css.js');
const scss = require('./task/scss.js');
// const html = require('./task/html');

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
    watch(path.pug.watch, pug).on('all', browserSync.reload)
    watch(path.scss.watch, scss).on('all', browserSync.reload)
    // watch(path.css.watch, css).on('all', browserSync.reload)
    // watch('./src/html/**/*.html', html) // Передача 2х параметров: маска файлов а которыми надо следить и список задач которые необходимо запускать при их изменении
    
} 

// Задачи - экспорт задач

exports.pug = pug;
exports.scss = scss;
// exports.css = css;



// Сборка
exports.dev = series(
    clear, // удаление в самом начале
    parallel(pug, scss), // css или scss
    // html,
    parallel(watcher, server)
);