const { src, dest } = require('gulp');

// Плагины
const plumber = require('gulp-plumber'); // обработка ошибок
const notify = require('gulp-notify'); // всплывающие сообщения ошибок
const fileInclede = require('gulp-file-include');
const htmlmin = require('gulp-htmlmin'); // сжатие html
const size = require('gulp-size'); // узнать размер до минификации и после

// Конфигурация
const path = require('../config/path.js');
const app = require('../config/app.js');

//Обработка html
const html = () => {
    return src(path.html.src)
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
        .pipe(htmlmin(app.htmlmin))
        .pipe(size({ title: 'После сжатия' }))
        .pipe(dest(path.html.dest))
}

module.exports = html;