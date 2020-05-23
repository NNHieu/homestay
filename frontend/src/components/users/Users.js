import React, { Component, Fragment } from 'react'
import { connect } from "react-redux";
import Proptypes from 'prop-types';
import { getUsers, deleteUser } from '../../actions/users';

export class Users extends Component {
    static propTypes = {
        users: Proptypes.array.isRequired
    };

    componentDidMount() {
        this.props.getUsers();
    }

    render() {
        return (
            <Fragment>
                <h1>Users List</h1>
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Is Active</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.users.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.first_name}</td>
                                <td>{user.last_name}</td>
                                <td>{user.email}</td>
                                <td>{String(user.is_active)}</td>
                                <td>
                                    <button className="btn btn-danger btn-sm" onClick={this.props.deleteUser.bind(this, user.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Fragment>
        )
    }
};

const mapState2Props = state => ({
    users: state.users.users
});

export default connect(mapState2Props, { getUsers, deleteUser })(Users);
