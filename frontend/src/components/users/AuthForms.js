import React from 'react';
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


import { Link as RouteLink } from 'react-router-dom'
import { LOGIN_URL, SIGNUP_URL } from '../../urls';
import { validateAuthForm } from '../../utils/validates'

//Reducers 
import { login, loadUser } from '../../reducers/auth'

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

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
const textFieldProps = (name, label, autoComplete, type = 'text', required = true, ) => ({
    variant: "outlined",
    name,
    id: name,
    required,
    fullWidth: true,
    label,
    type,
    autoComplete
})

const signupFields = ['email', 'password', 'firstName', 'lastName']
const loginFields = ['email', 'password']

const initialShowErrorState = {}
const initialIsError = {}
signupFields.forEach(f => {
    initialShowErrorState[f] = { showError: false, helperText: 'This field is required' }
    initialIsError[f] = true
})
/**
 * Form login and signup
 * @param {*} props 
 */
export function AuthForm(props) {
    console.log('run comp')
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()
    if (auth.token && !auth.isAuthenticated && !auth.isLoading) {
        console.log(`tfasd`)
        console.log(auth)
        loadUser()(dispatch)
    }
    // React.useEffect(() => {
    //     console.log(auth)
    // }, [auth.isAuthenticated])
    const classes = useStyles();
    const signupPage = props.match.params.subpath == "signup"
    let fields = signupPage ? signupFields : loginFields
    // Track previous auth page
    const refIsSignUp = React.useRef(signupPage)
    // Ref input component
    const refInputComp = React.useRef({
        password: null,
        email: null,
        firstName: null,
        lastName: null,
    })
    //States
    // const [authInfo, setAuthInfo] = React.useState(initialAuthState)
    const [inputError, setError] = React.useState(initialShowErrorState)
    // Is error 
    const isError = React.useRef(initialIsError)
    // Reset 
    const resetValue = () => {
        console.log('reset')
        const inputComps = refInputComp.current;
        console.log(inputComps)
        setError(prev => ({
            ...initialShowErrorState,
            email: prev.email
        }))
        fields.forEach(inp => {
            console.log(inp)
            if (inp !== 'email')
                inputComps[inp].value = ''
        })
        isError.current = { ...initialIsError, email: isError.current.email }
        refIsSignUp.current = signupPage
        // console.log(refInputComp)
    }
    const checkInput = (value, name) => {
        const helperText = validateAuthForm(value, name)
        const iserr = helperText !== ''
        if (isError.current[name] !== iserr || inputError[name].helperText != helperText) {
            isError.current[name] = iserr
            setError(prev => ({
                ...prev,
                [name]: { ...prev[name], helperText }
            }))
            if (!iserr) {
                showError(name)
            }
        }
        console.log(`is error ${iserr}`)
        return iserr
    }

    const showError = (name) => {
        // if () {
        setError(prev => ({
            ...prev,
            [name]: { ...prev[name], showError: isError.current[name] }
        }))
        console.log(inputError[name].isError)
        // }
    }

    const checkValid = () => {
        console.log('check valid')
        let valid = true
        const validFormData = {}
        fields.forEach(f => {
            const { value, name } = refInputComp.current[f]
            console.log(value)
            console.log(name)
            if (checkInput(value, name))
                valid = false
            else {
                validFormData[name] = value
            }
            showError(name)
        })
        return { valid, validFormData, signup: signupPage }
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    {signupPage ? "Sign up" : "Sign in"}
                </Typography>
                <form className={classes.form}>
                    <Grid container spacing={2}>
                        {/* {signupPage && userName} */}
                        {
                            [
                                { type: 'text', name: 'firstName', label: "First Name", autoComplete: 'fname' },
                                { type: 'text', name: 'lastName', label: "Last Name", autoComplete: 'lname' },
                                { type: "email", name: 'email', label: "Email Address", autoComplete: 'off' },
                                { type: "password", name: 'password', label: "Password", autoComplete: 'off' },
                            ].map((line, index) => {
                                if (!signupPage && index < 2)
                                    return undefined
                                return (
                                    <Grid item xs={12} sm={index < 2 && 6} key={line.name}>
                                        <TextField
                                            {...textFieldProps(line.name, line.label, line.autoComplete, line.type)}
                                            error={inputError[line.name].showError}
                                            helperText={inputError[line.name].showError ? inputError[line.name].helperText : ''}
                                            // onBlur={e => showError(e.target.name)}
                                            onChange={e => checkInput(e.target.value, e.target.name)}
                                            inputRef={input => (
                                                refInputComp.current[line.name] = input
                                            )}
                                        />
                                    </Grid>
                                )
                            })
                        }
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" color="primary" />}

                                label={
                                    signupPage ?
                                        "I want to receive inspiration, marketing promotions and updates via email."
                                        :
                                        "Remember me"
                                }
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={checkValid}
                    >
                        {signupPage ? "Sign up" : "Sign in"}
                    </Button>
                    <Grid container justify="flex-end">
                        {!signupPage && <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                        </Link>
                        </Grid>}
                        <Grid item>
                            {signupPage ?
                                <RouteLink onClick={resetValue} to={LOGIN_URL}>Already have an account? Sign in</RouteLink>
                                :
                                <RouteLink onClick={resetValue} to={SIGNUP_URL}>Nead an account? Sign up</RouteLink>
                            }
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container >
    );
}