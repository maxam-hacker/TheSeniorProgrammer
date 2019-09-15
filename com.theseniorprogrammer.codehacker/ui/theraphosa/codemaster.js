define(function(require, exports, module) {
"use strict";

var Editor = require("./editor").Editor;
var callsExtractor = require("../electra/paths").getCallsForFile;
var oop = require("./lib/oop")
var event = require("./lib/event")

var CodeMaster = function(renderer, session, options) {
    Editor.call(this, renderer, session, options);
    this.currentFile = undefined;
    var mouseTarget = this.renderer.getMouseEventTarget();
    event.addListener(mouseTarget, 'click', this.onMouseClick.bind(this));
};
oop.inherits(CodeMaster, Editor);

(function() {

    this.onMouseClick = function(event) {
        var editor = event.editor;
        var cursor = this.getCursorPosition();
        var currentRow = cursor.row;
        var currentColumn = cursor.column;
        var currentCall = undefined;
        var calls = callsExtractor(this.currentFile);

        if (calls !== undefined) 
            calls.forEach(call => {
                if (currentRow >= call.start.line && 
                    currentRow <= call.end.line &&
                    currentColumn >= call.start.column && 
                    currentColumn <= call.end.column)
                    currentCall = call;
            });

            if (currentCall !== undefined)
                this.expandCall(currentCall);
    };

    this.setCurrentFile = function(filename) {
        this.currentFile = filename;
    };

    this.expandCall = function(call) {
        var text = call.path.method.text;
        var session = this.session;
        var cursor = { row: call.end.line + 1, column: call.end.column + 1};

        var line = session.getLine(call.end.line);
        session.insert({ row: call.end.line, column: line.length + 1 }, "\n");
            
        session.insert(cursor, text);
    }
        
}).call(CodeMaster.prototype);

exports.CodeMaster = CodeMaster;
}); 