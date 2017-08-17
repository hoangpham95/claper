/**
 * Created by hpham on 8/4/17.
 */

module.exports = function(app, model) {
    app.post('/api/post', createPost);
    app.get('/api/post/:postId', findPostById);
    app.get('/api/posts/:userId', findPostsByUser);
    app.get('/api/post', getPostByCode);
    app.get('/api/posts', getNumberOfPosts);
    app.get('/api/postAll', getAllPosts);

    app.post('/api/like', pressingLikeForPost);
    app.put('/api/post', updatePost);

    function createPost(req, res) {
        var post = req.body;

        model.postModel.createPost(post)
            .then(function (post) {
                res.send(post);
            }, function (error) {
                res.status(500).send("Cannot create your post: " + error.message);
            });
    }

    function findPostById(req, res) {
        var postId = req.params.postId;

        model.postModel.findPostById(postId)
            .then(function(post) {
                res.send(post);
            }, function(error) {
                res.status(404).send("Post not found");
            });
    }

    function findPostsByUser(req, res) {
        var userId = req.params.userId;

        model.postModel.findPostsByUser(userId)
            .then(function(posts) {
                res.send(posts);
            }, function(error) {
                res.status(404).send("No post for user");
            })
    }

    function getPostByCode(req, res) {
        var code = req.query.code;

        model.postModel.findPostByClassCode(code)
            .then(function(posts) {
                res.send(posts);
            }, function(error) {
                res.status(404).send("No post");
            })
    }

    function getNumberOfPosts(req, res) {
        model.postModel.findNumberOfPosts()
            .then(function(number) {
                res.json(number);
            }, function(error) {
                res.status(400).send(error.message);
            })
    }

    function getAllPosts(req, res) {
        model.postModel.getAllPosts()
            .then(function(posts) {
                res.status(200).send(posts);
            }, function (error) {
                res.status(400).send(error.message);
            });
    }

    function pressingLikeForPost(req, res) {
        var postId = req.query.post;
        var userId = req.query.user;
        var likeBody = req.body;

        model.postModel.likePost(postId, userId, likeBody.like)
            .then(function(post) {
                res.sendStatus(200);
            }, function(error) {
                console.log(error);
                res.status(500).send(error);
            })
    }

    function updatePost(req, res) {
        var post = req.body;

        model.postModel.updatePost(post)
            .then(function(post) {
                res.send(post);
            }, function(error) {
                res.status(500).send(error);
            })
    }
};