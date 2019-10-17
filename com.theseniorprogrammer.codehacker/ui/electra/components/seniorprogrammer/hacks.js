import React, {Component} from 'react';


class MagazHacks extends Component {

    render() {

        this.springHack0 = React.createElement('div', {className: 'magaz-hacks-spring'});
        this.springHack1 = React.createElement('div', {className: 'magaz-hacks-spring'});
        this.springHack2 = React.createElement('div', {className: 'magaz-hacks-spring'});
        this.springHack3 = React.createElement('div', {className: 'magaz-hacks-spring'});
        this.springHack4 = React.createElement('div', {className: 'magaz-hacks-spring'});
        this.springHack5 = React.createElement('div', {className: 'magaz-hacks-spring'});

        this.line0 = React.createElement('div', {className: 'magaz-hacks-page-line-0'},
                                                this.springHack0,
                                                this.springHack1,
                                                this.springHack2,);

        this.pageWrapper = React.createElement('div', {className: 'magaz-pages'}, 
                                this.line0,
                                this.springHack3,
                                this.springHack4,
                                this.springHack5);

        return this.pageWrapper;
    }
}

export {MagazHacks}