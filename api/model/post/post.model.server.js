/**
 * Created by hpham on 8/10/17.
 */

var mongoose = require('mongoose');
var q = require('q');
var postSchema = require('./post.schema.server')();

module.exports = function() {
    var postModel = mongoose.model('post', postSchema);

    var api = {
        createPost: createPost
    };

    function createPost(post) {
        var deferred = q.defer();
        postModel.create(post, function(err, success) {
            if (error) {
                deferred.reject(err);
            } else {
                deferred.resolve(success);
            }
        });

        return deferred.promise;
    }

    return api;
};