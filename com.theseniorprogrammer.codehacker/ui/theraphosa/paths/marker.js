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

    var Range = require("../range").Range;

    var CallMarker = function(session) {
        this.session = session;
        this.marker = undefined;
        this.originalCall = undefined;
        this.startLine = -1;
        this.endLine   = -1;
        this.startColumn = -1;
        this.endColumn   = -1;
        this.isOpen = false;
        this.deltaX = 0;
        this.delatY = 0;
    };
    
    (function() {
    
        this.setOriginalCall = function(call) {
            this.originalCall = call;
            return this;
        };

        this.setLineParams = function(start, end) {
            this.startLine = start;
            this.endLine   = end;
            return this;
        };

        this.setColumnParams = function(start, end) {
            this.startColumn = start;
            this.endColumn   = end;
            return this;
        };

        this.build = function() {
            this.marker = this.session.addMarker(
                new Range(
                    this.startLine, 
                    this.startColumn, 
                    this.endLine, 
                    this.endColumn), 
                "phosa_call-word", 
                "text",
                false,
                "phosa_call-word-enabled", "phosa_call-word-disabled"
            );
            return this;
        }

        this.show = function() {
            this.build();
        }

        this.hide = function() {
            this.session.removeMarker(this.marker);
            this.marker = undefined;
        }

        this.shiftUnderOffsetY = function(shift, offset) {
            if (this.marker === undefined)
                return;

            if (this.startLine >= offset) {
                this.hide();
                this.startLine += shift;
                this.endLine   += shift;
                this.incDeltaY(shift);
                this.show();
            }
        }

        this.setDeltaX = function(delta) {
            this.deltaX = delta;
            return this;
        }

        this.setDeltaY = function(delta) {
            this.deltaY = delta;
            return this;
        }

        this.incDeltaY = function(value) {
            this.deltaY += value;
            return this;
        }
      
    }).call(CallMarker.prototype);

    CallMarker.shiftUnderOffsetY = function(callMarkers, shift, offset) {
        callMarkers.forEach(callMarker => {
            callMarker.shiftUnderOffsetY(shift, offset);
        });
    }

    CallMarker.findByOriginalCall = function(callMarkers, call) {
        var result = [];
        callMarkers.forEach(callMarker => {
            if (callMarker.originalCall === call)
                result.push(callMarker);
        });
        return result;
    };

    CallMarker.checkHit = function(callMarkers, row, column) {
        callMarkers.forEach(callMarker => {
            var rowHit = 
                row >= callMarker.startLine + callMarker.deltaY && 
                row <= callMarker.endLine + callMarker.deltaY;
            var columnHit = 
                column >= callMarker.startColumn + callMarker.deltaX && 
                column <= callMarker.endColumn + callMarker.deltaX;
            if (rowHit && columnHit)
                return true;
        });
        return false;
    }
    
    exports.CallMarker = CallMarker;
});