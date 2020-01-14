import React, {Component} from 'react';
import {MainPage} from './main/page';
import {TopicsPage} from './topics/page';
import {PluginsPage} from './plugins/page';
import {Switch, Route, Redirect} from 'react-router-dom';
import {PathsPage} from './paths/page';
import {CodeHacker} from '../codehacker/codehacker';
import {seniorContent} from './styles/common-styles';

class SeniorContent extends Component {

    render() {

        this.mainPageRouter = React.createElement(Route, {path: '/main', component: MainPage});
        this.topicsPageRouter = React.createElement(Route, {path: '/topics', component: TopicsPage});
        this.pluginsPageRouter = React.createElement(Route, {path: '/plugins', component: PluginsPage});
        this.pathsRouter = React.createElement(Route, {path: '/topic', component: PathsPage});
        this.codeHackerRouter = React.createElement(Route, {path: '/codehacker/:topic', component: CodeHacker});

        this.rootPageRedirect = React.createElement(Redirect, {from: '/', to: '/main'});

        this.contentSwitcher = React.createElement(
            Switch, {}, 
                this.mainPageRouter,
                this.topicsPageRouter,
                this.pluginsPageRouter,
                this.pathsRouter,
                this.codeHackerRouter,
                this.rootPageRedirect
        );

        this.content = React.createElement('div', {style: seniorContent}, this.contentSwitcher);

        return this.content;
    }
}

export {SeniorContent}
