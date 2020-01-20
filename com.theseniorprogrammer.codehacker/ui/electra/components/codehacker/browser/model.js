class BrowserFile {

    constructor() {
        this.id = '';
        this.name = '';
        this.type = '';
        this.fullName = '';
    }

    constructor(id, name, type, fullName) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.fullName = fullName;
    }

    setId(id) {
        this.id = id;
    }

    setName(name) {
        this.name = name;
    }

    setName(type) {
        this.type = type;
    }

    setName(fullName) {
        this.fullName = fullName;
    }
}

export {BrowserFile}