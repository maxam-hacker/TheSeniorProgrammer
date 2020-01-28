/* ***** BEGIN LICENSE BLOCK *****
 * Distributed under the BSD license:
 *
 * Copyright (c) 2010, Ajax.org B.V.
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of Ajax.org B.V. nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL AJAX.ORG B.V. BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * ***** END LICENSE BLOCK ***** */

define(function(require, exports, module) {
    "use strict";

    var Editor = require("../codemaster").CodeMaster;
    var Renderer = require("../virtual_renderer").VirtualRenderer;
    var dom = require("../lib/dom");
    var EditSession = require("../edit_session").EditSession;
    var UndoManager = require("../undomanager").UndoManager;
    var Mode =require("../mode/javascript").Mode;
    var event = require("../lib/event");


    var BubbleEditor = function(el) {
        var renderer = new Renderer(el);
    
        renderer.$maxLines = 16;
        renderer.$keepTextAreaAtCursor = true;

        var doc = new EditSession("", new Mode());
        doc.setUndoManager(new UndoManager());
        var editor = new Editor(renderer, doc);

        this.onResize = editor.resize.bind(editor, null)

        this.resizeObserver = new ResizeObserver(entries => {
            entries.forEach(entry => {
                renderer.$maxLines = undefined;
                this.onResize();
            })
        });
        this.resizeObserver.observe(el);
        
        return editor;
    };
    
    var Bubble = function(container, editor, expander) {
        this.container = container;
        this.editor = editor;

        this.bubbleElem = dom.createElement("div");
        this.headerElem = dom.createElement("div");
        this.editorElem = dom.createElement("div");
        this.footerElem = dom.createElement("div");

        this.bubbleElem.appendChild(this.headerElem);
        this.bubbleElem.appendChild(this.editorElem);
        this.bubbleElem.appendChild(this.footerElem);
        this.container.appendChild(this.bubbleElem);

        dom.addCssClass(this.bubbleElem, "bubble-wrapper");
        dom.addCssClass(this.headerElem, "bubble-header");
        dom.addCssClass(this.footerElem, "bubble-footer");
        dom.setStyle(this.editorElem.style, "position", "relative");

        this.bubbleEditor = new BubbleEditor(this.editorElem);
        this.bubbleEditor.renderer.setStyle("ace_autocomplete");
        this.bubbleEditor.renderer.setMargin(0, 15, 0, 15);
        dom.setStyle(this.bubbleEditor.renderer.container.style, "resize", "both");
        dom.setStyle(this.bubbleEditor.renderer.$gutter.style, "margin-bottom", "15px");
        dom.setStyle(this.bubbleEditor.renderer.scroller.style, "margin-bottom", "15px");
        dom.setStyle(this.bubbleEditor.renderer.scrollBarV.element.style, "margin-bottom", "15px");
        dom.setStyle(this.bubbleEditor.renderer.scrollBarH.element.style, "margin-right",  "15px");

        this.headerElem.appendChild(dom.createTextNode("Path Master Line", this.headerElem));

        //var x = expander.x2 + (expander.event.domEvent.pageX - expander.event.domEvent.offsetX);
        //var y = expander.y2 + (expander.event.domEvent.pageY - expander.event.domEvent.offsetY);
        var x = expander.x2;
        var y = expander.y2;
        dom.setStyle(this.bubbleElem.style, "position", "absolute");
        dom.setStyle(this.bubbleElem.style, "left", `${x}px`);
        dom.setStyle(this.bubbleElem.style, "top", `${y}px`);

        this.bubbleEditor.setValue(
            `var bubleEditor = new $singleLineEditor(el);\n
            var bubleEditor = new $singleLineEditor(el);\n
            var bubleEditor = new $singleLineEditor(el);\n
            var bubleEditor = new $singleLineEditor(el);`);

        event.addListener(this.headerElem, "mousedown", this.onHeaderMouseDown.bind(this));
        event.addListener(this.headerElem, "mouseup", this.onHeaderMouseUpOrLeave.bind(this));
        event.addListener(this.headerElem, "mouseleave", this.onHeaderMouseUpOrLeave.bind(this));
        event.addListener(this.headerElem, "mousemove", this.onHeaderMouseMove.bind(this));
        
        this.mouseCaptured = false;
        this.currentX = 0;
        this.currentY = 0;
        this.translateX = 0;
        this.translateY = 0;
        this.oldTranslateX = 0;
        this.oldTranslateY = 0;
    };
    
    (function() {

        this.onHeaderMouseDown = function(e) {
            this.mouseCaptured = true;
            this.currentX = e.clientX;
            this.currentY = e.clientY;
            this.oldTranslateX = this.translateX;
            this.oldTranslateY = this.translateY;
            event.stopEvent(e);
        }

        this.onHeaderMouseUpOrLeave = function(e) {
            this.mouseCaptured = false;
            event.stopEvent(e);
        }

        this.onHeaderMouseMove = function(e) {
            if (this.mouseCaptured) {
                var deltaX = this.oldTranslateX - this.currentX + e.clientX;
                var deltaY = this.oldTranslateY - this.currentY + e.clientY;
                dom.translate(this.bubbleElem, deltaX, deltaY);
                this.translateX = deltaX;
                this.translateY = deltaY;
            }
            event.stopEvent(e);
        }

        this.show = function() {

        }
      
    }).call(Bubble.prototype);

    dom.importCssString("\
.ace_editor.ace_autocomplete .ace_marker-layer .ace_active-line {\
    background-color: #CAD6FA;\
    z-index: 1;\
}\
.ace_dark.ace_editor.ace_autocomplete .ace_marker-layer .ace_active-line {\
    background-color: #3a674e;\
}\
.ace_editor.ace_autocomplete .ace_line-hover {\
    border: 1px solid #abbffe;\
    margin-top: -1px;\
    background: rgba(233,233,253,0.4);\
    position: absolute;\
    z-index: 2;\
}\
.ace_dark.ace_editor.ace_autocomplete .ace_line-hover {\
    border: 1px solid rgba(109, 150, 13, 0.8);\
    background: rgba(58, 103, 78, 0.62);\
}\
.ace_completion-meta {\
    opacity: 0.5;\
    margin: 0.9em;\
}\
.ace_completion-message {\
    color: blue;\
}\
.ace_editor.ace_autocomplete .ace_completion-highlight{\
    color: #2d69c7;\
}\
.ace_dark.ace_editor.ace_autocomplete .ace_completion-highlight{\
    color: #93ca12;\
}\
.ace_editor.ace_autocomplete {\
    width: 300px;\
    z-index: 200000;\
    border: 1px lightgray solid;\
    position: fixed;\
    box-shadow: 2px 3px 5px rgba(0,0,0,.2);\
    line-height: 1.4;\
    background: #fefefe;\
    color: #111;\
}\
.ace_dark.ace_editor.ace_autocomplete {\
    border: 1px #484747 solid;\
    box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.51);\
    line-height: 1.4;\
    background: #25282c;\
    color: #c1c1c1;\
}", "autocompletion.css");

    exports.Bubble = Bubble;
    
});