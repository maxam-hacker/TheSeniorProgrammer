
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

    toString() {
        var stringified = '';
        
        stringified += `${this.file}` + '_';

        stringified += `${this.call.file}` + '-';
        stringified += `${this.call.start.line}` + '-' + `${this.call.start.column}` + '-'
        stringified += `${this.call.end.line}` + '-' + `${this.call.end.column}` + '_';

        stringified += `${this.method.file}` + '-';
        stringified += `${this.method.start.line}` + '-' + `${this.method.start.column}` + '-'
        stringified += `${this.method.end.line}` + '-' + `${this.method.end.column}` + '_';

        return stringified;
    }

    toJson() {

        var jsonified = '{\n';
        jsonified += `file: ${this.file}\n`;
        jsonified += `call: ${this.call.toJson()}\n`;
        jsonified += `method: ${this.method.toJson()}\n`;
        jsonified += '}';

        return jsonified;
    }

}

export {CallMethodPath}