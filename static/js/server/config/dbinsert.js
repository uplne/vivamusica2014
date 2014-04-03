var mongoose = require('mongoose'),
    News     = mongoose.model('News');

var newNews = new News({
    title1: "1. potvrdený koncert",
    title2: "Operné gala",
    img: "static/images/news/vivaopera.jpg",
    path: "program/viva-opera"
});

/*newNews.save(function(err) {
    if (!err) {
        console.log('News saved');
    }
});*/
