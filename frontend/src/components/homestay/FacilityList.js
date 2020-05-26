import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { loadFacilities, toggleFacilityChecked } from '../../reducers/facilities'
import PropTypes from 'prop-types'

// import { WithContext as ReactTags } from 'react-tag-input'

// onChange={() => this.props.onChange(facility.id)} checked={facility.checked}
class FilterItem extends Component {
    state = {
        active: this.props.checked
    }

    render() {
        return (
            <button type="button" className={"btn btn-primary filter-item" + (this.state.active ? " active" : "")}
                data-toggle="button" aria-pressed="false" autocomplete="off" onClick={e => {
                    this.state.active = !this.state.active
                    this.props.onClick(this.props.index)
                }}>
                {this.props.name}
            </button>
        )
    }
}

class FacilityItem extends Component {
    render() {
        const facility = this.props.facility
        return (
            <li className="nav-item">
                <div className="row align-items-center" style={{ padding: "4px 10px 4px 30px" }} >
                    <label className="switch">
                        <input type="checkbox" name={facility.id} defaultChecked={facility.checked}
                            onChange={e => {
                                this.props.onChange(this.props.index)
                            }} />
                        <span className="slider round"></span>
                    </label>
                    <a className="nav-link" href="#">
                        {facility.name}
                    </a>
                </div>
            </li >
        )
    }
}

class FacilityToggleList extends Component {
    static propTypes = {
        flist: PropTypes.array,
        loadFacilities: PropTypes.func.isRequired,
        toggleFacilityChecked: PropTypes.func.isRequired
    }

    state = {
        flist: this.props.flist
    }

    componentDidMount() {
        console.log('mounted')
        if (this.props.flist.length == 0)
            this.props.loadFacilities()

    }

    render() {
        // const facilities = this.props.flist.map((facility, index) => <FacilityItem key={facility.id} index={index} facility={facility} onChange={this.props.toggleFacilityChecked} />)
        const facilities = this.props.flist.map((facility, index) => <FilterItem key={facility.id} index={index} name={facility.name} checked={facility.checked} onClick={this.props.toggleFacilityChecked}></FilterItem>)

        return (
            <>
                <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                    <span>Facilities</span>
                    <a className="d-flex align-items-center text-muted" href="#">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus-circle"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                    </a>
                </h6>
                {facilities}
            </>
        )
    }
}



const KeyCodes = {
    comma: 188,
    enter: 13,
};

import { WithOutContext as ReactTags } from 'react-tag-input'
// const ReactTags = require('react-tag-input').WithOutContext

class FacilityTags extends Component {

    static propTypes = {
        flist: PropTypes.array,
        loadFacilities: PropTypes.func.isRequired,
        toggleFacilityChecked: PropTypes.func.isRequired
    }


    constructor(props) {
        super(props);

        this.state = {};
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
    }

    componentDidMount() {
        console.log('mounted')
        if (this.props.flist.length == 0)
            this.props.loadFacilities()
    }

    handleDelete(i) {
        const { tags } = this.state;
        this.props.toggleFacilityChecked(tags[i].id)
    }

    handleAddition(tag) {
        this.props.toggleFacilityChecked(parseInt(tag.id))
    }

    handleDrag(tag, currPos, newPos) {
        const tags = [...this.state.tags];
        const newTags = tags.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        // re-render
        this.setState({ tags: newTags });
    }

    render() {
        const tags = []
        const suggestions = []
        for (const index in this.props.flist) {
            const f = this.props.flist[index]
            const tag = {
                id: String(index),
                text: f.name
            }
            console.log(tag)
            if (f.checked) {
                tags.push(tag)
            } else {
                suggestions.push(tag)
            }
        }

        this.state.tags = tags

        console.log(suggestions)

        return (
            <div>
                <ReactTags tags={tags}
                    suggestions={suggestions}
                    handleDelete={this.handleDelete}
                    handleAddition={this.handleAddition} />
            </div>
        )
    }
}

const mapState2Props = state => ({
    flist: state.facilities.list,
    filterList: state.facilities.filterList
})

export const FTags = connect(mapState2Props, { loadFacilities, toggleFacilityChecked })(FacilityTags)
export const FToggleList = connect(mapState2Props, { loadFacilities, toggleFacilityChecked })(FacilityToggleList)

