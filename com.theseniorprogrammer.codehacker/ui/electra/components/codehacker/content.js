import React, {Component} from 'react';
import {Browser} from './browser/browser';
import {Theraphosa} from './editor/theraphosa';
import {VerticalSplitter} from './vsplitter';
import {PhosaTabsContainer} from './tabs/container';
import PathMasterLine from './pathmaster/line';


class CodeHackerContent extends Component {

    constructor(props) {
        super(props);
        this.topic = props.topic;
        this.content = props.content;
        this.src = props.src;
    }

    render() {

        this.browser = React.createElement(Browser, { rootFolderDescriptor: this.src, pathFolderDescriptor: this.content, type: 'calls' });
        this.phosa = React.createElement(Theraphosa, { rootFolderDescriptor: this.src, id: '_calls', type: 'calls' });
        this.pathLine = React.createElement(PathMasterLine, {});
        this.editor = React.createElement('div', {}, this.pathLine, this.phosa);
        this.content = React.createElement(VerticalSplitter, {}, this.browser, this.editor);

        return React.createElement('div', {className: 'electra-content'}, this.content);
    }
}

export {CodeHackerContent}