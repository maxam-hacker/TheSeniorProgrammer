import React, {Component} from 'react';

class ElectraLeftMenu extends Component {

    render() {

        this.theLeftMenu = React.createElement('div', {className: 'electra-left'});
        
        return this.theLeftMenu;
    }
}

export {ElectraLeftMenu}