import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions'

class TableManageUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userRedux: []
        }
    }

    componentDidMount() {
        this.props.fetchUserRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.users !== this.props.users) {
            this.setState({
                userRedux: this.props.users
            })
        }
    }

    handeDeleteUser = (user) => {
        this.props.deleteAUserRedux(user.id);
    }

    handleEditUser = (user) => {
        this.props.handleEditUserFromParent(user);
    }

    render() {
        console.log('Check props redux: ', this.props.users);
        console.log('Check state: ', this.state.userRedux);
        let arrUsers = this.state.userRedux;

        return (
            <div className="container my-5">
                <div className="text-primary text-uppercase text-center title my-2">Display all users of Database</div>
                <table id="customers">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {arrUsers && arrUsers.length > 0 && arrUsers.map((item, index) => {
                            return (
                                <tr key={item.id}>
                                    <td>{index + 1}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.email}</td>
                                    <td style={{ display: "flex", gap: "20px", justifyContent: "center" }}>
                                        <a><i className="far fa-edit" style={{ color: "orange" }} onClick={() => this.handleEditUser(item)} ></i></a>
                                        <a><i className="fas fa-trash" style={{ color: "red" }} onClick={() => this.handeDeleteUser(item)}></i></a>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        users: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        deleteAUserRedux: (id) => dispatch(actions.deleteAUser(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
