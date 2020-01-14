import React, {Component} from 'react';
import { Link } from 'react-router-dom'; 
import PropTypes from 'prop-types';
import {pathsIcon, pathsLink} from '../styles/paths-page-style';

class PathIcon extends Component {

    constructor(props) {
        super(props);

        this.state = {
            pathName: this.props.pathName
        };
    }

    render() {

        this.pathIcon = React.createElement(
            'div', {style: pathsIcon}, 
                this.state.pathName
        );

        this.pathLinkedIcon = React.createElement(
            Link, {to: '/codehacker/' + this.props.pathName, style: pathsLink}, 
                this.pathIcon
        );

        return this.pathLinkedIcon;
    }
}

PathIcon.propTypes = {
    pathName: PropTypes.string.isRequired,
};

export {PathIcon}
