/**
 * Created by hpham on 8/15/17.
 */

module.exports = function(app, model) {
    app.post('/api/review', uploadReview);
    app.get('/api/user/:userId/reviews', getReviewByOtherId);

    function uploadReview(req, res) {
        var review = req.body;

        model.reviewModel.createReview(review)
            .then(function(result) {
                res.send(result);
            }, function(error) {
                res.status(500).send(error);
            })
    }

    function getReviewByOtherId(req, res) {
        var uid = req.params.userId;

        model.reviewModel.getReviewsByOtherId(uid)
            .then(function(result) {
                res.send(result);
            }, function(error) {
                res.status(404).send(error);
            })
    }
};