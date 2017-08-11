/**
 * Created by hpham on 8/11/17.
 */

module.exports = function(app, model) {
    app.post('/api/user/', createUser);
    app.get('/api/user/:userId', getUserById);

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
};