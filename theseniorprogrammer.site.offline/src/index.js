var config = {
  content: [{
    type: 'row',
    content: [
        {
        type:'component',
        componentName: 'example',
        componentState: { text: 'Component 1' }
        },
      {
        type:'component',
        componentName: 'example',
        componentState: { text: 'Component 2' }
        },
      {
        type:'component',
        componentName: 'example',
        componentState: { text: 'Component 3' }
        }
    ]
  }]
};

var myLayout = new GoldenLayout( config );

myLayout.registerComponent( 'example', function( container, state ){
  container.getElement().html( '<h2>' + state.text + '</h2> \
                                <div id="editor">public static void main() {}</div> \
                                <script>\
                                    var editor = ace.edit("editor");\
                                    editor.setTheme("ace/theme/twilight"); \
                                    var JavaMode = ace.require("ace/mode/java").Mode; \
                                    editor.session.setMode(new JavaMode()); \
                                </script>');
});

myLayout.init();




