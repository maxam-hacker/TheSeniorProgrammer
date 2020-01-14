import React, {Component} from 'react';
import { Link } from "react-router-dom"; 
import PropTypes from 'prop-types';
import {pathIcon, pathLink} from '../styles/topics-page-style';

class GroupIcon extends Component {

    constructor(props) {
        super(props);

        this.state = {
            groupName: this.props.groupName
        };
    }

    render() {

        this.groupIcon = React.createElement(
            'div', {style: pathIcon}, 
                this.state.groupName);

        this.groupLinkedIcon = React.createElement(
            Link, {to: '/topic' + '/' + String(this.state.groupName).toLowerCase(), style: pathLink}, 
                this.groupIcon);

        return this.groupLinkedIcon;
    }
}

GroupIcon.propTypes = {
    groupName: PropTypes.string.isRequired,
};

export {GroupIcon}
