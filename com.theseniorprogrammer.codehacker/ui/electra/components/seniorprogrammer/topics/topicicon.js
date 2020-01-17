import React, {Component} from 'react';
import { Link } from "react-router-dom"; 
import PropTypes from 'prop-types';
import {topicIcon, topicLink} from '../styles/topics-page-style';

class TopicIcon extends Component {

    constructor(props) {
        super(props);

        this.state = {
            topicName: this.props.topicName,
            topicDescriptor: this.props.topicDescriptor
        };
    }

    render() {

        this.topicIcon = React.createElement(
            'div', {style: topicIcon}, 
                this.state.topicName);

        this.topicLinkedIcon = React.createElement(
            Link, {to: '/topic' + '/' + String(this.state.topicName) + '?' + String(this.state.topicDescriptor), style: topicLink}, 
                this.topicIcon);

        return this.topicLinkedIcon;
    }
}

TopicIcon.propTypes = {
    topicName: PropTypes.string.isRequired,
    topicDescriptor: PropTypes.string.isRequired
};

export {TopicIcon}
