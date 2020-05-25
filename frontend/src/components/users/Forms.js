import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { signUp as authSignUp, login as authLogin } from '../../actions/auth';

class Input extends Component {

    self = undefined
    is_valid = 0
    invalidFeedback = undefined

    componentDidMount() {
        this.self = document.getElementById(this.props.id)
        this.invalidFeedback = document.getElementById(this.props.id + "-invalid-feedback")
    }

    onChange = e => {
        console.log('is checking')
        this.props.onChange(e)
        if (this.props.checkValid) {
            let msg = this.props.checkValid(this.self.value)
            console.log(msg)
            if (msg) {
                this.markInvalid(msg)
            } else {
                this.markValid()
            }
        }
    }

    onFocus = e => {
        e.target.classList.remove('is-invalid');
    }
    input_html = () => {
        if (this.props.required)
            return <input onFocus={this.onFocus} onChange={this.onChange} type={this.props.type} className="form-control" id={this.props.id} required />
        else
            return <input onFocus={this.onFocus} onChange={this.onChange} type={this.props.type} className="form-control" id={this.props.id} />
    }

    markInvalid = (msg) => {
        this.self.classList.remove('is-valid')
        this.self.classList.add('is-invalid')
        this.invalidFeedback.innerText = msg
    }

    markValid = () => {
        this.self.classList.remove('is-invalid')
        this.self.classList.add('is-valid')
        this.invalidFeedback.innerText = ""
    }



    render() {
        return (
            <div className="form-group">
                <label htmlFor={this.props.id}>{this.props.label}</label>
                {this.input_html()}
                <small id={this.props.id + "HelpBlock"} className="form-text text-muted">{this.props.help ? this.props.help : ""}</small>
                {/* <div className="valid-feedback">Looks good!</div> */}
                <div className="invalid-feedback" id={this.props.id + "-invalid-feedback"}>
                    {this.props.invalidFeedback ? this.props.invalidFeedback : ""}
                </div>
            </div >
        )
    }
}

export class SignUpForm extends Component {
    state = {
        first_name: '',
        last_name: '',
        email: '',
        password1: '',
        password2: ''
    }

    static propTypes = {
        authSignUp: PropTypes.func.isRequired,
    }

    markInvalid = inputElement => {
        inputElement.classList.remove('is-valid');
        inputElement.classList.add('is-invalid');
    }

    addUserErrorHandler = error_msg => {
        console.log('In errorHandler');
        console.log(error_msg);
        if (error_msg.email != undefined) {
            console.log('get email error');
            document.getElementById('emailError').innerText = error_msg.email;
            let inputElement = document.getElementById('email');
            this.markInvalid(inputElement);
        }
        if (error_msg.password !== undefined) {
            console.log('get email error');
            document.getElementById('emailError').innerText = error_msg.email;
            this.markInvalid(document.getElementById('password1'));
        }
    }

    onChange = e => {
        this.state[e.target.id] = e.target.value
    };

    checkConfirmPassword = ele => {
        const pw1 = this.state.password1
        const pw2 = this.state.password2
        if (pw1 === "" || pw1 !== pw2) {
            this.markInvalid(ele)
            return "Passwords do not match."
        }
        console.log('valid')
        ele.classList.remove('is-invalid');
        return ""
    }

    confirmPasswordChange = e => {
        this.onChange(e)
        this.checkConfirmPassword(e.target)
    }

    onFocus = e => {
        e.target.classList.remove('is-invalid');
    }

    onSubmit = e => {
        e.preventDefault();
        let form = document.getElementById('signup-form')
        let confirm = document.getElementById('password2')
        // if (!this.checkConfirmPassword(confirm)){
        //     confirm
        // }
        confirm.setCustomValidity(this.checkConfirmPassword(confirm))
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            const { first_name, last_name, email, password1, password2 } = this.state;
            if (password1 === password2) {
                const user = { first_name, last_name, email, password: password1 };
                this.props.authSignUp(user, this.addUserErrorHandler);
            } else {
                console.log('Confirms Password does not match');
            }
        }
        form.classList.add('was-validated');

    }

    render() {
        return (
            <div className="card card-body mt-4 mb-4">
                <h2>Add User</h2>
                <form id="signup-form" onSubmit={this.onSubmit} noValidate>

                    <Input id="first_name" label="First Name" type="text" onChange={this.onChange} required
                        invalidFeedback="This field is required"
                    />
                    <Input id="last_name" label="Last Name" type="text" onChange={this.onChange} required
                        invalidFeedback="This field is required"
                    />
                    <Input id="email" label="Email" type="email" onChange={this.onChange} required checkValid={validateEmail} />
                    <Input id="password1" label="Password" type="password" onChange={this.onChange} required
                        invalidFeedback="Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji."
                    />
                    <Input id="password2" label="Confirm Password" type="password" onChange={this.confirmPasswordChange} required
                        invalidFeedback="Empty password or Confirms Password does not match"
                    />
                    <div className="form-group form-check">
                        <input onFocus={this.onFocus} onChange={this.onChange} type="checkbox" className="form-check-input" id="checkbox" />
                        <label className="form-check-label" htmlFor="checkbox">Check me out</label>
                    </div>
                    <button type="submit" className="btn btn-primary" >Submit</button>
                </form>
            </div>
        )
    }
}


class LoginForm extends Component {
    state = {
        email: '',
        password: '',
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value })
    }

    errorHandler = error_msg => {
        console.log('In errorHandler');
        console.log(error_msg.email);
        if (error_msg.email != undefined) {
            let email = document.getElementById('email')
            email.setCustomValidity(error_msg.email[0])
        }
        // if (error_msg.password !== undefined) {
        //     console.log('get email error');
        //     document.getElementById('emailError').innerText = error_msg.email;
        //     this.markInvalid(document.getElementById('password1'));
        // }
    }

    onSubmit = e => {
        e.preventDefault();
        let form = document.getElementById('login-form')
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            const { email, password } = this.state;
            const authInfo = { email, password }
            this.props.authLogin(authInfo, this.errorHandler)

        }
        form.classList.add('was-validated');
    }


    render() {
        return (
            <div className="card card-body mt-4 mb-4">
                <h2>Login</h2>
                <form id='login-form' onSubmit={this.onSubmit} noValidate>
                    <Input id="email" label="Email" type="email" onChange={this.onChange} required checkValid={validateEmail} />
                    <Input id="password" label="Password" type="password" onChange={this.onChange} required
                        invalidFeedback="Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji."
                    />
                    <button type="submit" className="btn btn-primary" >Submit</button>
                </form>
            </div>
        )
    }
}

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(email).toLowerCase())) {
        return ""
    }
    return "Invalid email format"
}



const SignUp = connect(null, { authSignUp })(SignUpForm)
const Login = connect(null, { authLogin })(LoginForm)

export { SignUp, Login }