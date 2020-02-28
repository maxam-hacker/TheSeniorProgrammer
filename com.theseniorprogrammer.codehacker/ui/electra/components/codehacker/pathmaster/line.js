import React, {Component, useState} from 'react';
import {BrowserToTheraphosaCallsEventBus, CodeMasterToPathMasterLineEventBus} from '../eventbus.js';


export default function  PathMasterLine() {

    const [pathToFile, setPathToFile] = React.useState('');

    const FileAndFolderClick = function(browserFile) {
        setPathToFile(browserFile.fullName);
    };
    const openedCallClick = function(methodFileName) {
        setPathToFile(methodFileName);
    };
    BrowserToTheraphosaCallsEventBus.subscribe(FileAndFolderClick.bind(this));
    CodeMasterToPathMasterLineEventBus.subscribe(openedCallClick.bind(this));

    var text = React.createElement('span', {}, pathToFile);
    var tab = React.createElement('div', {className: 'path-line-container'}, text);

    return tab;

}

