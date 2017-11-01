"use strict";
var generatePathObj = function (path, value) {
    var o;
    if (path && path.length) {
        path.reverse();
        o = {};
        o[path.shift()] = value;
        while (path.length) {
            var p = path.shift();
            var t = o;
            o = {};
            o[p] = t;
        }
    } else {
        return value;
    }
    return o;
};

var stateHelper = {
    setPathState: function (path, value) {
        var paths, state = this.state, pathState = state;
        if (path && typeof path == 'string') {
            paths = path.split('.');
            while (paths.length) {
                var p = paths.shift();
                if (pathState[p] == undefined || !paths.length) {
                    pathState[p] = generatePathObj(paths, value);
                } else {
                    pathState = pathState[p];
                }
            }
            this.setState(state);
        }
    }
};

module.exports = stateHelper;
