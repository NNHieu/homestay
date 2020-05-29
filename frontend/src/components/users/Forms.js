import React, { Fragment } from 'react';
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

import { Route } from 'react-router-dom';

import { Link as RouteLink } from 'react-router-dom'
import { LOGIN_URL, SIGNUP_URL } from '../../urls';
import { validateEmail, validatePassword } from '../../utils/validates'

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

export function AuthForm(props) {
    const classes = useStyles();
    const [emailError, setEmailError] = React.useState({ isError: false, helperText: '' })
    const [passwordError, setPasswordError] = React.useState({
        isError: false,
        helperText: ''
    })
    const passwordHelpText = 'Minimum eight characters, at least one letter, one number and one special character'
    const signUpComponents = (
        <Fragment>
            <Grid item xs={12} sm={6}>
                <TextField
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="lname"
                />
            </Grid>
        </Fragment>)

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    {props.match.params.subpath == "signup" ? "Sign up" : "Sign in"}
                </Typography>
                <form className={classes.form}>
                    <Grid container spacing={2}>
                        {props.match.params.subpath == "signup" && signUpComponents}
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                type="email"
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="off"
                                error={emailError.isError}
                                helperText={emailError.helperText}
                                onBlur={
                                    e => {
                                        if (!validateEmail(e.target.value)) {
                                            const isError = true
                                            let helperText = 'This field is Required'
                                            if (e.target.value !== "")
                                                helperText = 'Invalid email'
                                            setEmailError({ isError, helperText })
                                        }
                                        else
                                            setEmailError({ isError: false, helperText: "" })
                                    }
                                }
                                onChange={
                                    e => {
                                        if (validateEmail(e.target.value))
                                            setEmailError({ isError: false, helperText: "" })
                                    }
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="off"
                                error={passwordError.isError}
                                helperText={passwordError.helperText}
                                onBlur={
                                    e => {
                                        console.log(passwordError)
                                        const isError = !validatePassword(e.target.value)
                                        setPasswordError({ isError, helperText: isError ? passwordHelpText : '' })
                                    }
                                }
                                onChange={
                                    e => {
                                        if (validatePassword(e.target.value))
                                            setPasswordError({ isError: false, helperText: "" })
                                    }
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" color="primary" />}
                                label="I want to receive inspiration, marketing promotions and updates via email."
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            {props.match.params.subpath == "signup" ?
                                <RouteLink to={LOGIN_URL}>Already have an account? Sign in</RouteLink>
                                :
                                <RouteLink to={SIGNUP_URL}>Nead an account? Sign up</RouteLink>
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