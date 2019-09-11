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
            var text = "\n" + call.path.method.text;
            var session = editor.session;
            var mode = session.getMode();
            var cursor = { row: call.end.line, column: call.end.column + 1};
            
            if (text == "\t")
                text = editor.session.getTabString();
    
            // remove selected text
            if (!editor.selection.isEmpty()) {
                var range = editor.getSelectionRange();
                cursor = editor.session.remove(range);
                editor.clearSelection();
            }
            else if (editor.session.getOverwrite() && text.indexOf("\n") == -1) {
                var range = new Range.fromPoints(cursor, cursor);
                range.end.column += text.length;
                editor.session.remove(range);
            }
    
            if (text == "\n" || text == "\r\n") {
                var line = session.getLine(cursor.row);
                if (cursor.column > line.search(/\S|$/)) {
                    var d = line.substr(cursor.column).search(/\S|$/);
                    session.doc.removeInLine(cursor.row, cursor.column, cursor.column + d);
                }
            }
            editor.clearSelection();
    
            var start = cursor.column;
            var lineState = session.getState(cursor.row);
            var line = session.getLine(cursor.row);
            var shouldOutdent = mode.checkOutdent(lineState, line, text);
            session.insert(cursor, text);
    
            if (transform && transform.selection) {
                if (transform.selection.length == 2) { // Transform relative to the current column
                    editor.selection.setSelectionRange(
                        new Range(cursor.row, start + transform.selection[0],
                                  cursor.row, start + transform.selection[1]));
                } else { // Transform relative to the current row.
                    editor.selection.setSelectionRange(
                        new Range(cursor.row + transform.selection[0],
                                  transform.selection[1],
                                  cursor.row + transform.selection[2],
                                  transform.selection[3]));
                }
            }
    
            if (session.getDocument().isNewLine(text)) {
                var lineIndent = mode.getNextLineIndent(lineState, line.slice(0, cursor.column), session.getTabString());
    
                session.insert({row: cursor.row+1, column: 0}, lineIndent);
            }
            if (shouldOutdent)
                mode.autoOutdent(lineState, session, cursor.row);
        }
        
    }).call(CodeMaster.prototype);

    exports.CodeMaster = CodeMaster;

}); 