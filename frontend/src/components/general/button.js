import React, { Component } from 'react'


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
