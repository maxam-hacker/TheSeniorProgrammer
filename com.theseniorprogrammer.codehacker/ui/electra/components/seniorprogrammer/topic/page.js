import React, {Component} from 'react';
import {Backender} from '../backender';
import {TopicIcon} from './topicicon';
import {TopicHandler} from './model';

class TopicContentPage extends Component {

    constructor(props) {
        super(props);

        this.topicList = [
            new TopicHandler('spring-core'),
            new TopicHandler('spring-beans'),
            new TopicHandler('spring-mvc')
        ];

        this.topicName = this.props.location.pathname.split('/')[2];
        Backender.getTopicContent(this.topicName, function(data){

        });
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