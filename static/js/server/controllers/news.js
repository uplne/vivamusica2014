var mongoose = require('mongoose'),
    News     = mongoose.model('News');

exports.list = function(callback) {
    News.find(function(err, news) {
        if (!err) {
            callback(news, null)
        } else {
            callback(null, err);
        }
    });
};
