import React, {Component} from 'react';
import PathMasterView from './pathmaster/view';

class ElectraHeader extends Component {

    render() {
        this.pathMasterView = React.createElement(PathMasterView, { path: '.' });

        this.theHeader = React.createElement('div', {className: 'electra-header'}, this.pathMasterView );

        return this.theHeader;
    }
}

export {ElectraHeader}