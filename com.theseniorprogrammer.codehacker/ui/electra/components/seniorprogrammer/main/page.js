import React, {Component} from 'react';

class MainPage extends Component {

    render() {

        const wrapperStyle = {
            color: "white",
            backgroundColor: "DodgerBlue",
            padding: "10px",
            fontFamily: "Arial"
        };

        this.header = React.createElement('div', {className: 'senior-left-menu-topic-link'}, 'What\'s new in TheSeniorProgrammer');

        this.pageWrapper = React.createElement('div', {className: 'senior-topics-page'}, 
            this.header,
        );

        return this.pageWrapper;
    }
}

export {MainPage}