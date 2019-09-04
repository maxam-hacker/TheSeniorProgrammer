define(function(require, exports, module) {
"use strict";

var Editor = require("./editor").Editor;

    var CodeMaster = function(renderer, session, options) {
        Editor.call(this, renderer, session, options);
        this.Paths = {};
    };

    CodeMaster.prototype = Object.create(Editor.prototype);

    (function() {

        this.setPaths = function(filename, paths) {
            this.Paths[filename] = paths;
        };

        this.expandCode = function(line, row) {

        };
        
    }).call(CodeMaster.prototype);

    exports.CodeMaster = CodeMaster;

}); 