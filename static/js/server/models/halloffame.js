/**
* Module dependencies.
*/

var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

/**
 * Program schema
 */
var HalloffameSchema = new Schema({
    title1:  {type: String, default: ''},
    title2:  {type: String, default: ''},
    title:   {type: String, default: ''},
    year:    {type: String, default: ''},
    intro:   {type: String, default: ''},
    text:    {type: String, default: ''},
    img:     {type: String, default: ''},
    path:    {type: String, default: ''}
},
{
    collection: 'halloffame'
});

mongoose.model('Halloffame', HalloffameSchema, 'halloffame');
