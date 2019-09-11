class CallMethodPath {

    constructor() {
        this.file = null;
        this.call = null;
        this.method = null;
    }

    setFile(file) {
        this.file = file;
    }

    setCall(call) {
        this.call = call;
    }

    setMethod(method) {
        this.method = method;
    }

    toJson() {

        var jsonified = '{\n';
        jsonified += `file: ${this.file}\n`;
        //jsonified += `call: ${this.call.toJson()}\n`;
        jsonified += `method: ${this.method.toJson()}\n`;
        jsonified += '}';

        return jsonified;
    }

}

export {CallMethodPath}