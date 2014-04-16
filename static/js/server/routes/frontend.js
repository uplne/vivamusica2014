var config   = require('../config'),
    helpers  = require('./helpers'),
    async    = require('async'),
    mongoose = require('mongoose'),
    fs       = require('fs');

    /*news    = require('../controllers/news'),
    program = require('../controllers/program');*/

module.exports = function(app) {

    // Home/Program route
    app.get("/", function(req, res) {
        var programModel = mongoose.model('Program'),
            programQuery = programModel.find({}).sort([['_id', 'ascending']]),

            resources = {
                programQuery: programQuery.exec.bind(programQuery)
            };

        // Parallel requests to DB
        async.parallel(resources, function(err, results) {
            res.render('content/index', {
                title: 'Vivamusica! festival 2014',
                imageAssets: config.paths.images,
                cssAssets: config.paths.css,
                clientnav: helpers.setSelected('Program', clientNav),
                program: results.programQuery
            });
        });
    });

    // Program
    app.get("/program/:page", function(req, res) {
        var programModel = mongoose.model('Program'),
            programQuery = programModel.find({}).sort([['_id', 'ascending']]),

            resources = {
                programQuery: programQuery.exec.bind(programQuery)
            };

        async.parallel(resources, function(err, results) {
            // Add prev/next links and get actual item
            var item = helpers.getActualItem(helpers.addProgramLinks(results.programQuery), req.params.page);

            res.render('content/programdetail', {
                datenum: item.datenum,
                datemonth: item.datemonth,
                place: item.place,
                title: item.title,
                intro: item.intro,
                text: item.text,
                img: item.img,
                prev: item.prev,
                next: item.next,
                tickets: item.tickets,
                program: results.programQuery,
                clientnav: helpers.setSelected('Program', clientNav)
            });
        });
    });

    // Hall of fame
    app.get("/halloffame", function(req, res) {
        var halloffameModel = mongoose.model('Halloffame'),
            halloffameQuery = halloffameModel.find(),
            programModel = mongoose.model('Program'),
            programQuery = programModel.find({}).sort([['_id', 'ascending']]),

            resources = {
                halloffameQuery: halloffameQuery.exec.bind(halloffameQuery),
                programQuery: programQuery.exec.bind(programQuery)
            };

        async.parallel(resources, function(err, results) {

            res.render('content/halloffame', {
                pagetitle: "Vivamusica! festival 2014 - Hall of fame",
                halloffame: results.halloffameQuery,
                clientnav: helpers.setSelected('Hall of fame', clientNav),
                program: results.programQuery
            });
        });
    });

    // Hall of fame
    app.get("/halloffame/:page", function(req, res) {
        var halloffameModel = mongoose.model('Halloffame'),
            halloffameQuery = halloffameModel.find({'path': req.params.page}),
            programModel = mongoose.model('Program'),
            programQuery = programModel.find({}).sort([['_id', 'ascending']]),

            resources = {
                halloffameQuery: halloffameQuery.exec.bind(halloffameQuery),
                programQuery: programQuery.exec.bind(programQuery)
            };

        async.parallel(resources, function(err, results) {
            var item = results.halloffameQuery[0];

            res.render('content/persondetail', {
                pagetitle: "Vivamusica! festival 2014 - Hall of fame - " + item.title1 + " " + item.title2,
                banner: "/static/images/team/all.jpg",
                title1: item.title1,
                title2: item.title2,
                intro: item.intro,
                text: item.text,
                img: item.img,
                clientnav: helpers.setSelected('Hall of fame', clientNav),
                program: results.programQuery
            });
        });
    });

    // Kontakt
    app.get("/kontakt", function(req, res) {
        var kontaktModel = mongoose.model('Kontakt'),
            kontaktQuery = kontaktModel.find(),
            programModel = mongoose.model('Program'),
            programQuery = programModel.find({}).sort([['_id', 'ascending']]),

            resources = {
                kontaktQuery: kontaktQuery.exec.bind(kontaktQuery),
                programQuery: programQuery.exec.bind(programQuery)
            };

        async.parallel(resources, function(err, results) {
            res.render('content/kontakt', {
                pagetitle: "Vivamusica! festival 2014 - Kontakt",
                kontakt: results.kontaktQuery,
                clientnav: helpers.setSelected('Kontakt', clientNav),
                program: results.programQuery
            });
        });
    });

    // Kontakt detail
    app.get("/kontakt/:page", function(req, res) {
        var kontaktModel = mongoose.model('Kontakt'),
            kontaktQuery = kontaktModel.find(),
            programModel = mongoose.model('Program'),
            programQuery = programModel.find({}).sort([['_id', 'ascending']]),

            resources = {
                kontaktQuery: kontaktQuery.exec.bind(kontaktQuery),
                programQuery: programQuery.exec.bind(programQuery)
            };

        async.parallel(resources, function(err, results) {
            var item = getActualItem(results.kontaktQuery, req.params.page);

            res.render('content/persondetail', {
                pagetitle: "Vivamusica! festival 2014 - " + item.title1 + " " + item.title2,
                banner: "/static/images/team/all.jpg",
                title1: item.title1,
                title2: item.title2,
                title: item.title,
                text: item.text,
                img: item.img,
                kontakt: results.kontaktQuery,
                clientnav: helpers.setSelected('Kontakt', clientNav),
                program: results.programQuery
            });
        });
    });

    // Festival
    app.get("/festival", function(req, res) {
        var programModel = mongoose.model('Program'),
            programQuery = programModel.find({}).sort([['_id', 'ascending']]),

            resources = {
                programQuery: programQuery.exec.bind(programQuery)
            };

        // Parallel requests to DB
        async.parallel(resources, function(err, results) {
            res.render('content/festival', {
                title: 'Vivamusica! festival 2014 - Festival',
                clientnav: helpers.setSelected('Festival', clientNav),
                program: results.programQuery
            });
        });
    });

    // Galeria
    app.get("/galeria/:year", function(req, res) {
        res.render('content/galeria', {
            title: 'Galeria',
            galleries: getGalleries(),
            imgs: getImagesFromGallery(req.params.year),
            clientnav: helpers.setSelected('Galéria', clientNav)
        });
    });

    /**
     * Get all images by year from folder
     *
     * @param  {String} year Actual year from URL
     * @return {Array}       The array of image paths
     */
    var getImagesFromGallery = function(year) {
        var files   = fs.readdirSync(config.paths.images + '/gallery/' + year),
            paths   = [],
            pattern = /(.(?:jpg|gif|png|jpeg|JPG|GIF|PNG|JPEG))/gm;

        for (var i in files) {
            if (files.hasOwnProperty(i) && files[i].match(pattern)) {
                paths.push({
                    'img': '/static/images/gallery/' + year + '/' + files[i],
                    'imgthumb': '/static/images/gallery/' + year + '/thumbs/' + files[i]
                });
            }
        }

        return paths;
    };

    var getGalleries = function() {
        var files   = fs.readdirSync(config.paths.images + '/gallery/'),
            galls   = [],
            pattern = /[0-9]+/;

        for (var i in files) {
            if (files.hasOwnProperty(i) && files[i].match(pattern)) {
                galls.push({
                    'title': files[i]
                });
            }
        }

        return galls.reverse();
    };

    // TODO - do it nicer
    var clientNav = [
        {
            name: 'Program',
            path: '/'
        },
        {
            name: 'Festival',
            path: '/festival'
        },
        {
            name: 'Galéria',
            path: '/galeria/2012'
        },
        {
            name: 'Hall of fame',
            path: '/halloffame'
        },
        {
            name: 'Kontakt',
            banner: "/static/images/team/all.jpg",
            path: '/kontakt'
        }
    ];
};
