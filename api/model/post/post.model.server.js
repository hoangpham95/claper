/**
 * Created by hpham on 8/10/17.
 */

var mongoose = require('mongoose');
var q = require('q');
var postSchema = require('./post.schema.server')();

module.exports = function() {
    var postModel = mongoose.model('post', postSchema);

    var api = {
        createPost: createPost,
        findPostById: findPostById,
        findPostsByUser: findPostsByUser,
        findPostByClassCode: findPostByClassCode,
        findNumberOfPosts: findNumberOfPosts,
        getAllPosts: getAllPosts,
        likePost: likePost,
        updatePost: updatePost,
        deletePost: deletePost,
        findChunks: findChunks
    };

    function createPost(post) {
        var deferred = q.defer();
        postModel.create(post, function(err, success) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(success);
            }
        });

        return deferred.promise;
    }

    function findPostById(postId) {
        var deferred = q.defer();
        postModel.findOne({_id: postId})
            .exec(function(error, result) {
                if (error) {
                    deferred.reject(error);
                } else {
                    deferred.resolve(result);
                }
            });

        return deferred.promise;
    }

    function findPostsByUser(userId) {
        var deferred = q.defer();
        postModel.find({author: userId})
            .exec(function(error, result) {
                if (error) {
                    deferred.reject(error);
                } else {
                    deferred.resolve(result);
                }
            });

        return deferred.promise;
    }

    function findPostByClassCode(classCode) {
        var deferred = q.defer();
        postModel.find({classCode: classCode})
            .exec(function(error, result) {
                if (error) {
                    deferred.reject(error);
                } else {
                    deferred.resolve(result);
                }
            });

        return deferred.promise;
    }

    function findNumberOfPosts() {
        var deferred = q.defer();
        
        postModel.count().exec(function (error, result) {
            if (error) {
                deferred.reject(error);
            } else {
                deferred.resolve(result);
            }
        });

        return deferred.promise;
    }

    function getAllPosts() {
        var deferred = q.defer();

        postModel.find().exec(function (error, result) {
            if (error) {
                deferred.reject(error);
            } else {
                deferred.resolve(result);
            }
        });

        return deferred.promise;
    }

    function likePost(postId, userId, like) {
        var deferred = q.defer();

        var callback = function(error, result) {
            if (error) {
                deferred.reject(error);
            } else {
                deferred.resolve(result);
            }
        };

        if (like) {
            postModel.findOne({_id: postId, likedBy: userId})
                .exec(function(error, result) {
                    if (!result || result === null) {
                        postModel.update(
                            {_id: postId},
                            {$push: {likedBy: userId}},
                            callback
                        );
                    }
                });
        } else {
            postModel.findOne({_id: postId, unlikedBy: userId})
                .exec(function(error, result) {
                    if (!result || result === null) {
                        postModel.update(
                            {_id: postId},
                            {$push: {unlikedBy: userId}},
                            callback
                        );
                    }
                })
        }

        return deferred.promise;
    }

    function updatePost(post) {
        var deferred = q.defer();

        postModel.findOneAndUpdate({_id: post._id}, post)
            .exec(function(error, result) {
                if (result) {
                    deferred.resolve(result);
                } else {
                    deferred.reject(error);
                }
            });

        return deferred.promise;
    }

    function deletePost(postId) {
        var deferred = q.defer();

        postModel.remove({_id: postId}).exec(function(err, result) {
            if (result) {
                deferred.resolve(result);
            } else {
                deferred.reject(error);
            }
        });

        return deferred.promise;
    }

    function findChunks(postIds) {
        var deferred = q.defer();

        postModel.find({'_id': {$in: postIds}}, function(err, result) {
            if (!err) {
                deferred.resolve(result);
            } else {
                deferred.reject(result);
            }
        });

        return deferred.promise;
    }

    return api;
};