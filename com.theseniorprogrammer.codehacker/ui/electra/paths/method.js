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
        this.text = null;
        this.file = null;
    }

    setText(text) {
        this.text = text;
    }

    setFile(file) {
        this.file = file;
    }

    toJson() {
        return `{ file: ${this.file}, text: "${this.text}", start: ${this.startToJson()}, end: ${this.endToJson()} }`;
    }

}

export {PathMethod}