import React, { Component, Fragment } from 'react'
import { withAlert } from 'react-alert';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

export class Alerts extends Component {
    static propTypes = {
        error_code: PropTypes.number,
        msg: PropTypes.object.isRequired
    }

    componentDidMount() {
        this.props.alert.show('It Work');
    }

    componentDidUpdate() {
        const { error_code, alert, msg } = this.props;
        for (let k in msg) {
            this.props.alert.show(`${k}: ${msg[k]}`);
        }
    }

    render() {
        return <Fragment />;
    }
}

const mapState2Props = state => ({
    error_code: state.errors.error_code,
    msg: state.errors.msg
})

export default connect(mapState2Props)(withAlert()(Alerts));

