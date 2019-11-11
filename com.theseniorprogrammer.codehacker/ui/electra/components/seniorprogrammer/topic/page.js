import React, {Component} from 'react';
import {Backender} from '../backender'

class TopicContentPage extends Component {

    constructor(props) {
        super(props);

        this.topicName = this.props.location.pathname.split('/')[2];
        Backender.getTopicContent(this.topicName, function(data){

        });
    }

    render() {

        this.pageWrapper = React.createElement('div', {}, 
            this.topicName
        );

        return this.pageWrapper;
    }
}

export {TopicContentPage}