import React, {Component} from 'react';

class ElectraHeader extends Component {

    render() {

        this.logoPathCircle = React.createElement('path', { className: 'logo-circle', 
        d: 
        'M45,3 \
        A27,27 0 0,0 45,57 \
        M45,3 \
        A27,27 0 0,1 45,57 \
        M45,3 \
        L45, 17 \
        A47,25 0 0,1 45,56 \
        L45, 40 \
        A47,25 0 0,1 45,3 \
        '});

        this.logoSvg = React.createElement('svg', {}, this.logoPathCircle);

        this.logoWrapper = React.createElement('div', {className: 'logo-wrapper'}, this.logoSvg);

        this.theHeader = React.createElement('div', {className: 'electra-header'}, this.logoWrapper);

        return this.theHeader;
    }
}

export {ElectraHeader}