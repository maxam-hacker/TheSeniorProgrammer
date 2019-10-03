import React, {Component} from 'react';

class ElectraLeft extends Component {

    render() {

        this.theLeft = React.createElement('div', {className: 'electra-left'});
        
        return this.theLeft;
    }
}

export {ElectraLeft}