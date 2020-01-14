import React, {Component} from 'react';
import {TopicsPageHeader} from './header';
import {TopicIcon} from './topicicon';
import {Backender} from '../backender'
import {TopicHandler} from './model';
import {seniorPageWrapper} from '../styles/common-styles';
import {topicsPageContent} from '../styles/topics-page-style';

class TopicsPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            updateSource: 'constructor'
        };

        this.topicList = [];
        
        this.onGetTopicGroups = this.onGetTopicGroups.bind(this);
        this.onGetTopicGroupsError = this.onGetTopicGroupsError.bind(this);
    }

    onGetTopicGroups(topicString) {
        var topics = topicString.split(',');
        topics.forEach(topic => this.topicList.push(new TopicHandler(topic)));

        this.setState({ updateSource: 'onGetTopicGroups' });
    }

    onGetTopicGroupsError(error) {
        // Debugging...
        this.topicList.push(new TopicHandler('Unknown'));

        this.setState({ updateSource: 'onGetTopicGroupsError' });
    }

    componentDidMount() {
        Backender.getTopicGroups(this.onGetTopicGroups, this.onGetTopicGroupsError);
    }

    render() {

        this.header = React.createElement(TopicsPageHeader, {});

        this.topicsContainer = React.createElement(
            'div', {style: topicsPageContent},
                this.topicList.map((topic) => {
                    return React.createElement(TopicIcon, {topicName: topic.name});
                })
        );

        this.pageWrapper = React.createElement(
            'div', {style: seniorPageWrapper}, 
                this.header,
                this.topicsContainer
        );

        return this.pageWrapper;
    }
}

export {TopicsPage}