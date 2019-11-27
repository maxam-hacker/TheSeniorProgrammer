import React, {Component} from 'react';


class PhosaTab extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        var icon = React.createElement('svg', {className: 'tab-icon-close'});
        var text = React.createElement('span', {className: 'tab-text'}, this.props.header);
        var tab = React.createElement('div', {className: 'tab'}, text, icon);

        return tab;
    }
}

export {PhosaTab}
