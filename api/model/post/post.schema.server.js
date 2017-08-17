/**
 * Created by hpham on 8/10/17.
 */

var mongoose = require('mongoose');

module.exports = function () {
    return mongoose.Schema({
        classCode: String,
        className: String,
        place: String,
        postType: {type: String, enum: ['question', 'helper', 'application']},
        author: {type: mongoose.Schema.ObjectId, ref: 'user'},
        content: String,
        images: String, // list of image url
        offerAmount: Number,
        likedBy: [{type: mongoose.Schema.ObjectId, ref: 'user'}],
        unlikedBy: [{type: mongoose.Schema.ObjectId, ref: 'user'}],
        dateCreated: {type: Date, default: Date.now},
    }, {collection: 'post'});
};