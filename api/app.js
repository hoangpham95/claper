/**
 * Created by hpham on 8/4/17.
 */

module.exports = function(app) {
    var userModel = require('./model/user/user.model.server')();
    var postModel = require('./model/post/post.model.server')();

    var model = {
        userModel: userModel,
        postModel: postModel,
    };

    require('./service/class.service.server.js')(app, model);
    require('./service/post.service.server.js')(app, model);
    require('./service/user.service.server.js')(app, model);
};