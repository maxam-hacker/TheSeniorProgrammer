import React, {Component} from 'react';
import {TopicsPageHeader} from './header';
import {GroupIcon} from './groupicon';
import {Backender} from '../backender'
import {GroupHandler} from './model';

class TopicsPage extends Component {

    constructor(props) {
        super(props);

        this.groupList = [];

        // Debugging...
        this.groupList.push(new GroupHandler('Spring'));
        this.groupList.push(new GroupHandler('Spring Boot'));
        this.groupList.push(new GroupHandler('Hazelcast'));
        this.groupList.push(new GroupHandler('Solr'));
        this.groupList.push(new GroupHandler('Lucine'));
        this.groupList.push(new GroupHandler('PostgreSQL'));
        this.groupList.push(new GroupHandler('Elasticsearch'));
        this.groupList.push(new GroupHandler('Java VM'));
        this.groupList.push(new GroupHandler('Chrome'));
        this.groupList.push(new GroupHandler('Chrome V8'));
        this.groupList.push(new GroupHandler('Chakra'));
        this.groupList.push(new GroupHandler('Python VM'));
        
        Backender.getTopics(function(data) {
        });
    }

    componentDidMount() {
        // 
    }

    render() {

        this.header = React.createElement(TopicsPageHeader, {});

        this.groupContainer = React.createElement('div', {className: 'topics-page-icons-wrapper'},
            this.groupList.map((group) => {
                return React.createElement(GroupIcon, {groupName: group.name});
            })
        );

        this.pageWrapper = React.createElement('div', {className: 'senior-topics-page'}, 
                this.header,
                this.groupContainer
        );

        return this.pageWrapper;
    }
}

export {TopicsPage}