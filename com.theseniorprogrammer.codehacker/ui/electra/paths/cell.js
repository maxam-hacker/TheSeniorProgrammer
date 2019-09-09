/*******************************************************
//  cell = { calls: [ calls ], methods: [ methods ] }
*******************************************************/

class PathCell {

    constructor() {
        this.TheCell = { calls: [], methods: [] };
    }

    addCall(call) {
        this.TheCell.calls.push(call);
    }

    addMethod(method) {
        this.TheCell.methods.push(method);
    }

    toJson() {

        var jsonified = '{\n';

        jsonified += 'calls:\n'
        this.TheCell.calls.forEach(call => jsonified += `${call.toJson()},\n`);

        jsonified += 'methods:\n'
        this.TheCell.methods.forEach(method => jsonified += `${method.toJson()},\n`);

        jsonified += '}';

        return jsonified;
    }

}

export {PathCell}