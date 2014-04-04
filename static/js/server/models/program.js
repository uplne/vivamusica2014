/**
* Module dependencies.
*/

var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

/**
 * Program schema
 */
var ProgramSchema = new Schema({
    date:    {type: String, default: ''},
    place:   {type: String, default: ''},
    title1:  {type: String, default: ''},
    title2:  {type: String, default: ''},
    intro:   {type: String, default: ''},
    text:    {type: String, default: ''},
    img:     {type: String, default: ''},
    path:    {type: String, default: ''},
    tickets: {type: String, default: ''}
},
{
    collection: 'program'
});

mongoose.model('Program', ProgramSchema, 'program');
