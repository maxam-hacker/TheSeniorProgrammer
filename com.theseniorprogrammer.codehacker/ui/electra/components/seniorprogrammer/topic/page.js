import React, {Component} from 'react';
import {Backender} from '../backender';
import {TopicIcon} from './topicicon';
import {TopicHandler} from './model';

class TopicContentPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            updateSource: 'constructor'
        };

        this.topicList = [];
        this.topicName = this.props.location.pathname.split('/')[2];

        this.onTopicContent = this.onTopicContent.bind(this);
        this.onTopicContentError = this.onTopicContentError.bind(this);
    }

    onTopicContent(data) {

    }

    onTopicContentError(error) {
        // For debugging...
        this.topicList.push(new TopicHandler('spring-core'));
        this.topicList.push(new TopicHandler('spring-beans'));
        this.topicList.push(new TopicHandler('spring-mvc'));
        this.topicList.push(new TopicHandler('spring-transactions'));

        this.setState({ updateSource: 'onTopicContentError' });
    }

    componentDidMount(){

        Backender.getTopicContent(
            this.topicName, 
            this.onTopicContent,
            this.onTopicContentError
        );

    }

    render() {

        this.topicContainer = React.createElement('div', {className: 'topics-page-icons-wrapper'},
            this.topicList.map((topic) => {
                return React.createElement(TopicIcon, {topicName: topic.name});
            })
        );

        this.pageWrapper = React.createElement('div', {}, 
            this.topicName,
            this.topicContainer
        );

        return this.pageWrapper;
    }
}

export {TopicContentPage}