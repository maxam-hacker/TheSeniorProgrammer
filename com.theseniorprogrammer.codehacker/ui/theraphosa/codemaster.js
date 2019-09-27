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
    this.addEventListener('click', this.onMouseClick.bind(this));
};
oop.inherits(CodeMaster, Editor);

(function() {

    this.onMouseClick = function(event) {
        //var cursor = this.getCursorPosition();
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
        var calls = callsExtractor(file);

        if (calls !== undefined) 
            calls.forEach(call => {
                if (row >= call.start.line + deltaY && row <= call.end.line + deltaY &&
                    column >= call.start.column + deltaX && column <= call.end.column + deltaX)
                    tgtCall = call;
            });

        if (tgtCall !== undefined)
            this.expandCall(tgtCall, deltaX, deltaY);
    };

    this.setValueWithTag = function (val, tag) {
        this.session.doc.setValue(val, tag);
    };

    this.setCurrentFile = function(filename) {
        this.currentFile = filename;
    };

    this.expandCall = function(call, deltaX, deltaY) {
        var method = call.path.method;
        var text = method.text;
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
        this.renderer.$expanderLayer.add(start, end);
        
        var textLines = text.split("\n");

        var shiftedLines = [];
        shiftedLines.push(firstLinePrefix + textLines[0]);
        for (var idx = 1; idx < textLines.length; idx ++)
            shiftedLines.push(linePrefix + textLines[idx]);

        text = shiftedLines.join("\n"); 

        session.insert(cursor, text, { call: call, method : method, text: text, path: method.file, deltaX: deltaX + startPoint + deltaPoints, deltaY: cursor.row - method.start.line });
    }
        
}).call(CodeMaster.prototype);

exports.CodeMaster = CodeMaster;
}); 