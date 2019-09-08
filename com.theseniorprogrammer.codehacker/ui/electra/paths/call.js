/*******************************************************
//  call = {
//       name: callName,
//       start: { line, column },
//       end: { line, column },
//       path : method
//  }
*******************************************************/

class PathCall extends PathPoint {

    constructor() {
        this.name = null;
        this.path = null
    }

    setName(name) {
        this.name = name;
    }

    setPath(path) {
        this.path = path;
    }

    toJson() {
        return '{ name: ${this.name}, start: ${startToJson()}, end: ${endToJson()}, path: ${this.path.toJson()} }';
    }

}