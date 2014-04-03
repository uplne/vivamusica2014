var mongoose = require('mongoose'),
    Program     = mongoose.model('Program');

exports.list = function() {
    Program.find(function(err, program) {
        if (!err) {
            callback(program, null)
        } else {
            callback(null, err);
        }
    });
};
