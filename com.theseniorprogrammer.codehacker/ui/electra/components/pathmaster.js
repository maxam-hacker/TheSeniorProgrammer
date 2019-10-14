import fs from 'fs';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


class PathMaster extends Component {

    constructor(props) {
        super(props);
        this.repo = [];
        this.repo.push(new FolderItem('', props.path));
    }

    handleChange(event, dir) {
        console.log(dir);
        var prefix = this.repo[this.repo.length - 1].path;
        this.repo.push(new FolderItem(prefix + '/', event.target.value));
        this.forceUpdate();
    }

    render() {

        this.callButton = React.createElement('div', {className: 'button-wrapper'});
        this.methodButton = React.createElement('div', {className: 'button-wrapper'});
        this.linkButton = React.createElement('div', {className: 'button-wrapper'});

        this.buttonsPanel = React.createElement('div', {className: 'browser-buttons-wrapper'}, 
                                                        this.callButton, 
                                                        this.methodButton, 
                                                        this.linkButton);

        return this.buttonsPanel;

        /*
        return React.createElement('form', { id: 'form' }, 
                        this.repo.map(dir => {
                                return React.createElement(FormControl, { id: 'formControl' },
                                                React.createElement(InputLabel, {}, dir.file),
                                                React.createElement(Select, { onChange: event => { this.handleChange(event, dir) } },
                                                        dir.content.map(file => {
                                                                return React.createElement(MenuItem, { value: file }, file)  
                                                        })
                                        )
                                )
                        })
        );
        */
    }
}

PathMaster.propTypes = {
        path: PropTypes.string.isRequired
};


class FolderItem {

        constructor(prefix, file) {
                this.file = file;
                this.path = prefix + file;
                this.content = [];

                var stat = fs.statSync(this.path);
                if (stat.isDirectory())
                        this.content = fs.readdirSync(this.path);
                else if (stat.isFile())
                        this.content.push(this.path);
        }

}

export {PathMaster}