define(function(require, exports, module) {
"use strict";

var Editor = require("./editor").Editor;
var oop = require("./lib/oop");
var Expanders = require("./expanders").Expanders;
var PathsRegistry = require("./paths/registry").PathsRegistry;
var CallMarker = require("./paths/marker").CallMarker;


var CodeMaster = function(renderer, session, options) {
    Editor.call(this, renderer, session, options);
    this.currentFile = undefined;
    this.expanders = new Expanders();
    this.pathsRegistry = new PathsRegistry();
    this.callMarkers = [];
    this.addEventListener('click', this.onMouseClick.bind(this));
};
oop.inherits(CodeMaster, Editor);


(function() {

    this.onMouseClick = function(event) {
        var cursor = event.getDocumentPosition();
        var row = cursor.row;
        var column = cursor.column;

        var target = CallMarker.checkHit(this.callMarkers, row, column);
        if (target) {
            target.hide();
            this.expandCall(target.originalCall, target.deltaX, target.deltaY);
            this.session.addExpanderForCallMarker(target);
        }
    };

    this.setValueWithTag = function (val, tag) {
        this.session.doc.setValue(val, tag);
    };

    this.setCurrentFile = function(filename) {
        this.currentFile = filename;
        this.callMarkers.forEach(callMarker => {
            callMarker.hide()
            this.session.deleteExpanderForCallMarker(callMarker);
        });
        this.callMarkers = [];
        var paths = this.pathsRegistry.getPathsByFile(this.currentFile);
        if (paths !== undefined) {
            paths.forEach(path => {
                var callMarker = new CallMarker(this.session);
                callMarker
                    .setOriginalCall(path.call)
                    .setLineParams(path.call.start.line, path.call.end.line)
                    .setColumnParams(path.call.start.column, path.call.end.column)
                    .build();
                this.callMarkers.push(callMarker);
            });
        }
    };

    this.expandCall = function(call, deltaX, deltaY) {

        var shiftText = function(text, shift) {
            var prefix = ' '.repeat(shift);
            var lines = text.split("\n");
            var shifted = [];
            for (var idx = 0; idx < lines.length; idx ++)
                shifted.push(prefix + lines[idx]);
            return shifted.join("\n");
        }

        var method = call.method;
        var text   = method.text;
        var file   = method.file;
        var session = this.session;

        var lastCallDocLine = session.getLine(call.end.line + deltaY);
        var lastCallLine = call.end.line + deltaY;
        var lastCallColumn = call.end.column + deltaX;
        var shiftRightValueForText = lastCallColumn + 1;
        var shiftDownValueForText = text.split("\n").length;

        // We need to insert new string character at the end of last call string, 
        // even if last call column ends not at the end of that string.
        var cursorForEmptyLine = { row: lastCallLine, column: lastCallDocLine.length + 1 };
        session.insert(cursorForEmptyLine, "\n");

        // Now we are inserting the text in the emty line.
        /// But before it we need to shift text to rhe right.
        /// Setting up column value doesn't work.
        /// So we need to process the text and remember additional shift value.
        var cursorForText = { row: lastCallLine + 1, column: 0};
        var shifted = shiftText(text, shiftRightValueForText);
        var newDeltaX = shiftRightValueForText;
        var newDeltaY = cursorForText.row - method.start.line;
        session.insert(cursorForText, shifted, { file: file, deltaX: newDeltaX, deltaY: newDeltaY });

        // Method text was inserted. So we need to shift existing markers. 
        this.callMarkers.forEach(callMarker => {
            if (callMarker.shiftUnderOffsetY(shiftDownValueForText, cursorForText.row)) {
                this.session.shiftExpanderForCallMarker(callMarker);
            }
        });
        /*
        CallMarker.shiftUnderOffsetY(
            this.callMarkers, 
            shiftDownValueForText, 
            cursorForText.row,
            this.session.shiftExpanderForCallMarker
        );*/
        
        // Method text was inserted. The text may contain its own calls.
        // So we got additional calls on the page.
        // Show them.
        var textCalls = this.pathsRegistry.getCallsByFile(file);
        if (textCalls !== undefined) {
            textCalls.forEach(textCall => {
                if (textCall.start.line >= method.start.line && textCall.end.line <= method.end.line) {
                    var callMarker = new CallMarker(this.session);
                    callMarker
                        .setOriginalCall(textCall)
                        .setLineParams(textCall.start.line + newDeltaY, textCall.end.line + newDeltaY)
                        .setColumnParams(textCall.start.column + newDeltaX, textCall.end.column + newDeltaX)
                        .setDeltaX(newDeltaX)
                        .setDeltaY(newDeltaY)
                        .build();
                    this.callMarkers.push(callMarker);
                }
            });
        }
    }
        
}).call(CodeMaster.prototype);

exports.CodeMaster = CodeMaster;
}); 