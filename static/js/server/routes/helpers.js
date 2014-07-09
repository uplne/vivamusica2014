var mongoose = require('mongoose'),
    config   = require('../config');

/**
 * Helper functions for routers
 */

var api = {
    /**
     * Iterate through program results and add previous/next links.
     *
     * @param  {Array} arr Array of results
     * @return {Array}     New array of results
     */
    addProgramLinks: function(arr) {
        var prev   = "",
            next   = "",
            last   = arr.length - 1,
            actual = 0;

        for (var i in arr) {
            if (arr.hasOwnProperty(i)) {

                actual = parseInt(i);

                // if first item get last item as previous
                if (actual === 0 && arr.hasOwnProperty(last)) {
                    prev = arr[last].path;
                    next = arr[actual + 1].path;

                // if last item get fist item as next
                } else if (actual === last && arr.hasOwnProperty(last)) {
                    prev = arr[actual - 1].path;
                    next = arr[0].path;

                // in between as usual
                } else {
                    prev = arr[actual - 1].path;
                    next = arr[actual + 1].path;
                }

                // Add to program array
                arr[actual].prev = prev;
                arr[actual].next = next;
            }
        }

        return arr;
    },

    /**
     * Set selected object so we can highlight it in template
     *
     * @param  {String} item  Name/label of the item
     * @return {Array}        Returning the updated array so template engine can see which one is active
     */
    setSelected: function(item) {
        var len = clientNav.length,
            i;

        for (i = 0; i < len; i++) {
            clientNav[i].selected = clientNav[i].name_sk === item;
            clientNav[i].name     = clientNav[i]["name_" + config.lang];
        }

        return clientNav;
    },

    /**
     * Get actual item from DB results. FindOne functionality
     *
     * @param  {Array}  arr  The array of results
     * @param  {String} item Path
     * @return {Object}      Return actual array field matching the item/path
     */
    getActualItem: function(arr, item) {
        for (var i in arr) {
            if (arr.hasOwnProperty(i) && arr[i].path === item) {
                return arr[i];
            }
        }
    },

    /**
     * Get all images by year from folder
     *
     * @param  {String} year Actual year from URL
     * @return {Array}       The array of image paths
     */
    getImagesFromGallery: function(year) {
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
    },

    getGalleries: function() {
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
    },

    /**
     * Get data from DB for program
     *
     * @return {Array} Array of results from DB
     */
    getProgram: function() {
        var programModel = mongoose.model('Program'),
            programQuery = programModel.find({}).sort([['_id', 'ascending']]);

        return programQuery;
    }
};

var clientNav = [
    {
        name_sk: 'Program',
        name_en: 'Program',
        path: '/'
    },
    {
        name_sk: 'Festival',
        name_en: 'Festival',
        path: '/festival'
    },
    /*{
        name: 'Galéria',
        path: '/galeria/2012'
    },*/
    {
        name_sk: 'Hall of fame',
        name_en: 'Hall of fame',
        path: '/halloffame'
    },
    {
        name_sk: 'Kontakt',
        name_en: 'Contact',
        banner: "/static/images/team/all.jpg",
        path: '/kontakt'
    },
    {
        name_sk: 'Press',
        name_en: 'Press',
        path: '/press'
    },
    {
        name_sk: 'Partneri',
        name_en: 'Partners',
        path: '/partneri'
    }
];

module.exports = api;
