/**
* Module dependencies.
*/

var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

/**
 * Program schema
 */
var NewsSchema = new Schema({
    title1: {type: String, default: ''},
    title2: {type: String, default: ''},
    img: {type: String, default: ''},
    path: {type: String, default: ''}
},
{
    collection: 'news'
});

mongoose.model('News', NewsSchema, 'news');
