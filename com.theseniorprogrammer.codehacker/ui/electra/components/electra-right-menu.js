import React, {Component} from 'react';

class ElectraRightMenu extends Component {

    render() {

        this.theRightMenu = React.createElement('div', {className: 'electra-right'});
        
        return this.theRightMenu;
    }
}

export {ElectraRightMenu}