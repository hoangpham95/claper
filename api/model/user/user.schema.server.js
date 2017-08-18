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
        isAdmin: {type: Boolean, default: false},
        isSchoolOfficial: {type: Boolean, default: false},
        dateCreated: {type: Date, default: Date.now},
        favorite: [{type: mongoose.Schema.ObjectId, ref: 'post'}]
    }, {collection: 'user'});
};