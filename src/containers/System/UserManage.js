import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import scss from './UserManage.scss';
import { getAllUsers, createNewUserService, deleteUserService, editUserService } from '../../services/userService';
import UserModal from './UserModal';
import EditUserModal from './EditUserModal';

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModal: false,
            isOpenEditModal: false,
            userEdit: {}
        }
    }

    async componentDidMount() {
        await this.getAllUserFromReact();
    }

    getAllUserFromReact = async () => {
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

    toggleEditUserModal = () => {
        this.setState({
            isOpenEditModal: !this.state.isOpenEditModal
        })
    }

    createNewUser = async (data) => {
        try {
            let response = await createNewUserService(data);
            if (response && response.errCode !== 0) {
                alert(response.errMessage);
            } else {
                await this.getAllUserFromReact();
                this.setState({
                    isOpenModal: false
                })
            }


        } catch (e) {
            console.log(e);
        }
    }

    handeDeleteUser = async (user) => {
        try {
            let response = await deleteUserService(user.id);
            if (response && response.errCode === 0) {
                await this.getAllUserFromReact();
            } else {
                alert(response.errMessage);
            }
        } catch (e) {
            console.log(e);
        }
    }

    handleEditUser = async (user) => {
        try {
            console.log('check user from edit: ', user);
            this.setState({
                isOpenEditModal: true,
                userEdit: user
            })
        } catch (e) {
            console.log(e);
        }
    }

    doEditUser = async (user) => {
        try {
            let response = await editUserService(user);
            if (response && response.errCode === 0) {
                this.setState({
                    isOpenEditModal: false
                })
                await this.getAllUserFromReact();
            } else {
                alert(response.errMessage);
            }
        } catch (e) {
            throw e;
        }

    }

    render() {
        let arrUsers = this.state.arrUsers;

        return (
            <div className="container p-4 mx-auto">
                <div className="text-primary text-uppercase text-center title my-2">Display all users of Database</div>
                <UserModal
                    isOpen={this.state.isOpenModal}
                    toggleFromParent={this.toggleUserModal}
                    createNewUser={this.createNewUser}
                />

                {this.state.isOpenEditModal &&
                    <EditUserModal
                        isOpen={this.state.isOpenEditModal}
                        toggleFromParent={this.toggleEditUserModal}
                        currentUser={this.state.userEdit}
                        editUser={this.doEditUser}
                    />
                }
                <div className='my-2'>
                    <button
                        className='btn btn-primary px-2'
                        onClick={() => this.handleAddUserModal()}
                    ><i className="fas fa-plus"></i> Add New User</button>
                </div>

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
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
