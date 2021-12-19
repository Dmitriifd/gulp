module.exports = {
    htmlmin: {
        collapseWhitespace: true,
    },
    pug: {
        pretty: true, // чтобы html не сжимался
        data: {
            news: require('../data/news.json') // переменная news теперь доступна во всех шаблонах pug
        }
    }
}