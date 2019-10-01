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
        this.path = null;
        this.file = null;
    }

    setText(text) {
        this.text = text;
    }

    setPath(path) {
        this.path = path;
    }

    setFile(file) {
        this.file = file;
    }

    toJson() {
        return `{ file: ${this.file}, text: "${this.text}", start: ${this.startToJson()}, end: ${this.endToJson()}, path: ${this.path.toJson()} }`;
    }

    equals(call) {
        if (this.file === call.file && this.startEquals(call.start) && this.endEquals(call.end))
            return true;
        return false;
    }

}

export {PathCall}