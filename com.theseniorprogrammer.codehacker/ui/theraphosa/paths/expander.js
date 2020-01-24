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
    
    var oop = require("../lib/oop");
    var dom = require("../lib/dom");
    var EventEmitter = require("../lib/event_emitter").EventEmitter;
    var d3 = require("../../electra/node_modules/d3");
    
    var Expander = function(parentEl) {
        this.dom = dom; 
        this.element = this.dom.createElement("div");
        this.element.className = "ace_layer ace_expanders-layer";
        parentEl.appendChild(this.element);
    };
    
    (function() {
    
        oop.implement(this, EventEmitter);


        this.setSession = function(session) {
            this.session = session;
        };
    
        this.scrollExpanders = function(config) {
            dom.translate(this.element, 0, -((config.firstRowScreen * config.lineHeight)));
        };

        this.update = function(config) {
        
        };
    
        this.$createExpanderElement = function(expander, config, fontMetrics) {

            console.log(fontMetrics)

            var charWidth = fontMetrics.$characterSize.width;
            var charHeight = fontMetrics.$characterSize.height;
            
            var y0 = expander.start.line * charHeight;
            var x0 = expander.start.column * charWidth;
            var y2 = (expander.start.line + 1) * charHeight;
            var x2 = expander.end.column * charWidth;
            var height = y2 - y0;
            var length = x2 - x0;
            
            var wrapper = this.dom.createElement("div");
            wrapper.setAttribute('class', 'expander-wrapper');
            wrapper.style.top = y0 + charHeight;
            wrapper.style.left = x0 + charWidth;
            wrapper.style.width = 2 * length;
            wrapper.style.height = 2 * charHeight;

            var svg = this.dom.createElement("svg", "http://www.w3.org/2000/svg");
            svg.setAttribute('class', 'expander-svg');

            var path = this.dom.createElement("path", "http://www.w3.org/2000/svg");
            
            path.setAttribute("d", `M0,0 L0,${height} L${length},${height}`);
            path.setAttribute('class', 'expander-lines');

            svg.appendChild(path);
            wrapper.appendChild(svg);
            this.element.appendChild(wrapper);
            
            return wrapper;
        };

    }).call(Expander.prototype);
    
    exports.Expander = Expander;
    
});
    