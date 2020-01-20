import React, {Component} from 'react';
import {TopicsPageHeader} from './header';
import {TopicIcon} from './topicicon';
import {Backender} from '../../../connectors/backender';
import {Googler} from '../../../connectors/googledriver';
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

        this.onGoogleDriveGetTopics = this.onGoogleDriveGetTopics.bind(this);
        this.onGoogleDriveGetRootError = this.onGoogleDriveGetRootError.bind(this);
    }

    onGetTopicGroups(topicString) {
        topicString.split(',').forEach(topic => this.topicList.push(new TopicHandler(topic, null)));
        this.setState({ updateSource: 'onGetTopicGroups' });
    }

    onGoogleDriveGetTopics(data, topicId) {
        this.topicList.push(new TopicHandler(topicId, data.name, data.pathsFolderDescriptor));
        this.setState({ updateSource: 'onGoogleDriveGetTopics' });
    }

    onGetTopicGroupsError(error) {
        // Debugging...
        this.topicList.push(new TopicHandler('Error :: onGetTopicGroupsError'));
        this.setState({ updateSource: 'onGetTopicGroupsError' });
    }

    onGoogleDriveGetRootError(error) {
        // Debugging...
        this.topicList.push(new TopicHandler('Error :: onGoogleDriveGetRootError'));
        this.setState({ updateSource: 'onGoogleDriveGetRootError' });
    }

    componentDidMount() {
        //Backender.getTopicGroups(this.onGetTopicGroups, this.onGetTopicGroupsError);
        Googler.getTopics(this.onGoogleDriveGetTopics, this.onGoogleDriveGetRootError);
    }

    render() {

        this.header = React.createElement(TopicsPageHeader, {});

        this.topicsContainer = React.createElement(
            'div', {style: topicsPageContent},
                this.topicList.map((icon) => {
                    return React.createElement(TopicIcon, {topicName: icon.topicName, topicDescriptor: icon.topicDescriptor});
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