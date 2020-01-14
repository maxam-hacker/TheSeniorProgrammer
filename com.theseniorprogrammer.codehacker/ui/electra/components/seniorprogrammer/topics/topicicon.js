import React, {Component} from 'react';
import { Link } from "react-router-dom"; 
import PropTypes from 'prop-types';
import {pathIcon, pathLink} from '../styles/topics-page-style';

class TopicIcon extends Component {

    constructor(props) {
        super(props);

        this.state = {
            topicName: this.props.topicName
        };
    }

    render() {

        this.topicIcon = React.createElement(
            'div', {style: pathIcon}, 
                this.state.topicName);

        this.topicLinkedIcon = React.createElement(
            Link, {to: '/topic' + '/' + String(this.state.topicName).toLowerCase(), style: pathLink}, 
                this.topicIcon);

        return this.topicLinkedIcon;
    }
}

TopicIcon.propTypes = {
    topicName: PropTypes.string.isRequired,
};

export {TopicIcon}
