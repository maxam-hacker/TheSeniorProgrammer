define(function(require, exports, module) {
"use strict";

var Editor = require("./editor").Editor;
var callsExtractor = require("../electra/paths").getCallsForFile;

    var CodeMaster = function(renderer, session, options) {
        Editor.call(this, renderer, session, options);
        this.currentFile = undefined;
    };

    CodeMaster.prototype = Object.create(Editor.prototype);

    (function() {

        this.addEventListener('click', event => {
            var editor = event.editor;
            var cursor = editor.getCursorPosition();
            var currentRow = cursor.row;
            var currentColumn = cursor.column;
            var currentCall = undefined;
            var calls = callsExtractor(editor.currentFile);

            if (calls !== undefined) 
                calls.forEach(call => {
                    if (currentRow >= call.start.line && 
                        currentRow <= call.end.line &&
                        currentColumn >= call.start.column && 
                        currentColumn <= call.end.column)
                        currentCall = call;
                });

            if (currentCall !== undefined)
                this.expandCall(editor, currentCall);
        });

        this.setCurrentFile = function(filename) {
            this.currentFile = filename;
        };

        this.expandCall = function(editor, call) {
            var text = call.path.method.text;
            var session = editor.session;
            var mode = session.getMode();
            var cursor = { row: call.end.line + 1, column: call.end.column + 1};

            var line = session.getLine(call.end.line);
            session.insert({ row: call.end.line, column: line.length + 1 }, "\n");
            
            session.insert(cursor, text);
        }
        
    }).call(CodeMaster.prototype);

    exports.CodeMaster = CodeMaster;

}); 