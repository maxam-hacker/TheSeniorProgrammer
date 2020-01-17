import React, {Component, useState} from 'react';
import {BrowserToTheraphosaCallsEventBus, BrowserToTheraphosaMethodsEventBus} from '../eventbus.js';


export default function  PathMasterLine() {

    const [pathToFile, setPathToFile] = React.useState('');

    const FileAndFolderClick = function(event) {
        setPathToFile(event.path);
    };
    BrowserToTheraphosaCallsEventBus.subscribe(FileAndFolderClick.bind(this));

    var text = React.createElement('span', {}, pathToFile);
    var tab = React.createElement('div', {className: 'path-line-container'}, text);

    return tab;

}

