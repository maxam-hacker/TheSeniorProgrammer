class PathHandler {

    constructor(fileId, data) {
        this.pathId = fileId;
        this.pathName = data.name;
        this.pathFolderDescriptor = data.pathFolderDescriptor;
        this.pathSrcFolderDescriptor = data.srcFolderDescriptor;
    }
}

export {PathHandler}