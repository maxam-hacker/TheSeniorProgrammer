/*******************************************************
//  point = {
//       start: { line, column },
//       end: { line, column }
//  }
*******************************************************/

class PathPoint {

    constructor() {
        this.start = { line: -1, column: -1 };
        this.end = { line: -1, column: -1 };
    }

    setStart(line, column) {
        this.start.line = line;
        this.start.column = column;
    }

    startToJson() {
        return `{ line: ${this.start.line}, column: ${this.start.column} }`;
    }

    setEnd(line, column) {
        this.end.line = line;
        this.end.column = column;
    }

    endToJson() {
        return `{ line: ${this.end.line}, column: ${this.end.column} }`;
    }

    startEquals(start) {
        if (this.start.line === start.line && this.start.column === start.column)
            return true;
        return false;
    }

    endEquals(end) {
        if (this.end.line === end.line && this.end.column === end.column)
            return true;
        return false;
    }

}

export default PathPoint