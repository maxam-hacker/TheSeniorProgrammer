import React, {Component} from 'react';
import {TopicsPageHeader} from './header';
import {TopicIcon} from './icon';
import {Backender} from '../backender'
import {TopicHandler} from './model';

class TopicsPage extends Component {

    constructor(props) {
        super(props);

        this.topicList = [];

        // Debugging...
        this.topicList.push(new TopicHandler('Spring'));
        this.topicList.push(new TopicHandler('Spring Boot'));
        this.topicList.push(new TopicHandler('Hazelcast'));
        this.topicList.push(new TopicHandler('Solr'));
        this.topicList.push(new TopicHandler('Lucine'));
        this.topicList.push(new TopicHandler('PostgreSQL'));
        this.topicList.push(new TopicHandler('Elasticsearch'));
        this.topicList.push(new TopicHandler('Java VM'));
        this.topicList.push(new TopicHandler('Chrome'));
        this.topicList.push(new TopicHandler('Chrome V8'));
        this.topicList.push(new TopicHandler('Chakra'));
        this.topicList.push(new TopicHandler('Python VM'));
        
        Backender.getTopics(function(data) {
        });
    }

    componentDidMount() {
        // 
    }

    render() {

        this.header = React.createElement(TopicsPageHeader, {});

        this.iconContainer = React.createElement('div', {className: 'topics-page-icons-wrapper'},
                this.topicList.map((topic) => {
                     return React.createElement(TopicIcon, {topicName: topic.name});
                })
        );
        this.pageWrapper = React.createElement('div', {className: 'senior-topics-page'}, 
                this.header,
                this.iconContainer
        );

        return this.pageWrapper;
    }
}

export {TopicsPage}