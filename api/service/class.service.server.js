/**
 * Created by hpham on 8/4/17.
 */
var fs = require('fs');

module.exports = function(app, model) {
    app.get('/api/class/search', classSearch);
    app.get('/api/class', getClasses);
    app.get('/api/major', getMajor);

    console.log("App is called");

    const classes = require('./course.json');

    function getMajor(req, res) {
        var majors = Object.keys(classes).sort();

        res.send(majors);
    }

    function getClasses(req, res) {
        var major = req.query['major'];

        if (major) {
            res.status(200)
                .send(classes[major]);
        } else {
            res.status(404)
                .send('Cannot find major');
        }
    }

    function classSearch(req, res) {
        var major = req.query['major'];
        var code = req.query['code'];

        var majorClasses = classes[major];

        var classFind = majorClasses.find(function(c) {
            return c.code.indexOf(code) !== -1;
        });

        if (classFind) {
            res.status(200)
                .send(classFind);
        } else {
            res.status(404)
                .send('Cannot find class');
        }
    }
};
