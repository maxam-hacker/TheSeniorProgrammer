import React, {Component} from 'react';
import {Backender} from '../backender';
import {PathIcon} from './pathicon';
import {PathHandler} from './model';
import {seniorPageWrapper} from '../styles/common-styles';
import {pathsPageContent} from '../styles/paths-page-style';

class PathsPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            updateSource: 'constructor'
        };

        this.pathList = [];
        this.topicName = this.props.location.pathname.split('/')[2];

        this.onGetTopicContent = this.onGetTopicContent.bind(this);
        this.onGetTopicContentError = this.onGetTopicContentError.bind(this);
    }

    onGetTopicContent(contentString) {

        var paths = contentString.split(',');
        paths.forEach(path => this.pathList.push(new PathHandler(path)));

        this.setState({ updateSource: 'onGetTopicContent' });
    }

    onGetTopicContentError(error) {
        // For debugging...
        this.pathList.push(new PathHandler('spring-core'));
        this.pathList.push(new PathHandler('spring-beans'));
        this.pathList.push(new PathHandler('spring-mvc'));
        this.pathList.push(new PathHandler('spring-transactions'));

        this.setState({ updateSource: 'onGetTopicContentError' });
    }

    componentDidMount(){

        Backender.getTopicContent(
            this.topicName, 
            this.onGetTopicContent,
            this.onGetTopicContentError
        );

    }

    render() {

        this.pathsContainer = React.createElement(
            'div', {style: pathsPageContent},
                this.pathList.map((path) => {
                    return React.createElement(PathIcon, {pathName: path.name});
                })
        );

        this.pageWrapper = React.createElement(
            'div', {style: seniorPageWrapper}, 
                //this.topicName,
                this.pathsContainer
        );

        return this.pageWrapper;
    }
}

export {PathsPage}