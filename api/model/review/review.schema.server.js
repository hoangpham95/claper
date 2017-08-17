/**
 * Created by hpham on 8/14/17.
 */

var mongoose = require('mongoose');

module.exports = function () {
    return mongoose.Schema({
        about: {type: mongoose.Schema.ObjectId, ref: 'user'},
        classCode: String,
        rating: Number,
        content: String,
        title: String,
        dateCreated: {type: Date, default: Date.now}
    }, {collection: 'review'});
};