import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link'


import { Link as RouteLink, Redirect } from 'react-router-dom'
import { LOGIN_URL, SIGNUP_URL } from '../../urls';
import { validateAuthForm } from '../../utils/validates'

//Reducers 
import { login, loadUser, signUp } from '../../reducers/auth'
import { CircularProgress, Input } from '@material-ui/core';
import AuthInput from '../general/AuthInput';

//ReCaptcha
import ReCAPTCHA from 'react-google-recaptcha'

import { loadScript } from '../../utils/collection'
import { AUTH_ERROR_HANDLE } from '../../reducers/types';
import Autosuggest from 'react-autosuggest';
import Copyright from '../layout/Copyright';


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const signupFields = ['firstName', 'lastName', 'email', 'password']
const loginFields = ['email', 'password']
const loginTexts = {
    submitLabel: "Sign in",
    checkBoxText: "Remember me",
    otherText: "Nead an account? Sign up",
    otherUrl: SIGNUP_URL
}
const signupTexts = {
    submitLabel: "Sign up",
    checkBoxText: "I want to receive inspiration, marketing promotions and updates via email.",
    otherText: "Already have an account? Sign in",
    otherUrl: LOGIN_URL
}

const initialShowErrorState = {}
const initialIsError = {}
signupFields.forEach(f => {
    initialShowErrorState[f] = { showError: false, helperText: 'This field is required' }
    initialIsError[f] = true
})

export default function MainForm(props) {

    const { signupPage, classes, onValidSubmit } = props
    const fields = signupPage ? signupFields : loginFields
    const texts = signupPage ? signupTexts : loginTexts

    // Track previous auth page
    // const refIsSignUp = React.useRef(signupPage)
    // Ref input component
    const refInputComp = React.useRef({
        password: null,
        email: null,
        firstName: null,
        lastName: null,
    })
    const [recaptcha, setRecaptcha] = useState({ load: true, expired: false, value: null })
    const handleCaptchaChange = value => {
        console.log("Captcha value:", value);
        if (value) {
            document.getElementById('iknown').style.borderStyle = "none"
        }
        setRecaptcha({ ...recaptcha, value })
    };
    //States
    // const [authInfo, setAuthInfo] = React.useState(initialAuthState)
    const [handleError, setError] = React.useState(initialShowErrorState)
    // Is error 
    const isError = React.useRef(initialIsError)
    // Reset 
    const resetValue = () => {
        console.log('reset')
        const inputComps = refInputComp.current;
        console.log(inputComps)
        setError(prev => ({
            ...initialShowErrorState,
        }))
        fields.forEach(inp => {
            console.log(inp)
            if (inp !== 'email')
                inputComps[inp].value = ''
        })
        isError.current = { ...initialIsError }
        // refIsSignUp.current = signupPage
        // console.log(refInputComp)
    }
    const checkInput = (value, name) => {
        const helperText = validateAuthForm(value, name)
        const iserr = helperText !== ''
        if (isError.current[name] !== iserr || handleError[name].helperText != helperText) {
            isError.current[name] = iserr
            setError(prev => ({
                ...prev,
                [name]: { ...prev[name], helperText }
            }))
            if (!iserr) {
                showError(name)
            }
        }
        // console.log(`is error ${iserr}`)
        return iserr
    }

    const showError = (name) => {
        setError(prev => ({
            ...prev,
            [name]: { ...prev[name], showError: isError.current[name] }
        }))
    }

    const checkValid = () => {
        // console.log('check valid')
        let valid = true
        const validFormData = {}
        fields.forEach(f => {
            const { value, name } = refInputComp.current[f]
            // console.log(value)
            // console.log(name)
            if (checkInput(value, name))
                valid = false
            else {
                validFormData[name] = value
            }
            showError(name)
        })
        if (signupPage && recaptcha.value == null) {
            valid = false
            document.getElementById('iknown').style.border = "2px solid red"
        } else {
            validFormData['captcha_value'] = recaptcha.value
        }
        if (valid) {
            onValidSubmit(validFormData, signupPage, signUpCallback)
        }
        // return { valid, validFormData, signup: signupPage }
    }

    // if (signupPage && !document.querySelector('#recaptcha-src')) {
    //     loadScript("https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit",
    //         document.querySelector('head'),
    //         'recaptcha-src',
    //         () => {
    //             recaptchaLoaded.current = true
    //             console.log('recapt loaded')
    //         }
    //     )
    // }

    //callback khi nhan response tu server
    const signUpCallback = (success, authErrors) => {
        if (!success) {
            for (var key in authErrors) {
                if (key == 'activate') {
                    alert(authErrors[key])
                    return
                }
                // skip loop if the property is from prototype
                if (!authErrors.hasOwnProperty(key)) continue;
                handleError[key].helperText = authErrors[key][0]
                handleError[key].showError = true
                isError.current[key] = true
            }
            setError(handleError)
            console.log('not success')
            console.log(handleError)
            console.log(isError)
        } else {

        }
    }

    // if (authErrors) {

    // }
    console.log('test pre main auth form')
    console.log(handleError)
    console.log(isError)
    return (
        <form className={classes.form} onSubmit={e => e.preventDefault()}>
            <Grid container spacing={2}>
                {
                    fields.map((line, index) =>
                        (
                            <Grid item xs={12} sm={line == 'firstName' || line == 'lastName' < 2 && 6} key={line}>
                                <AuthInput name={line}
                                    error={handleError[line].showError}
                                    helperText={handleError[line].helperText}
                                    checkInput={checkInput}
                                    inref={refInputComp.current}
                                // onFocus={authErrors && authErrors[line] ? () => { dispatch({ type: AUTH_ERROR_HANDLE }) } : null}
                                />
                            </Grid>
                        )
                    )
                }
                <Grid item xs={12}>
                    <FormControlLabel
                        control={<Checkbox value="allowExtraEmails" color="primary" />}
                        label={texts.checkBoxText}
                    />
                </Grid>
            </Grid>
            {/* <Input type="hidden" id="g-recaptcha-response" name="g-recaptcha-response" />
            <Input type="hidden" name="action" value="validate_captcha" /> */}
            {/* <div className="g-recaptcha" data-sitekey="6LctIv4UAAAAAFz_rnIP9ltDPGkSmHjQ_R7F4fus"></div> */}
            {
                signupPage && <div id='iknown'>
                    <ReCAPTCHA sitekey="6LctIv4UAAAAAFz_rnIP9ltDPGkSmHjQ_R7F4fus"
                        onChange={handleCaptchaChange}
                        asyncScriptOnLoad={() => { setRecaptcha({ load: true, expired: false }) }}
                    />
                </div>
            }
            <Button
                type="submit" fullWidth variant="contained" color="primary" className={classes.submit}
                onClick={checkValid}
                disabled={props.isLoading || (signupPage && !recaptcha.load)}
            >
                {props.isLoading || (signupPage && !recaptcha.load) ? <CircularProgress color="white" /> : texts.submitLabel}

            </Button>
            <Grid container justify="flex-end">
                {!signupPage && <Grid item xs> <Link href="#" variant="body2"> Forgot password?</Link> </Grid>}
                <Grid item>
                    <RouteLink onClick={resetValue} to={texts.otherUrl}>{texts.otherText}</RouteLink>
                </Grid>
            </Grid>
        </form >
    )
}



