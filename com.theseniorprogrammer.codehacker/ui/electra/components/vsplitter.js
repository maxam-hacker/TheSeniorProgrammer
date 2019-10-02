import React, {Component} from 'react';
import PropTypes from 'prop-types';


class VerticalSplitter extends Component {

    constructor(props) {
        super(props);

        this.$initialX = 0;
        this.$currentX = 0;
        this.$isCaptured = false;

        this.$mainContainer = document.getElementById("mainContainer");
        this.$mainContainer.addEventListener("mousemove", this.onMouseMove.bind(this))
        this.$mainContainer.addEventListener("mouseup", this.onMouseUp.bind(this))
    }

    onMouseDown(event) {
        this.$isCaptured = true;
        this.$initialX = event.screenX;
    }

    onMouseUp(event) {
        this.$isCaptured = false;
    }

    onMouseMove(event) {
        if (this.$isCaptured) {
            var deltaX = event.screenX - this.$initialX;
            this.$initialX = event.screenX;
            this.$currentX = this.$currentX + deltaX;
            var command = `translate(${this.$currentX}px)`;
            document.getElementById("splitter").style.transform = command;
        }
    }

    render() {
        return React.createElement('div', { className: 'splitter-box' },
                    this.props.children[0],
                    React.createElement('div', { id: 'splitter', className: 'vertical-resizer', onMouseDown: this.onMouseDown.bind(this) }),
                    this.props.children[1]
        );
    }
}


export { VerticalSplitter }