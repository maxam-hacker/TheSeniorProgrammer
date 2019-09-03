const { remote } = require('electron');
const phosa = require('../theraphosa/ace')
const phosaTheme = require("../theraphosa/theme/monokai.js");
const phosaMode = require("../theraphosa/mode/javascript.js").Mode;

var phosaEditor = phosa.edit('editor');
phosaEditor.setTheme(phosaTheme);
phosaEditor.getSession().setMode(new phosaMode());