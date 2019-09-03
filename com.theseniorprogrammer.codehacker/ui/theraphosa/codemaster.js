define(function(require, exports, module) {
"use strict";

var Editor = require("./editor").Editor;

    var CodeMaster = function(renderer, session, options) {
        this.editor = new Editor(renderer, session, options);
    };

    (function() {

        this.expandCode = function() {

        };
        
    }).call(CodeMaster.prototype);

    exports.CodeMaster = CodeMaster;

}); 