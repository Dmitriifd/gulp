import news from '../data/news.json';

const isProd = process.argv.includes('--production');
const isDev = !isProd;

export default {
    isProd: isProd,
    isDev: isDev,

    htmlmin: {
        collapseWhitespace: isProd,
    },
    pug: {
        pretty: isDev, // чтобы html не сжимался
        data: {
            news: news // переменная news теперь доступна во всех шаблонах pug
        }
    },
    webpack: {
        mode: isProd ? 'production' : 'development',
        // mode: 'development',
        // mode: 'production',
    },
    imagemin: {
        verbose: true
    },
    fonter: {
        formats: ['ttf', 'woff', 'eot', 'svg']
    }
}