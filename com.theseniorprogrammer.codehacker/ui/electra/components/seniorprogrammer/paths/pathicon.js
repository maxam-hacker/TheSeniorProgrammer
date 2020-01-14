import React, {Component} from 'react';
import { Link } from 'react-router-dom'; 
import PropTypes from 'prop-types';


class PathIcon extends Component {

    constructor(props) {
        super(props);

        this.state = {
            pathName: this.props.pathName
        };
    }

    render() {

        this.pathIcon = React.createElement(
            'div', {className: 'senior-topic-icon'}, 
                this.state.pathName
        );

        this.pathLinkedIcon = React.createElement(
            Link, {to: '/codehacker/' + this.props.pathName, className: 'senior-topic-link'}, 
                this.pathIcon
        );

        return this.pathLinkedIcon;
    }
}

PathIcon.propTypes = {
    pathName: PropTypes.string.isRequired,
};

export {PathIcon}
