class PathWeb {

    constructor() {
        this.TheCalls = {};
        this.TheMethods = {};
        this.ThePaths = {};
    }

    addCall(filename, call) {
        if (this.TheCalls[filename] === undefined)
            this.TheCalls[filename] = [];
        this.TheCalls[filename].push(call);
    }

    addMethod(filename, method) {
        if (this.TheMethods[filename] === undefined)
            this.TheMethods[filename] = [];
        this.TheMethods[filename].push(method);
    }

    addPath(filename, path) {
        if (this.ThePaths[filename] === undefined)
            this.ThePaths[filename] = [];
        this.ThePaths[filename].push(path);
    }

    getCalls(filename) {
        return this.TheCalls[filename];
    }

    toJson() {

        var jsonified = '{\n';

        for (var filename in this.TheWeb)
            jsonified += `${filename}: ${this.TheWeb[filename].toJson()}\n`;

        jsonified += '}';

        return jsonified;
    }

}

export {PathWeb}

