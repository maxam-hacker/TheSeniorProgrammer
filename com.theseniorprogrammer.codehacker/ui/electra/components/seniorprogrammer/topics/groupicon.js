import React, {Component} from 'react';
import { Link } from "react-router-dom"; 
import PropTypes from 'prop-types';


class GroupIcon extends Component {

    constructor(props) {
        super(props);

        this.state = {
            groupName: this.props.groupName
        };
    }

    render() {

        this.groupIconWrapper = React.createElement('div', {className: 'senior-topic-icon'}, 
            this.state.groupName);

        this.groupIconLinkedWrapper = React.createElement(Link, {to: '/topic' + '/' + String(this.state.groupName).toLowerCase(), className: 'senior-topic-link'}, 
            this.groupIconWrapper);

        return this.groupIconLinkedWrapper;
    }
}

GroupIcon.propTypes = {
    groupName: PropTypes.string.isRequired,
};

export {GroupIcon}
