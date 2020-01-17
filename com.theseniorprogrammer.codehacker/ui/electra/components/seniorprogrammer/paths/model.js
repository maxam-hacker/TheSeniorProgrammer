class PathHandler {

    constructor(fileId, data) {
        this.pathId = fileId;
        this.pathName = data.name;
        this.pathDescriptor = data.pathDescriptor;
        this.pathSrcFolderDescriptor = data.srcFolderDescriptor;
    }
}

export {PathHandler}