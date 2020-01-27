class PathMasterMethod {

    constructor() {
        this.browserFile = null;
        this.lineStart = -1;
        this.lineEnd = -1;
        this.columnStart = -1;
        this.columnEnd = -1;
        this.text = '';
    }

    setBrowserFile(file) {
        this.browserFile = file;
        return this;
    }

    setLineStartAndEnd(start, end) {
        this.lineStart = start;
        this.lineEnd = end;
        return this;
    }

    setColumnStartAndEnd(start, end) {
        this.columnStart = start;
        this.columnEnd = end;
        return this;
    }

    setText(text) {
        this.text = text;
        return this;
    }

}

export {PathMasterMethod}