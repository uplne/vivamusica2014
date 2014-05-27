/**
* Module dependencies.
*/

var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

/**
 * Program schema
 */
var PressnewsSchema = new Schema({
    title:  {type: String, default: ''},
    text:   {type: String, default: ''},
    img:    {type: String, default: ''},
    date:   {type: String, default: ''},
    path:   {type: Number,}
},
{
    collection: 'pressnews'
});

mongoose.model('Pressnews', PressnewsSchema, 'pressnews');
