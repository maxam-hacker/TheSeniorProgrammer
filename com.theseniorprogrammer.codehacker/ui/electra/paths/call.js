/*******************************************************
//  call = {
//       name: callName,
//       start: { line, column },
//       end: { line, column },
//       path : { file: file, method: method}
//  }
*******************************************************/

import PathPoint from './point'

class PathCall extends PathPoint {

    constructor() {
        super();
        this.text = null;
        this.file = null;
        this.method = null;
    }

    setText(text) {
        this.text = text;
    }

    setFile(file) {
        this.file = file;
    }

    setMethod(method) {
        this.method = method;
    }

    toJson() {
        return `{ file: ${this.file}, text: "${this.text}", start: ${this.startToJson()}, end: ${this.endToJson()} }`;
    }

    equals(call) {
        if (this.file === call.file && this.startEquals(call.start) && this.endEquals(call.end))
            return true;
        return false;
    }

}

export {PathCall}