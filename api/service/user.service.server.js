/**
 * Created by hpham on 8/11/17.
 */

module.exports = function(app, model) {
    app.post('/api/user/', createUser);
    app.get('/api/user/:userId', getUserById);
    app.post('/api/user/login', login);
    app.get('/api/user/all', getAllUser);

    function createUser(req, res) {
        model.userModel.createUser(req.body)
            .then(function(user) {
                res.send(user);
            }, function(error) {
                res.status(500).send(error);
            });
    }

    function getUserById(req, res) {
        model.userModel.getUserById(req.params.userId)
            .then(function(user) {
                res.send(user);
            }, function(error) {
                res.status(404).send(error);
            })
    }

    function login(req, res) {
        var user = req.body;
        console.log(user);
        model.userModel.login(user)
            .then(function(user) {
                res.send(user);
            }, function(error) {
                res.status(404).send(error);
            })
    }

    function getAllUser(req, res) {
        model.userModel.getAllUser()
            .then(function(users) {
                res.send(users);
            }, function(error) {
                res.status(500).send(error);
            })
    }
};