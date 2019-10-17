import React, {Component} from 'react';
import {MagazMenu} from './menu'
import {MagazHacks} from './hacks'


class Magaz extends Component {

    render() {

        this.menu = React.createElement(MagazMenu, {});
        this.hacks = React.createElement(MagazHacks, {});
        this.magaz = React.createElement('div', {className: 'magaz'}, this.menu, this.hacks);

        return this.magaz;
    }
}

export {Magaz}
