import {PathWeb} from './web'
import {PathCell} from './cell'
import {PathCall} from './call'
import {PathMethod} from './method'

var ThePathWeb = new PathWeb();
var method = {};
var call = {};
var cell = {};
var path = {};

method = new PathMethod();
method.setName('constructor(name, start, end)');
method.setStart(14, 0);
method.setEnd(18, 5);
cell = new PathCell();
cell.addMethod(method);
ThePathWeb.addCell('method.js', cell);

var call = new PathCall();
call.setName('new PathMethod()');
call.setStart(6, 9);
call.setEnd(6, 25);
call.setPath({file: 'method.js', method: method});
cell = new PathCell();
cell.addCall(call);
ThePathWeb.addCell('index.js', cell);

console.log(ThePathWeb.toJson());

export { ThePathWeb }