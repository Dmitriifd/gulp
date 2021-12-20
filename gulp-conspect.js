// Подключение нужных пакетов
const { src, dest, watch, series, parallel } = require('gulp'); // деструктуризация методов gulp
// Плагины
const plumber = require('gulp-plumber'); // обработка ошибок
const notify = require('gulp-notify'); // всплывающие сообщения ошибок
const fileInclede = require('gulp-file-include');
const htmlmin = require('gulp-htmlmin'); // сжатие html
const size = require('gulp-size'); // узнать размер до минификации и после

const browserSync = require('browser-sync').create();
const del = require('del');
const pugs = require('gulp-pug');


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


//Обработка html
const html = () => {
    return src('./src/html/*.html')
        // Плагин
        // Плагин
        .pipe(plumber({
            errorHandler: notify.onError(error => ({
                title: 'HTML',
                message: error.message
            }))
        }))
        .pipe(size({ title: 'До сжатия' }))
        .pipe(fileInclede()) // вызываем плагин в pipe
        .pipe(htmlmin({
            collapseWhitespace: true,
        })) // в {} указываются параметры плагина
        .pipe(size({ title: 'После сжатия' }))
        .pipe(dest('./public'))
        .pipe(browserSync.stream())
}

//Обработка PUG
const pug = () => {
    return src('./src/pug/*.pug')
        // Плагин
        // Плагин
        .pipe(plumber({
            errorHandler: notify.onError(error => ({
                title: 'Pug',
                message: error.message
            }))
        }))
        .pipe(pugs({
            pretty: true, // чтобы html не сжимался
            data: {
                news: require('./data/news.json') // переменная news теперь доступна во всех шаблонах pug
            }
        }))
        .pipe(dest('./public'))
        .pipe(browserSync.stream())
}


// Удаление директории
const clear = () => {
    return del('./public'); // директория для удаления
}

// Сервер
const server = () => {
    browserSync.init({
        server: {
            baseDir: './public'
        }
    })
}

// Наблюдение
const watcher = () => {
    watch('./src/pug/**/*.pug', pug)
    // watch('./src/html/**/*.html', html) // Передача 2х параметров: маска файлов а которыми надо следить и список задач которые необходимо запускать при их изменении

}

// Задачи - экспорт задач
// exports.html = html;
exports.pug = pug;
exports.watch = watcher;
exports.clear = clear;


// Сборка
exports.dev = series(
    clear, // удаление в самом начале
    // html,
    pug,
    parallel(watcher, server)
);

//Команды
// gulp --tasks список задач которые есть
// npm init --y или --yes иницилизация проекта
// npm i -D gulp size - установка плагинов в devDependencies
