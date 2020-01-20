class BrowserFile {

    constructor() {
        this.id = '';
        this.name = '';
        this.type = '';
        this.fullName = '';
        this.originalObject = null;
    }

    setId(id) {
        this.id = id;
        return this;
    }

    setName(name) {
        this.name = name;
        return this;
    }

    setType(type) {
        this.type = type;
        return this;
    }

    setFullName(fullName) {
        this.fullName = fullName;
        return this;
    }

    setOriginalObject(originalObject) {
        this.originalObject = originalObject;
        return this;
    }
}

export {BrowserFile}