/**
 * Created by hpham on 8/4/17.
 */
module.exports = function(app) {
    require('./service/class.service.server.js')(app);
    require('./service/post.service.server.js')(app);
};