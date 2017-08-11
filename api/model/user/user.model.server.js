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
      getAllUser: getAllUser
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

  return api;
};
