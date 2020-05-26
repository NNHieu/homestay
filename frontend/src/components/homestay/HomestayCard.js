import React, { Component } from 'react'

export class HomestayCard extends Component {
    render() {
        const context = this.props.context
        return (
            <div className="card">
                <img src={context.review_image} className="card-img-top" alt="..." style={{ height: "300px" }} />
                <div className="card-body">
                    <h5 className="card-title">{context.title}</h5>
                    <p className="card-text">{context.description}</p>
                </div>
                <div className="card-footer">
                    <small className="text-muted">Last updated 3 mins ago</small>
                </div>
            </div>
        )
    }
}

export default HomestayCard
