import React, {Component} from 'react';
import {TopicsPageHeader} from './header';
import {GroupIcon} from './groupicon';
import {Backender} from '../backender'
import {GroupHandler} from './model';
import {seniorPageWrapper} from '../styles/common-styles';
import {topicsPageContent} from '../styles/topics-page-style';

class GroupsPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            updateSource: 'constructor'
        };

        this.groupList = [];
        
        this.onGetTopicGroups = this.onGetTopicGroups.bind(this);
        this.onGetTopicGroupsError = this.onGetTopicGroupsError.bind(this);
    }

    onGetTopicGroups(groupString) {
        var groups = groupString.split(',');
        groups.forEach(group => this.groupList.push(new GroupHandler(group)));

        this.setState({ updateSource: 'onGetTopicGroups' });
    }

    onGetTopicGroupsError(error) {
        // Debugging...
        this.groupList.push(new GroupHandler('Unknown'));

        this.setState({ updateSource: 'onGetTopicGroupsError' });
    }

    componentDidMount() {
        Backender.getTopicGroups(this.onGetTopicGroups, this.onGetTopicGroupsError);
    }

    render() {

        this.header = React.createElement(TopicsPageHeader, {});

        this.groupContainer = React.createElement(
            'div', {style: topicsPageContent},
                this.groupList.map((group) => {
                    return React.createElement(GroupIcon, {groupName: group.name});
                })
        );

        this.pageWrapper = React.createElement(
            'div', {style: seniorPageWrapper}, 
                this.header,
                this.groupContainer
        );

        return this.pageWrapper;
    }
}

export {GroupsPage}