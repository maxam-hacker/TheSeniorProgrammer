import React, {Component} from 'react';
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

        this.topicIconWrapper = React.createElement('div', {className: 'senior-topic-icon', onClick: this.extendTopic.bind(this)}, this.state.topicName);

        return this.topicIconWrapper;
    }
}

TopicIcon.propTypes = {
    topicName: PropTypes.string.isRequired,
};

export {TopicIcon}
