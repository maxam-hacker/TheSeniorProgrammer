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

    var Call = require("./call").Call;
    var Method = require("./method").Method;
    
    var PathsRegistry = function() {
        this.$paths = []
    };
    
    (function() {

        this.ingestLinkedPathMasterCall = function(linkedPathMasterCall, marker) {
            var origMethod = linkedPathMasterCall.method;
            var origCall = linkedPathMasterCall;

            var method = new Method();
            method.setFile(origMethod.browserFile.fullName);
            method.setText(origMethod.text);
            method.start.setLine(origMethod.lineStart).setColumn(origMethod.columnStart)
            method.end.setLine(origMethod.lineEnd).setColumn(origMethod.columnEnd)

            var call = new Call();
            call.setFile(origCall.browserFile.fullName);
            call.setText(origCall.text);
            call.setMethod(method);
            call.start.setLine(origCall.lineStart).setColumn(origCall.columnStart)
            call.end.setLine(origCall.lineEnd).setColumn(origCall.columnEnd)

            var path = {
                file: origCall.browserFile.fullName, 
                call: call, 
                marker: marker, 
                isOpen: false
            };
            this.$paths.push(path);
        }

        this.getPathByCall = function(tgtCall) {
            var tgtPath = undefined;
            this.$paths.forEach(path => {
                if (path.call == tgtCall)
                    tgtPath = path;
            });
            return tgtPath;
        };

        this.getPathsByFile = function(file) {
            var pathList = []
            this.$paths.forEach(path => {
                if (path.call.file === file)
                    pathList.push(path);
            });
            return pathList;
        }

        this.getCallsByFile = function(file) {
            var callsList = []
            this.$paths.forEach(path => {
                if (path.call.file === file)
                    callsList.push(path.call);
            });
            return callsList;
        }

        this.getAllMarkers = function() {
            var markers = [];
            this.$paths.forEach(path => markers.push(path.marker));
            return markers;
        };
      
    }).call(PathsRegistry.prototype);
    
    exports.PathsRegistry = PathsRegistry;
    
});