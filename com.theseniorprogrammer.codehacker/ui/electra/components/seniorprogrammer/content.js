import React, {Component} from 'react';
import {MainPage} from './main/page';
import {TopicsPage} from './topics/page';
import {PluginsPage} from './plugins/page';
import {Switch, Route} from 'react-router-dom';


class SeniorContent extends Component {

    render() {

        this.mainPageRouter = React.createElement(Route, {path: '/main', component: MainPage});
        this.topicsPageRouter = React.createElement(Route, {path: '/topics', component: TopicsPage});
        this.pluginsPageRouter = React.createElement(Route, {path: '/plugins', component: PluginsPage});

        this.contentSwitcher = React.createElement(Switch, {}, 
            this.mainPageRouter,
            this.topicsPageRouter,
            this.pluginsPageRouter);

        this.content = React.createElement('div', {className: 'senior-content'}, this.contentSwitcher);

        return this.content;
    }
}

export {SeniorContent}
