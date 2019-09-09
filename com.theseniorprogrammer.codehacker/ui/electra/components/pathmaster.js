import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Theraphosa} from './theraphosa'

class PathMaster extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return React.createElement('div', {},
                React.createElement('table', {},
                        React.createElement('tr', {},
                                React.createElement('label', {}, 'Call name:')
                        ),
                        React.createElement('tr', {},
                                React.createElement('input', {width: '100%'})
                        ),
                        React.createElement('tr', {},
                                React.createElement('input', {})
                        )
                )
        );
    }
}

export {PathMaster}