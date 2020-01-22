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

        var target = undefined;

        var lineTag = this.session.doc.getTag(row);
        var file   = lineTag.file;
        var deltaX = lineTag.deltaX;
        var deltaY = lineTag.deltaY;

        if (file === undefined || file === "")
            file = this.currentFile;
            
        var paths = this.pathsRegistry.getPathsByFile(file);
        if (paths !== undefined) {
            paths.forEach(path => {
                if (row >= path.call.start.line + deltaY && row <= path.call.end.line + deltaY &&
                    column >= path.call.start.column + deltaX && column <= path.call.end.column + deltaX)
                    target = path.call;
            });
        }

        if (target !== undefined) {
            this.callMarkers.forEach(callMarker => {
                if (callMarker.originalCall == target) {
                    if (callMarker.isOpen === false) {
                        callMarker.isOpen = true;
                        this.expandCall(target, deltaX, deltaY);
                    }
                }
            });
        }
    };

    this.setValueWithTag = function (val, tag) {
        this.session.doc.setValue(val, tag);
    };

    this.setCurrentFile = function(filename) {
        this.currentFile = filename;
        this.callMarkers.forEach(callMarker => callMarker.hide());
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
        CallMarker.shiftUnderOffsetY(
            this.callMarkers, 
            shiftDownValueForText, 
            cursorForText.row + shiftDownValueForText
        );
        
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

        /*
        var startPoint = lastCallColumn;
        var deltaPoints = 4;

        var firstLinePrefix = "";
        var linePrefix = "";
        for (var idx = 0; idx < startPoint; idx ++)
            firstLinePrefix += " ";
        for (var idx = 0; idx < startPoint + deltaPoints; idx ++)
            linePrefix += " ";
        firstLinePrefix += "<e_corner/>";
        firstLinePrefix += "<e_menu/>";
        firstLinePrefix += "<e_line/>";
        firstLinePrefix += "<e_line/>";
        firstLinePrefix += "<e_line/>";

        var start = { row: call.end.line + deltaY + 1, column: startPoint };
        var end = { row: call.end.line + deltaY + 1, column: startPoint + deltaPoints };
        this.expanders.add(start, end);
        
        var textLines = text.split("\n");

        var shiftedLines = [];
        shiftedLines.push(firstLinePrefix + textLines[0]);
        for (var idx = 1; idx < textLines.length; idx ++)
            shiftedLines.push(linePrefix + textLines[idx]);

        text = shiftedLines.join("\n"); 
        */
        //session.insert(cursorForText, text, { file: file, deltaX: /*deltaX +*/ startPoint + deltaPoints, deltaY: cursorForText.row - method.start.line });

        /*
        var inMethodCalls = this.pathsRegistry.getCallsByFile(path);
        if (inMethodCalls !== undefined) {
            inMethodCalls.forEach(inCall => {
                if (inCall.start.line >= method.start.line && inCall.end.line <= method.end.line) {
                    var marker = this.session.addMarker(
                        new Range(
                            inCall.start.line + cursor.row - method.start.line, 
                            inCall.start.column + startPoint + deltaPoints, 
                            inCall.end.line + cursor.row - method.start.line, 
                            inCall.end.column + startPoint + deltaPoints), 
                        "phosa_call-word", 
                        "text",
                        false,
                        "phosa_call-word-enabled", "phosa_call-word-disabled");
                }
            });
        }
        */
    }
        
}).call(CodeMaster.prototype);

exports.CodeMaster = CodeMaster;
}); 