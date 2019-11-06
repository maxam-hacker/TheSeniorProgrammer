import React, {Component} from 'react';


class TopicsPageHeader extends Component {

    render() {

        this.title = React.createElement('span', {}, 'Main Topics');
        this.topicsHeader= React.createElement('div', {className: 'senior-topics-header'}, this.title);

        return this.topicsHeader;
    }
}

export {TopicsPageHeader}
