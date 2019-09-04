const request = require("request");
const Phosa = require('../theraphosa/theraphosa')
const PhosaTheme = require("../theraphosa/theme/monokai.js");
const PhosaMode = require("../theraphosa/mode/javascript.js").Mode;

var phosaEditor = Phosa.edit('editor');
phosaEditor.setTheme(PhosaTheme);
phosaEditor.getSession().setMode(new PhosaMode());

var ingest = function(filename) {

    // akka-master/akka-actor/src/main/java/akka/actor/AbstractActorRef.java

    var cmd = 'http://localhost:7070/file?' + filename;

    request(cmd, function (error, response, body) {
        if (response.statusCode === 200) {
            phosaEditor.setValue(body);

            cmd = 'http://localhost:7070/paths?' + filename;
            request(cmd, function (error, response, body) {
                if (response.statusCode === 200) {
                    phosaEditor.setValue(body);
                }
            });
        }
    });
}

exports.ingest = ingest;