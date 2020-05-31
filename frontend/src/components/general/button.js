import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

export class ToggleButon extends Component {
    render() {
        const facility = this.props.facility
        const aLink = this.props.name ? <a className="nav-link" href="#">{this.props.name}</a> : undefined
        return (
            <div className="row align-items-center" style={{ padding: "4px 10px 4px 30px" }} >
                <label className="switch">
                    <input type="checkbox" name={this.props.inputName} defaultChecked={this.props.checked}
                        onChange={e => {
                            this.props.onChange(this.props.index)
                        }} />
                    <span className="slider round"></span>
                </label>
                {aLink}
            </div>
        )
    }
}



// The `withStyles()` higher-order component is injecting a `classes`
// prop that is used by the `Button` component.
export const RedButton = withStyles({
    root: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 48,
        padding: '3px 3px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
    label: {
        textTransform: 'capitalize',
    },
})(Button);
