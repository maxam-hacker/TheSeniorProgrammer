const { remote } = require('electron');
const phosa = require('../theraphosa/ace')

var phosaEditor = phosa.edit('editor');
//phosaEditor.setTheme("../theraphosa/theme/monokai.js");
//phosaEditor.getSession().setMode('../../theraphosa/mode/javascript.js');