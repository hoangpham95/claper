/**
 * Created by hpham on 8/10/17.
 */

var mongoose = require('mongoose');
var q = require('q');
var userSchema = require('./user.schema.server')();

module.exports = function() {
  var userModel = mongoose.model('user', userSchema);

  var api = {
      createUser: createUser,
      getUserById: getUserById,
      login: login,
      getAllUser: getAllUser,
      findUserByUsername: findUserByUsername,
      updateUser: updateUser,
      favoritePost: favoritePost,
      getUserFavorites: getUserFavorites,
      removeFavorite: removeFavorite,
      deleteUser: deleteUser
  };

  function createUser(user) {
      var deferred = q.defer();

      userModel.findOne({username: user.username})
          .exec(function(err, result) {
              if (err) {
                  deferred.reject("Username is already taken");
              } else {
                  userModel.create(user, function(err, result) {
                      if (err) {
                          deferred.reject(err);
                      } else {
                          deferred.resolve(result);
                      }
                  });
              }
          });

      return deferred.promise;
  }

  function getUserById(userId) {
      var deferred = q.defer();

      userModel.findOne({_id: userId}, function(error, user) {
          if (error) {
              deferred.reject(error);
          } else {
              deferred.resolve(user);
          }
      });

      return deferred.promise;
  }

  function login(user) {
      var deferred = q.defer();

      userModel.findOne({username: user.username, password: user.password})
          .exec(function(err, result) {
              if (err) {
                  deferred.reject(err);
              } else {
                  deferred.resolve(result);
              }
          });

      return deferred.promise;
  }

  function getAllUser() {
      var deferred = q.defer();

      userModel.find({}, function(err, result) {
          if (err) {
              deferred.reject(err);
          } else {
              deferred.resolve(result);
          }
      });

      return deferred.promise;
  }

  function findUserByUsername(username) {
      var deferred = q.defer();

      userModel.findOne({username: username})
          .exec(function(err, result) {
              if (err) {
                  deferred.reject(err);
              } else {
                  deferred.resolve(result);
              }
          });

      return deferred.promise;
  }

  function updateUser(user) {
      var deferred = q.defer();

      userModel.findOneAndUpdate({_id: user._id}, user)
          .exec(function (err, result) {
              if (!err) {
                  deferred.resolve(result);
              } else {
                  deferred.reject(err);
              }
          });

      return deferred.promise;
  }

  function favoritePost(postId, userId) {
      var deferred = q.defer();

      userModel.findOneAndUpdate({_id: userId}, {$push: {favorite: postId}})
          .exec(function (err, result) {
              if (err) {
                  deferred.reject(err);
              } else {
                  deferred.resolve(result);
              }
          });

      return deferred.promise;
  }

    function removeFavorite(postId, userId) {
        var deferred = q.defer();

        userModel.findOneAndUpdate({_id: userId}, {$pull: {favorite: postId}})
            .exec(function (err, result) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(result);
                }
            });

        return deferred.promise;
    }

  function getUserFavorites(uid) {
      var deferred = q.defer();

      userModel.findOne({_id: uid}, 'favorite', function(err, result) {
          if (err) {
              deferred.reject(err);
          } else {
              deferred.resolve(result);
          }
      });

      return deferred.promise;
  }

  function deleteUser(uid) {
      var deferred = q.defer();

      userModel.remove({_id: uid}).exec(function(err, result) {
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
