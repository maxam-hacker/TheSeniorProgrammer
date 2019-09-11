import {PathWeb} from './web'
import {PathCall} from './call'
import {PathMethod} from './method'
import {CallMethodPath} from './path'

var ThePathWeb = new PathWeb();

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

const ingestPath = function(file, call, method) {
    var path = new CallMethodPath();
    path.setFile(file);
    path.setCall(call);
    path.setMethod(method);
    ThePathWeb.addPath(file, path);

    return path;
}

const getCallsForFile = function(file) {
    return ThePathWeb.getCalls(file);
}

export { ingestCall, ingestMethod, ingestPath, getCallsForFile }