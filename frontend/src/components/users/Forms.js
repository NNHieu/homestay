import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addUser } from '../../actions/users';

export class Form extends Component {
    state = {
        first_name: '',
        last_name: '',
        email: '',
        password1: '',
        password2: ''
    }

    static propTypes = {
        addUser: PropTypes.func.isRequired,
    }

    onChange = e => this.setState({ [e.target.id]: e.target.value });
    onSubmit = e => {
        e.preventDefault();
        const { first_name, last_name, email, password1, password2 } = this.state;
        if (password1 === password2) {
            const user = { first_name, last_name, email, password1 };
            this.props.addUser(user);
        } else {
            console.log('Confirms Password does not match');
        }
    }

    render() {
        return (
            <div className="card card-body mt-4 mb-4">
                <h2>Add User</h2>
                <form onSubmit={this.onSubmit} >
                    <div className="form-group">
                        <label htmlFor="first_name">First Name</label>
                        <input onChange={this.onChange} type="text" className="form-control" id="first_name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="last_name">Last Name</label>
                        <input onChange={this.onChange} type="text" className="form-control" id="last_name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input onChange={this.onChange} type="email" className="form-control" id="email" aria-describedby="emailHelp" />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password1">Password</label>
                        <input onChange={this.onChange} type="password" className="form-control" id="password1" />
                        <small id="passwordHelpBlock" className="form-text text-muted">
                            Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
                        </small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password2">Confirms Password</label>
                        <input onChange={this.onChange} type="password" className="form-control" id="password2" />
                    </div>
                    <div className="form-group form-check">
                        <input onChange={this.onChange} type="checkbox" className="form-check-input" id="checkbox" />
                        <label className="form-check-label" htmlFor="checkbox">Check me out</label>
                    </div>
                    <button type="submit" className="btn btn-primary" >Submit</button>
                </form>
            </div>
        )
    }
}

export default connect(null, { addUser })(Form);
