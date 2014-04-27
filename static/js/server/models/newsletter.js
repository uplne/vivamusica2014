/**
* Module dependencies.
*/

var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

/**
 * Program schema
 */
var NewsletterSchema = new Schema({
    email:  {type: String, default: ''}
},
{
    collection: 'newsletter'
});

mongoose.model('Newsletter', NewsletterSchema, 'newsletter');
