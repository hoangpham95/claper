/**
 * Created by hpham on 8/10/17.
 */

var mongoose = require('mongoose');

module.exports = function () {
    return mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        isSchoolOfficial: Boolean,
        dateCreated: {type: Date, default: Date.now}
    }, {collection: 'user'});
};