function LoadingBox() {
    return (
        <Box display="flex" justifyContent="center" m={1} p={1}>
            <CircularProgress />
        </Box>
    )
}


/**
 * Form login and signup
 * @param {*} props 
 */
export function AuthForm(props) {
    console.log('run asdfas comp')
    const classes = useStyles();
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const isSignUp = props.match.params.subpath == "signup"

    if (auth.token && !auth.isAuthenticated && !auth.isLoading) {
        console.log(`tfasd`)
        console.log(auth)
        loadUser()(dispatch)
        return (
            <div>
                <CircularProgress />
            </div>
        )
    } else if (auth.isAuthenticated) {
        // if (isSignUp) {
        //     return <Redirect to="/" />
        // }
        return <Redirect to="/" />
    }


    const onValidSubmit = (validFormData, isSignUp, callback) => {
        console.log(validFormData)
        console.log(isSignUp)
        if (!isSignUp)
            login(validFormData, callback)(dispatch)
        else
            signUp(validFormData, callback)(dispatch)
    }
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    {isSignUp ? "Sign up" : "Sign in"}
                </Typography>
                {
                    (auth.isAuthenticated && !auth.user.is_active) ?
                        <form className={classes.form}>
                            <TextField variant='outlined' label='enter your verify code'></TextField>
                        </form>
                        :
                        <MainForm classes={classes} signupPage={isSignUp} onValidSubmit={onValidSubmit} isLoading={auth.isLoading} />
                }
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container >
    );
}