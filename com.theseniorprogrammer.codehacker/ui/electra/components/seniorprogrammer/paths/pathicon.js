import React, {Component} from 'react';
import { Link } from 'react-router-dom'; 
import PropTypes from 'prop-types';
import {pathsIcon, pathsLink} from '../styles/paths-page-style';

class PathIcon extends Component {

    constructor(props) {
        super(props);

        this.state = {
            pathObject: this.props.path
        };
    }

    render() {

        this.pathIcon = React.createElement(
            'div', {style: pathsIcon}, 
                this.props.pathObject.pathName
        );

        this.pathLinkedIcon = React.createElement(
            Link, {to: '/codehacker/' + this.props.pathObject.pathName + '/' + this.props.pathObject.pathFolderDescriptor + '/' + this.props.pathObject.pathSrcFolderDescriptor, style: pathsLink}, 
                this.pathIcon
        );

        return this.pathLinkedIcon;
    }
}

PathIcon.propTypes = {
    pathObject: PropTypes.object.isRequired
};

export {PathIcon}
