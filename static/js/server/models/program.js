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
    datemonth_en: {type: String, default: 'June'},
    datetime:    {type: String, default: ''},
    time:        {type: String, default: ''},
    place:       {type: String, default: ''},
    place_en:    {type: String, default: ''},
    title:       {type: String, default: ''},
    title_en:    {type: String, default: ''},
    intro:       {type: String, default: ''},
    intro_en:    {type: String, default: ''},
    text:        {type: String, default: ''},
    text_en:     {type: String, default: ''},
    img:         {type: String, default: ''},
    path:        {type: String, default: ''},
    tickets:     {type: String, default: ''},
    price:       {type: String, default: ''},
    price_en:    {type: String, default: ''},
    next:        {type: String, default: ''},
    prev:        {type: String, default: ''}
},
{
    collection: 'program'
});

mongoose.model('Program', ProgramSchema, 'program');
