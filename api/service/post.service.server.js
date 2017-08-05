/**
 * Created by hpham on 8/4/17.
 */

module.exports = function(app) {
    app.get('/api/post/', getAllPostOnClass);

    const posts = require('./posts.json').posts;

    function getAllPostOnClass(req, res) {
        var classCode = req.query['code'];

        const finalPosts = posts.filter(function(p) {
            return p.code === classCode;
        });

        res.send(finalPosts);
    }
};