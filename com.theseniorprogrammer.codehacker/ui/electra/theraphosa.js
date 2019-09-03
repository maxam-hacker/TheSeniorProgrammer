const { remote } = require('electron');
const Phosa = require('../theraphosa/ace')
const PhosaTheme = require("../theraphosa/theme/monokai.js");
const PhosaMode = require("../theraphosa/mode/javascript.js").Mode;

var phosaEditor = Phosa.edit('editor');
phosaEditor.setTheme(PhosaTheme);
phosaEditor.getSession().setMode(new PhosaMode());