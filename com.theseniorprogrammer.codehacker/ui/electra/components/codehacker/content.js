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
        // The editor is in the first place (it's important)
        this.phosa = React.createElement(Theraphosa, { id: '_calls'  });
        this.pathLine = React.createElement(PathMasterLine, {});

        this.editorContainer = React.createElement(
            'div', {}, 
                this.pathLine, 
                this.phosa
        );

        this.browser = React.createElement(Browser, { srcFolderDescriptor: this.src, pathFolderDescriptor: this.content });

        this.codeHacker = React.createElement(
            VerticalSplitter, {}, 
                this.browser, 
                this.editorContainer
        );

        this.codeHackerWrapper = React.createElement(
            'div', {className: 'electra-content'}, 
                this.codeHacker
        );

        return this.codeHackerWrapper;
    }
}

export {CodeHackerContent}