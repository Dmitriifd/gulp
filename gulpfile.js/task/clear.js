const del = require('del'); 

// Конфигурация
const path = require('../config/path.js');

// Удаление директории
const clear = () => {
    return del(path.root); // директория для удаления
}

module.exports = clear;