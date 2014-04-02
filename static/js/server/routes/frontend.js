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
            clientnav: setSelected('Home', clientNav)
        });
    });

    // TODO - create utils module, use underscore or create own functional library
    var setSelected = function(item, items) {
        var len = items.length,
            i;

        for (i = 0; i < len; i++) {
            items[i].selected = items[i].name=== item;
        }

        return items;
    };

    // Actual item
    app.get("/program/viva-opera", function(req, res) {
        res.render('content/programdetailvivaopera', {
            title: 'Viva Opera!',
            clientnav: setSelected('Program', clientNav)
        });
    });

    // Actual item
    app.get("/program/:id", function(req, res) {
        res.render('content/programdetail', {
            title: 'Už čoskoro!',
            clientnav: setSelected('Program', clientNav)
        });
    });

    // Actual item
    app.get("/vstupenky", function(req, res) {
        res.render('content/vstupenky', {
            title: 'Vstupenky',
            clientnav: setSelected('Vstupenky', clientNav)
        });
    });

    var clientNav = [
        {
            name: 'Home',
            path: '/'
        },
        {
            name: 'Program',
            path: '/program'
        },
        {
            name: 'Vstupenky',
            path: '/vstupenky'
        },
        {
            name: 'Galéria',
            path: '/galeria'
        },
        {
            name: 'Hall of fame',
            path: '/halloffame'
        },
        {
            name: 'Kontakt',
            path: '/kontakt'
        }
    ];
};
