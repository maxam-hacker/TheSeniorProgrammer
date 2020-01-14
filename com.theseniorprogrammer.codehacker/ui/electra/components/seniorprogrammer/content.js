import React, {Component} from 'react';
import {MainPage} from './main/page';
import {GroupsPage} from './topics/page';
import {PluginsPage} from './plugins/page';
import {Switch, Route, Redirect} from 'react-router-dom';
import {TopicContentPage} from './path/page';
import {CodeHacker} from '../codehacker/codehacker';
import {seniorContent} from './styles/common-styles';

class SeniorContent extends Component {

    render() {

        this.mainPageRouter = React.createElement(Route, {path: '/main', component: MainPage});
        this.groupsPageRouter = React.createElement(Route, {path: '/topics', component: GroupsPage});
        this.pluginsPageRouter = React.createElement(Route, {path: '/plugins', component: PluginsPage});
        this.topicContentRouter = React.createElement(Route, {path: '/topic', component: TopicContentPage});
        this.codeHackerRouter = React.createElement(Route, {path: '/codehacker/:topic', component: CodeHacker});

        this.rootPageRedirect = React.createElement(Redirect, {from: '/', to: '/main'});

        this.contentSwitcher = React.createElement(
            Switch, {}, 
                this.mainPageRouter,
                this.groupsPageRouter,
                this.pluginsPageRouter,
                this.topicContentRouter,
                this.codeHackerRouter,
                this.rootPageRedirect
        );

        this.content = React.createElement('div', {style: seniorContent}, this.contentSwitcher);

        return this.content;
    }
}

export {SeniorContent}
