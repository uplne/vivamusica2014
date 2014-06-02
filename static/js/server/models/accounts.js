/**
* Module dependencies.
*/

var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

/**
 * Accounts schema
 */
var AccountsSchema = new Schema({
    user: {type: String, default: ''},
    pswd: {type: String, default: ''}
},
{
    collection: 'accounts'
});

mongoose.model('Accounts', AccountsSchema, 'accounts');
