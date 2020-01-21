define(function(require, exports, module) {
"use strict";

var Editor = require("./editor").Editor;
var oop = require("./lib/oop");
var Expanders = require("./expanders").Expanders;
var Range = require("./range").Range;
var PathsRegistry = require("./paths/registry").PathsRegistry;


var CodeMaster = function(renderer, session, options) {
    Editor.call(this, renderer, session, options);
    this.currentFile = undefined;
    this.expanders = new Expanders();
    this.pathsRegistry = new PathsRegistry();
    this.addEventListener('click', this.onMouseClick.bind(this));
};
oop.inherits(CodeMaster, Editor);


(function() {

    this.onMouseClick = function(event) {
        var cursor = event.getDocumentPosition();
        var row = cursor.row;
        var column = cursor.column;

        var tgtCall = undefined;

        var tag = this.session.doc.getTag(row);
        var file = tag.path;
        var deltaX = tag.deltaX;
        var deltaY = tag.deltaY;

        if (file === undefined || file === "")
            file = this.currentFile;
        var paths = this.pathsRegistry.getPathsByFile(file);

        if (paths !== undefined) {
            paths.forEach(path => {
                if (row >= path.call.start.line + deltaY && row <= path.call.end.line + deltaY &&
                    column >= path.call.start.column + deltaX && column <= path.call.end.column + deltaX)
                    tgtCall = path.call;
            });
        }

        if (tgtCall !== undefined) {
            var path = this.pathsRegistry.getPathByCall(tgtCall);
            if (path !== undefined) {
                if (path.isOpen === true)
                    return;
                    path.isOpen = true;
            }
            this.expandCall(tgtCall, deltaX, deltaY);
        }
    };

    this.setValueWithTag = function (val, tag) {
        this.session.doc.setValue(val, tag);
    };

    this.setCurrentFile = function(filename) {
        this.currentFile = filename;
        this.clearAndCloseExistingPaths();
        var paths = this.pathsRegistry.getPathsByFile(this.currentFile);
        if (paths !== undefined) {
            paths.forEach(path => {
                path.marker = this.session.addMarker(
                    new Range(
                        path.call.start.line, 
                        path.call.start.column, 
                        path.call.end.line, 
                        path.call.end.column), 
                    "phosa_call-word", 
                    "text",
                    false,
                    "phosa_call-word-enabled", "phosa_call-word-disabled");
            });
        }
    };

    this.clearAndCloseExistingPaths = function() {
        this.pathsRegistry.$paths.forEach(path => {
            this.session.removeMarker(path.marker)
            path.marker = 0;
            path.isOpen = false;
        });
    };

    this.expandCall = function(call, deltaX, deltaY) {
        var method = call.method;
        var text = method.text;
        var file = method.file;
        var session = this.session;
        var cursor = { row: call.end.line + 1 + deltaY, column: call.end.column + 1};

        var line = session.getLine(call.end.line + deltaY);
        session.insert({ row: call.end.line + deltaY, column: line.length + 1 }, "\n");

        var startPoint = call.start.column + deltaX;
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

        session.insert(cursor, text, { path: file, deltaX: /*deltaX +*/ startPoint + deltaPoints, deltaY: cursor.row - method.start.line, expansion: true });

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

        var path = this.pathsRegistry.getPathByCall(call);
        if (path !== undefined) {
            this.session.removeMarker(path.marker);
        }
    }
        
}).call(CodeMaster.prototype);

exports.CodeMaster = CodeMaster;
}); 