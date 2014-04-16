/**
* Module dependencies.
*/

var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

/**
 * Program schema
 */
var ProgramSchema = new Schema({
    datenum:     {type: Number, default: ''},
    datemonth:   {type: String, default: 'jún'},
    datetime:    {type: String, default: ''},
    time:        {type: String, default: ''},
    place:       {type: String, default: ''},
    title:       {type: String, default: ''},
    intro:       {type: String, default: ''},
    text:        {type: String, default: ''},
    img:         {type: String, default: ''},
    path:        {type: String, default: ''},
    tickets:     {type: String, default: ''},
    price:       {type: String, default: ''},
    next:        {type: String, default: ''},
    prev:        {type: String, default: ''}
},
{
    collection: 'program'
});

mongoose.model('Program', ProgramSchema, 'program');
