import React, {Component} from 'react';
import {render} from 'react-dom';
import {Electra} from './components/electra'

const node = document.getElementById('app');

const app = React.createElement(Electra, {});

render(app, node);