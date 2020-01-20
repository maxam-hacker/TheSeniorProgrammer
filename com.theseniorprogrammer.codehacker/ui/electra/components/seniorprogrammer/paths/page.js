import React, {Component} from 'react';
import {Backender} from '../../../connectors/backender';
import {Googler} from '../../../connectors/googledriver';
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
        console.log(this.props.location);
        this.topicName = this.props.location.pathname.split('/')[2];
        this.topicDescriptor = this.props.location.search.replace('?', '');

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
        this.pathList.push(new PathHandler('Error :: onGetTopicContentError'));
        this.setState({ updateSource: 'onGetTopicContentError' });
    }

    componentDidMount(){

        /*
        Backender.getTopicContent(
            this.topicName, 
            this.onGetTopicContent,
            this.onGetTopicContentError
        );
        */

        Googler.getPathsForTopic(

            this.topicDescriptor, 

            (data, fileId) => {
                this.pathList.push(new PathHandler(fileId, data));
                this.setState({ updateSource: 'getPathsForTopic' });
            }
        );

    }

    render() {

        this.pathsContainer = React.createElement(
            'div', {style: pathsPageContent},
                this.pathList.map((path) => {
                    return React.createElement(PathIcon, {pathObject: path});
                })
        );

        this.pageWrapper = React.createElement(
            'div', {style: seniorPageWrapper}, 
                this.topicName,
                this.pathsContainer
        );

        return this.pageWrapper;
    }
}

export {PathsPage}