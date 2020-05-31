const emailHeplText = "Please input a valid email. Eg: hnhomestay.2208@gmail.com"
export function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isValid = re.test(String(email).toLowerCase())
    return isValid ? '' : emailHeplText;
}

const passwordHelpText = 'Minimum eight characters, at least one letter, one number and one special character'
export function validatePassword(password) {
    const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    const isValid = re.test(String(password).toLowerCase())
    return isValid ? '' : passwordHelpText;
}

const requiredField = 'This field is required'
export function validateAuthForm(s, type) {
    if (s.length === 0) return requiredField
    switch (type) {
        case 'password':
            return validatePassword(s)
        case 'email':
            return validateEmail(s)
        case 'firstName':
        case 'lastName':
            return ''
        default:
            return undefined
    }
}