/**
 * Created by hpham on 8/11/17.
 */

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');

module.exports = function(app, model) {
    app.post('/api/user/', createUser);
    app.get('/api/user/:userId', getUserById);
    app.post('/api/user/login', login);
    app.get('/api/users/all', getAllUser);
    app.put('/api/user', updateUser);
    app.put('/api/favPost', favoritePost);
    app.get('/api/userFav', getUserFavorites);
    app.put('/api/deleteFav', removeFavorite);
    app.delete('/api/user/:userId', deleteUser);

    // passport user management
    app.post("/api/login", passport.authenticate('local'), login);
    app.post("/api/logout", logout);
    app.post("/api/register", register);
    app.get('/api/loggedin', loggedin);

    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function serializeUser(user, callback) {
        callback(null, user);
    }

    function deserializeUser(user, callback) {
        model.userModel.getUserById(user._id)
            .then(function (user) {
                callback(null, user);
            }, function (err) {
                console.log(err);
                callback(err, null);
            });
    }

    function localStrategy(username, password, callback) {
        model.userModel.findUserByUsername(username)
            .then(function (user) {
                if (user && user !== null) {
                    var result;
                    try {
                        result = bcrypt.compareSync(password, user.password);
                        if (result) {
                            callback(null, user);
                        }
                    } catch (e) {
                        callback(e, null);
                    }

                } else {
                    callback("Cannot find user", null);
                }
            }, function (error) {
                console.log(error);
                callback(error, null);
            });
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function register(req, res) {
        var user = req.body;

        if (user.password) {
            user.password = bcrypt.hashSync(user.password);
        }

        model.userModel.createUser(user)
            .then(function (usr) {
                if (usr) {
                    req.login(usr, function (err) {
                        if (err) {
                            res.status(400).send(err);
                        } else {
                            res.json(usr);
                        }
                    });
                }
            })
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function login(req, res) {
        var user = req.body;
        model.userModel.findUserByUsername(user.username)
            .then(function (usr) {
                if (bcrypt.compareSync(user.password, usr.password)) {
                    res.json(usr);
                }
            }, function (error) {
                res.status(404).send(error);
            });
    }

    // end passport login

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

    function getAllUser(req, res) {
        model.userModel.getAllUser()
            .then(function(users) {
                res.send(users);
            }, function(error) {
                res.status(500).send(error);
            })
    }

    function updateUser(req, res) {
        var user = req.body;

        model.userModel.updateUser(user)
            .then(function(result) {
                res.send(result);
            }, function(error) {
                res.status(400).send(error);
            })
    }

    function favoritePost(req, res) {
        var uid = req.query.user;
        var pid = req.query.post;

        model.userModel.favoritePost(pid, uid)
            .then(function(result) {
                res.sendStatus(200);
            }, function (err) {
                res.status(400).send(error);
            });
    }

    function getUserFavorites(req, res) {
        var uid = req.query.user;

        model.userModel.getUserFavorites(uid)
            .then(function(result) {
                var postIds = result.favorite;

                model.postModel.findChunks(postIds)
                    .then(function(result) {
                        res.send(result);
                    }, function(error) {
                        res.status(400).send(error);
                    });
            }, function(err) {
                res.status(400).send(error);
            });
    }

    function removeFavorite(req, res) {
        var uid = req.query.user;
        var pid = req.query.post;

        model.userModel.removeFavorite(pid, uid)
            .then(function(result) {
                res.sendStatus(200);
            }, function (err) {
                res.status(400).send(error);
            });
    }

    function deleteUser(req, res) {
        var uid = req.params.userId;

        model.userModel.deleteUser(uid)
            .then(function(result) {
                res.sendStatus(200);
            }, function(error) {
                res.status(500).send(error);
            })
    }
};