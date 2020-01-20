export default class PathFile {

    constructor() {
        this.id = null;
        this.name = null;
    }

    constructor(file) {
        this.id = file.id;
        this.name = file.name;
    }

    constructor(name, id) {
        this.id = id;
        this.name = name;
    }

    toString() {
        return this.name;
    }

    toJson() {
        return `{ "name": ${this.name}, "id": ${this.id} }`;
    }

}