import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadUser, logout } from '../../reducers/auth'
import PropTypes from 'prop-types'
import auth from '../../reducers/auth'

import { BrowserRouter as Router, Switch, Link } from 'react-router-dom'

function NavItem(props) {
    return (
        <li className="nav-item">
            <a className="nav-link disabled" href={props.href}>{props.text}</a>
        </li>
    )
}

export class Dropdown extends Component {
    items = this.props.items.map(item => <a key={item.text} className="dropdown-item" href={item.href}>{item.text}</a>)

    render() {
        return (
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {this.props.name}
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    {this.items}
                </div>
            </li>
        )
    }
}


export class Header extends Component {
    state = { schemeLight: false }
    static propTypes = {
        isAuthenticated: PropTypes.bool.isRequired,
        user: PropTypes.object
    }

    componentDidMount() {
        this.props.loadUser()
    }

    onClick = e => {
        this.setState({ schemeLight: !this.state.schemeLight })
    }

    accountForm = () => {
        console.log(this.props.isAuthenticated)
        if (this.props.isAuthenticated) {
            return (
                <form className="form-inline">
                    <button className="btn btn-outline-success my-2 my-sm-0" >{this.props.user.first_name}</button>
                    <button className="btn btn-outline-success my-2 my-sm-0" onClick={this.props.logout}>Sign Out</button>
                </form>
            )
        } else {
            return (
                <form className="form-inline" action="/front/login">
                    <Link className="nav-link my-2 my-sm-0" to={"/login"}>Log in</Link>
                    <Link className="nav-link btn btn-outline-success my-2 my-sm-0" to={"/signup"}>Sign Up</Link>
                </form>
            )
        }
    }

    render() {
        return (
            <nav className={"navbar navbar-expand-lg fixed-top " + (this.state.schemeLight ? "navbar-light bg-light" : "navbar-dark bg-dark")} >
                <a className="navbar-brand" href="#">Navbar</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link className="nav-link" to={"/"}>Home<span className="sr-only">(current)</span></Link>
                        </li>
                        <Dropdown name="Dropdown" items={[{ href: "#", text: "Menu" }]} />
                        <li>
                            <button className="btn btn-outline-success" type="buttom" onClick={this.onClick}>Change</button>
                        </li>
                    </ul>
                    {this.accountForm()}
                </div>
            </nav>
        )
    }
}

const mapState2Props = state => ({
    isAuthenticated: state.auths.isAuthenticated,
    user: state.auths.user
})

export default connect(mapState2Props, { loadUser, logout })(Header)
