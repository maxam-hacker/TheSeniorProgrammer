import React, {Component} from 'react';


class ElectraFooter extends Component {

    render() {

        this.theFooter = React.createElement('div', {className: 'electra-footer'});
        
        return this.theFooter;
    }
}

export {ElectraFooter}