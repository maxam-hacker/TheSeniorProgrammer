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
        this.repo.push(new FolderItem(props.path, this));
    }

    render() {

        return React.createElement('form', {}, 
                        this.repo.map(dir => {
                                return React.createElement(FormControl, {},
                                                React.createElement(Select, { defaultValue: dir.path, onChange: dir.handleChange.bind(this) },
                                                        dir.content.map(file => {
                                                                return React.createElement(MenuItem, { value: file }, file)  
                                                        })
                                        )
                                )
                        })
        );
    }
}

PathMaster.propTypes = {
        path: PropTypes.string.isRequired
};


class FolderItem {

        constructor(path) {
                this.path = path;
                this.content = [];

                var stat = fs.statSync(this.path);
                if (stat.isDirectory())
                        this.content = fs.readdirSync(this.path);
                else if (stat.isFile())
                        this.content.push(this.path);
        }

        handleChange(event) {
                console.log(event.target);
                var prefix = this.repo[this.repo.length - 1].path;
                this.repo.push(new FolderItem(prefix + '/' + event.target.value));
                this.forceUpdate();
        }

}

export {PathMaster}