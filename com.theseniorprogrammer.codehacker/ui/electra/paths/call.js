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
        this.name = null;
        this.path = null;
    }

    setName(name) {
        this.name = name;
    }

    setPath(path) {
        this.path = {};
        this.path.file = path.file;
        this.path.method = path.method;
    }

    toJson() {
        return `{ name: ${this.name}, start: ${this.startToJson()}, end: ${this.endToJson()}, path: ${this.path.method.toJson()} }`;
    }

}

export {PathCall}