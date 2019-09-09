/*******************************************************
//  method = {
//      name: callName,
//      start: { line, column },
//      end: { line, column }
//  }
*******************************************************/

import PathPoint from './point'

class PathMethod extends PathPoint {

    constructor() {
        super();
        this.name = null;
    }

    setName(name) {
        this.name = name;
    }

    toJson() {
        return `{ name: ${this.name}, start: ${this.startToJson()}, end: ${this.endToJson()} }`;
    }

}

export {PathMethod}