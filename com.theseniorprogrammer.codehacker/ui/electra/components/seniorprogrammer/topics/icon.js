import React, {Component} from 'react';
import { Link } from "react-router-dom"; 
import PropTypes from 'prop-types';


class TopicIcon extends Component {

    constructor(props) {
        super(props);

        this.state = {
            topicName: this.props.topicName
        };

        this.extendTopic = function(e) {
            this.setState({topicName: 'On Clicks...'});
        };
    }

    render() {

        this.topicIconWrapper = React.createElement('div', {className: 'senior-topic-icon', onClick: this.extendTopic.bind(this)}, 
            this.state.topicName);

        this.topicLinkedIconWrapper = React.createElement(Link, {to: '/topic' + '/' + String(this.state.topicName).toLowerCase(), className: 'senior-topic-link'}, 
            this.topicIconWrapper);

        return this.topicLinkedIconWrapper;
    }
}

TopicIcon.propTypes = {
    topicName: PropTypes.string.isRequired,
};

export {TopicIcon}
