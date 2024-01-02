import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import scss from './UserManage.scss';
import { getAllUsers } from '../../services/userService';
import UserModal from './UserModal';

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModal: false
        }
    }

    async componentDidMount() {
        let response = await getAllUsers('ALL');

        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
            })
        }
    }

    handleAddUserModal = () => {
        this.setState({
            isOpenModal: true
        })
    }

    toggleUserModal = () => {
        this.setState({
            isOpenModal: !this.state.isOpenModal
        })
    }

    render() {
        let arrUsers = this.state.arrUsers;

        return (
            <div class="container p-4 mx-auto">
                <div class="text-primary text-uppercase text-center title my-2">Display all users of Database</div>
                <UserModal
                    isOpen={this.state.isOpenModal}
                    toggleFromParent={this.toggleUserModal}
                />
                <div className='my-2'>
                    <button
                        className='btn btn-primary px-2'
                        onClick={() => this.handleAddUserModal()}
                    ><i class="fas fa-plus"></i> Add New User</button>
                </div>

                <table id="customers">
                    <tr>
                        <th>No.</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>

                    {arrUsers && arrUsers.length > 0 && arrUsers.map((item, index) => {
                        return (
                            <tr key={item.id}>
                                <td>{index + 1}</td>
                                <td>{item.firstName}</td>
                                <td>{item.lastName}</td>
                                <td>{item.email}</td>
                                <td style={{ display: "flex", gap: "20px", justifyContent: "center" }}>
                                    <a href="#" type="button" style={{ color: "orange" }}><i class="far fa-edit"></i></a>
                                    <a href="#" type="button" style={{ color: "red" }}><i class="fas fa-trash"></i></a>
                                </td>
                            </tr>
                        )
                    })}
                </table>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
