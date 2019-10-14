import React, {Component} from 'react';

class ElectraHeader extends Component {

    render() {

        this.logoPath = React.createElement('path', { className: 'logo-lines', 
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
        this.logoSvg = React.createElement('svg', {}, this.logoPath);
        this.logoWrapper = React.createElement('div', {className: 'logo-wrapper'}, this.logoSvg);

        this.titleSp = React.createElement('span', {className: 'title-senior-programmer'}, 'TheSeniorProgrammer');
        this.titleCh = React.createElement('span', {className: 'title-code-hacker'}, 'CodeHacker :');
        this.titlePr = React.createElement('span', {className: 'title-project-name'}, 'project-name');
        this.titleChWrapper = React.createElement('div', {className: 'title-project-wrapper'}, this.titleCh, this.titlePr);
        this.titleWrapper = React.createElement('div', {className: 'title-wrapper'}, this.titleSp, this.titleChWrapper);

        this.theHeader = React.createElement('div', {className: 'electra-header'}, this.logoWrapper, this.titleWrapper);

        return this.theHeader;
    }
}

export {ElectraHeader}