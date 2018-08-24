import React, { Component } from 'react';
import AceEditor from 'react-ace';
import brace from 'brace';

import 'brace/mode/java';
import 'brace/theme/monokai';

class App extends Component {
	
  render() {
	  
    return (
    		
      <div className="App">
      
      <AceEditor
      		mode="java"
    	    theme="monokai"
    	    onChange={onChange}
    	    name="UNIQUE_ID_OF_DIV"
    	    editorProps={{$blockScrolling: true}}
    	  />
      
      </div>
    ); 
  }
  
}

function onChange(newValue) {
	  console.log('change',newValue);
	}

export default App;
