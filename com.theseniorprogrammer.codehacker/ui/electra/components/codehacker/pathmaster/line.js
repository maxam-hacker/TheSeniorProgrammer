import React, {Component, useState} from 'react';
import {BrowserToTheraphosaCallsEventBus, BrowserToTheraphosaMethodsEventBus} from '../eventbus.js';


export default function  PathMasterLine() {

    const [pathToFile, setPathToFile] = React.useState('');

    const FileAndFolderClick = function(browserFile) {
        setPathToFile(browserFile.fullName);
    };
    BrowserToTheraphosaCallsEventBus.subscribe(FileAndFolderClick.bind(this));

    var text = React.createElement('span', {}, pathToFile);
    var tab = React.createElement('div', {className: 'path-line-container'}, text);

    return tab;

}

