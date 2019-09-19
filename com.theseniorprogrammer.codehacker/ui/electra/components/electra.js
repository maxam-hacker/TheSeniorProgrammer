import React, {Component} from 'react';
import SplitterLayout from 'react-splitter-layout';
import 'react-splitter-layout/lib/index.css';
import {Browser} from './browser/browser';
import {Theraphosa} from './editor/theraphosa'
import {PathMaster} from './pathmaster'
import PathMasterView from './pathmaster/view'

class Electra extends Component {

    render() {
        return React.createElement(SplitterLayout, { primaryIndex: 0, percentage: true, secondaryInitialSize: 80, vertical: true }, 
            React.createElement(PathMasterView, { path: '/Users/a.kiselev/Documents/GitLab/TheSeniorProgrammer/com.theseniorprogrammer.codehacker/ui' }),
            React.createElement(SplitterLayout, { primaryIndex: 0, percentage: true, secondaryInitialSize: 84}, 
                    React.createElement(Browser, { path: '/Users/a.kiselev/Documents/GitLab/TheSeniorProgrammer/com.theseniorprogrammer.codehacker/ui/', type: 'calls' }),
                    React.createElement(SplitterLayout, { primaryIndex: 0, percentage: true, secondaryInitialSize: 60 },
                        React.createElement(Theraphosa, { path: '/Users/a.kiselev/Documents/GitLab/TheSeniorProgrammer/com.theseniorprogrammer.codehacker/ui/', id: '_calls', type: 'calls' }),
                        React.createElement(SplitterLayout, { primaryIndex: 0, percentage: true, secondaryInitialSize: 66 },
                            React.createElement(Browser, { path: '/Users/a.kiselev/Documents/GitLab/TheSeniorProgrammer/com.theseniorprogrammer.codehacker/ui/', type: 'methods' }),
                            React.createElement(Theraphosa, { path: '/Users/a.kiselev/Documents/GitLab/TheSeniorProgrammer/com.theseniorprogrammer.codehacker/ui/', id: '_methods', type: 'methods' }),
                        )
                    )
            )
        )};
}

export {Electra}
