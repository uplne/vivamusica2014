var config = require('../config');

module.exports = function(app) {
    // Home route
    app.get("/", function(req, res) {
        res.render('content/index', {
            title: 'Vivamusica! festival 2014',
            imageAssets: config.paths.images,
            cssAssets: config.paths.css,
            news: [
                {title1: "Yehuda", title2: "Katz", img: "static/images/news/news1.jpg"},
                {title1: "Yehuda2", title2: "Katz2", img: "static/images/news/news1.jpg"},
                {title1: "Yehuda3", title2: "Katz2", img: "static/images/news/news1.jpg"},
                {title1: "Yehuda4", title2: "Katz2", img: "static/images/news/news1.jpg"}
            ],
            clientNav: clientNav
        });
    });

    // Actual item
    app.get("/program/viva-opera", function(req, res) {
        res.render('content/programdetailvivaopera', {
            title: 'Viva Opera!'
        });
    });

    // Actual item
    app.get("/program/:id", function(req, res) {
        res.render('content/programdetail', {
            title: 'Viva Hapka'
        });
    });

    // Actual item
    app.get("/vstupenky", function(req, res) {
        res.render('content/vstupenky', {
            title: 'Vstupenky'
        });
    });

    var clientNav = [
        {
            name: 'Home',
            key: 'admin.navbar.content',
            path: '/'
        },
        {
            name: 'Program',
            key: 'admin.navbar.content',
            path: '/program'
        },
        {
            name: 'Vstupenky',
            key: 'admin.navbar.content',
            path: '/vstupenky'
        },
        {
            name: 'galeria',
            key: 'admin.navbar.content',
            path: '/galeria'
        },
        {
            name: 'Hall of fame',
            key: 'admin.navbar.content',
            path: '/halloffame'
        },
        {
            name: 'Kontakt',
            key: 'admin.navbar.content',
            path: '/kontakt'
        }
    ];
};
