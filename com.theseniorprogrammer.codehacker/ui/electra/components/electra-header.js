import React, {Component} from 'react';

class ElectraHeader extends Component {

    render() {

        this.theHeader = React.createElement('div', {className: 'electra-header'});

        return this.theHeader;
    }
}

export {ElectraHeader}