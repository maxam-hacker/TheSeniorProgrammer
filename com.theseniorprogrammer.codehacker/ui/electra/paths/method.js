/*******************************************************
//  method = {
//      name: callName,
//      start: { line, column },
//      end: { line, column }
//  }
*******************************************************/

class PathMethod extends PathPoint {

    constructor() {
        this.name = null;
    }

    setName(name) {
        this.name = name;
    }

    setPath(path) {
        this.path = path;
    }

    toJson() {
        return '{ name: ${this.name}, start: ${startToJson()}, end: ${endToJson()} }';
    }

}