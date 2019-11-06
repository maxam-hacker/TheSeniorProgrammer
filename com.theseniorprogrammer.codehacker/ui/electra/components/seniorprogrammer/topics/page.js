import React, {Component} from 'react';
import {TopicsPageHeader} from './header';
import {TopicIcon} from './icon';

class TopicsPage extends Component {

    render() {

        this.header = React.createElement(TopicsPageHeader, {});

        this.springHack0 = React.createElement(TopicIcon, {topicName: 'Spring'});
        this.springHack1 = React.createElement(TopicIcon, {}, 'Item0');
        this.springHack2 = React.createElement(TopicIcon, {}, 'Item0');
        this.springHack3 = React.createElement(TopicIcon, {}, 'Item0');
        this.springHack4 = React.createElement(TopicIcon, {}, 'Item0');
        this.springHack5 = React.createElement(TopicIcon, {}, 'Item0');
        this.springHack6 = React.createElement(TopicIcon, {}, 'Item0');
        this.springHack7 = React.createElement(TopicIcon, {}, 'Item0');
        this.springHack8 = React.createElement(TopicIcon, {}, 'Item0');
        this.springHack9 = React.createElement(TopicIcon, {}, 'Item0');
        this.springHack10 = React.createElement(TopicIcon, {}, 'Item0');
        this.springHack11 = React.createElement(TopicIcon, {}, 'Item0');
        this.springHack12 = React.createElement(TopicIcon, {}, 'Item0');
        this.springHack13 = React.createElement(TopicIcon, {}, 'Item0');
        this.springHack14 = React.createElement(TopicIcon, {}, 'Item0');
        this.springHack15 = React.createElement(TopicIcon, {}, 'Item0');
        this.springHack16 = React.createElement(TopicIcon, {}, 'Item0');
        this.springHack17 = React.createElement(TopicIcon, {}, 'Item0');
        this.springHack18 = React.createElement(TopicIcon, {}, 'Item0');
        this.springHack19 = React.createElement(TopicIcon, {}, 'Item0');
        this.springHack20 = React.createElement(TopicIcon, {}, 'Item0');
        this.springHack21 = React.createElement(TopicIcon, {}, 'Item0');
        this.springHack22 = React.createElement(TopicIcon, {}, 'Item0');
        this.springHack23 = React.createElement(TopicIcon, {}, 'Item0');

        this.iconContainer = React.createElement('div', {className: 'senior-topics-page-icons-wrapper'},
                                this.springHack0,
                                this.springHack1,
                                this.springHack2,
                                this.springHack3,
                                this.springHack4,
                                this.springHack5,
                                this.springHack6,
                                this.springHack7,
                                this.springHack8,
                                this.springHack9,
                                this.springHack10,
                                this.springHack11,
                                this.springHack12,
                                this.springHack13,
                                this.springHack14,
                                this.springHack15,
                                this.springHack16,
                                this.springHack17,
                                this.springHack18,
                                this.springHack19,
                                this.springHack20,
                                this.springHack21,
                                this.springHack22,
                                this.springHack23
        );

        this.pageWrapper = React.createElement('div', {className: 'senior-topics-page'}, 
                                this.header,
                                this.iconContainer
        );

        return this.pageWrapper;
    }
}

export {TopicsPage}