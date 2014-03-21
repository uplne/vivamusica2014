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
                {title1: "Yehuda2", title2: "Katz2", img: "static/images/news/news1.jpg"}
            ]
        });
    });

    // Actual item
    app.get("/program/:id", function(req, res) {
        res.render('content/programdetail', {
            title: 'Viva Hapka'
        });
    });

    /*exphbs.registerHelper('imageAssets', function (context, options) {
        var output = '/static/images' + context;

        return new exphbs.SafeString(output);
    });

    exphbs.registerHelper('cssAssets', function (context, options) {
        var output = '/static/css' + context;

        return new exphbs.SafeString(output);
    });*/
};
