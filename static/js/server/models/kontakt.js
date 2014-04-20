/**
* Module dependencies.
*/

var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

/**
 * Program schema
 */
var KontaktSchema = new Schema({
    title1:  {type: String, default: ''},
    title2:  {type: String, default: ''},
    title:   {type: String, default: ''},
    email:   {type: String, default: ''},
    text:    {type: String, default: ''},
    img:     {type: String, default: ''},
    path:    {type: String, default: ''}
},
{
    collection: 'kontakt'
});

mongoose.model('Kontakt', KontaktSchema, 'kontakt');
