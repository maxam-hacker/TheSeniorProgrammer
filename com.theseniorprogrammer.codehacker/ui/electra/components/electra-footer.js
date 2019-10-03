import React, {Component} from 'react';
import PathMasterView from './pathmaster/view';

class ElectraFooter extends Component {

    render() {

        this.pathMasterView = React.createElement(PathMasterView, { path: '.' });

        this.theFooter = React.createElement('div', {className: 'electra-footer'}, 
                                this.pathMasterView
                        );
        
        return this.theFooter;
    }
}

export {ElectraFooter}