/*******************************************************
//  TheWeb
//  {
//      filename : cell,
//      filename : cell,,
//      filename : cell,,
//  }
//
//  cell = { calls: [ calls ], methods: [ methods ] }
//
//  calls = call, call, ...
//
//  call = {
//      name: callName,
//      start: { line, column },
//      end: { line, column },
//      path : method
//  }
//
//  methods = method, method, ...
//
//  method = {
//      name: methodName,
//      start: { line, column },
//      end: { line, column },
//  }
*******************************************************/


class PathWeb {

    constructor() {
        this.TheWeb = {};
    }

    addCell(filename, cell) {
        this.TheWeb[filename] = cell;
    }

    toJson() {

        var jsonified = '{\n';

        for (var filename in this.TheWeb)
            jsonified += '${filename}: ${this.TheWeb[filename].toJson()}\n';

        jsonified = '}';

        return jsonified;
    }

}

