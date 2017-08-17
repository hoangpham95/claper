/**
 * Created by hpham on 8/14/17.
 */

var mongoose = require('mongoose');
var q = require('q');
var reviewSchema = require('./review.schema.server')();

module.exports = function() {
    var reviewModel = mongoose.model('review', reviewSchema);

    var api = {
        createReview: createReview,
        getReviewsByOtherId: getReviewsByOtherId,
    };

    function createReview(review) {
        var deferred = q.defer();
        reviewModel.create(review, function(err, review) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(review);
            }
        });

        return deferred.promise;
    }

    function getReviewsByOtherId(otherId) {
        var deferred = q.defer();

        reviewModel.find({about: otherId})
            .exec(function(err, reviews) {
                if (err) {
                   deferred.reject(err);
                } else {
                    deferred.resolve(reviews);
                }
            });

        return deferred.promise;
    }

    return api;
};