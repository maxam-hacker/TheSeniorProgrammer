import React, {Component} from 'react';
import PropTypes from 'prop-types';


class VerticalSplitter extends Component {

    constructor(props) {
        super(props);

        this.$initialX = 0;
        this.$currentX = 0;
        this.$isCaptured = false;

        this.$splitterRef = React.createRef();
        this.$leftWrapperRef = React.createRef();
        this.$rightWrapperRef = React.createRef();

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
            this.$leftWrapperRef.current.style.width = this.$leftWrapperRef.current.clientWidth + deltaX;
            this.$rightWrapperRef.current.style.width = this.$rigthWrapperRef.current.clientWidth - deltaX;
        }
    }

    render() {

        this.$splitter = React.createElement('div', { ref: this.$splitterRef, id: this.props.name, className: 'vertical-resizer', onMouseDown: this.onMouseDown.bind(this) });
        this.$leftWrapper = React.createElement('div', { ref: this.$leftWrapperRef, className: 'vertical-resizer-left' }, this.props.children[0]);
        this.$rightWrapper = React.createElement('div', { ref: this.$rightWrapperRef, className: 'vertical-resizer-right' }, this.props.children[1]);

        this.$mainWrapper = React.createElement('div', { className: 'splitter-box' }, 
            this.$leftWrapper,
            this.$splitter,
            this.$rightWrapper);

        return this.$mainWrapper;
    }
}


export { VerticalSplitter }