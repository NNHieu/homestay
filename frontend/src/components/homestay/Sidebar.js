import React, { Component } from 'react'
import { FToggleList, FTags } from './FacilityList'
export class Sidebar extends Component {
    state = {
        filter_facilities: false
    }

    onFacilitiesClick = () => {
        this.setState({
            filter_facilities: !this.state.filter_facilities
        })
    }

    render() {
        let sidebarContent
        if (!this.state.filter_facilities) {
            sidebarContent = (
                <>
                    <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                        <span>Filter</span>
                        <a className="d-flex align-items-center text-muted" href="#">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus-circle"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                        </a>
                    </h6>
                    <ul className="nav flex-column mb-2">
                        <li className="nav-item">
                            <a className="nav-link" href="#" onClick={this.onFacilitiesClick}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-file-text"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                  Facilities
                </a>
                        </li>
                        <li className="nav-item">
                            <form className="align-items-center" style={{ padding: "20px 10px" }}>
                                <div className="form-group">
                                    <label htmlFor="formControlRange">Price</label>
                                    <input type="range" className="form-control-range" id="formControlRange" />
                                </div>
                            </form>
                        </li>
                    </ul>
                </>
            )
        } else {
            sidebarContent = (
                <FToggleList />
            )
        }
        let backButton = this.state.filter_facilities ? <button className="btn btn-sm btn-outline-secondary" onClick={this.onFacilitiesClick}>Back</button> : undefined
        return (
            <nav className="col-md-2 d-none d-md-block bg-light sidebar">
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <form className="align-items-center" style={{ padding: "20px 10px" }}>
                            <div className="form-group">
                                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Search" />
                            </div>
                        </form>
                    </li>
                </ul>
                {backButton}
                <div className="active-filters">
                    {sidebarContent}
                </div>

            </nav>
        )
    }
}

export default Sidebar
