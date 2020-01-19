import {PathWeb} from './web'
import {PathCall} from './call'
import {PathMethod} from './method'
import {CallMethodPath} from './path'
import {Googler} from '../components/seniorprogrammer/gdriver'

var ThePathWeb = new PathWeb();
var TheCalls = [];
var EditorCallRegistry = null;

const initPaths = function(props) {
    Googler.downloadFile(
        props.pathFileDescriptor, 
        savedPath => {

            var mirrorCall= ingestCall(savedPath.file, savedPath.call.text, savedPath.call.start, savedPath.call.end);
            var mirrorMethod = ingestMethod(savedPath.file, savedPath.method.text, savedPath.method.start, savedPath.method.end);
            mirrorCall.setMethod(mirrorMethod);
            ingestPath(savedPath.file, mirrorCall, mirrorMethod);
            
            TheCalls.push({file: savedPath.file, call: mirrorCall});

            if (EditorCallRegistry)
                EditorCallRegistry.add(savedPath.file, mirrorCall);
        }
    );
}

const ingestCall = function(file, text, start, end) {
    var call = new PathCall();
    call.setFile(file);
    call.setText(text);
    call.setStart(start.line, start.column);
    call.setEnd(end.line, end.column);
    ThePathWeb.addCall(file, call);

    return call;
}

const ingestMethod = function(file, text, start, end) {
    var method = new PathMethod();
    method.setFile(file);
    method.setText(text);
    method.setStart(start.line, start.column);
    method.setEnd(end.line, end.column);
    ThePathWeb.addMethod(file, method);

    return method;
}

const ingestPath = function(file, call, method, props) {
    var path = new CallMethodPath();
    path.setFile(file);
    path.setCall(call);
    path.setMethod(method);
    ThePathWeb.addPath(file, path);

    if (props)
        Googler.updateFile(props.pathFileDescriptor, JSON.stringify(path));

    return path;
}

const getCallsForFile = function(file) {
    return ThePathWeb.getCalls(file);
}

const setCallRegistry = function(callRegistry) {
    if (EditorCallRegistry == null) {
        EditorCallRegistry = callRegistry;
        //TheCalls.forEach(call => EditorCallRegistry.add(call.file, call.call));
    }
}

export { ingestCall, ingestMethod, ingestPath, initPaths, getCallsForFile, setCallRegistry }