/**
 * Created by hpham on 8/10/17.
 */

var mongoose = require('mongoose');

module.exports = function () {
    return mongoose.Schema({
        classCode: String,
        postType: {type: String, enum: ['question', 'helper', 'application']},
        author: {type: mongoose.Schema.ObjectId, ref: 'user'},
        content: String,
        images: [{type: String}], // list of image url
        offerAmount: Number,
        dateCreated: {type: Date, default: Date.now},
    }, {collection: 'post'});
};