import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES, CRUD_ACTIONS } from '../../../utils/constant';
import CommonUtils from '../../../utils/CommonUtils';
import * as actions from "../../../store/actions";
import './UserRedux.scss';
import TableManageUser from './TableManageUser';

import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app


class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImgURL: '',
            isOpen: false,

            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phonenumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            avatar: '',

            action: '',
            userEditId: ''
        }
    }

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // render => didUpdate
        // hiện tại (this)  và  quá khứ (previous)
        // []       [3]
        // [3]      [3]
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGenders = this.props.genderRedux;
            this.setState({
                genderArr: arrGenders,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : ''
            })
        }
        if (prevProps.positionRedux !== this.props.positionRedux) {
            let arrPositions = this.props.positionRedux;
            this.setState({
                positionArr: arrPositions,
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : ''
            })
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            let arrRoles = this.props.roleRedux;
            this.setState({
                roleArr: arrRoles,
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : ''
            })
        }
        if (prevProps.users !== this.props.users) {
            let arrGenders = this.props.genderRedux;
            let arrPositions = this.props.positionRedux;
            let arrRoles = this.props.roleRedux;
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phonenumber: '',
                address: '',
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : '',
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : '',
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : '',
                avatar: '',
                previewImgURL: '',
                action: CRUD_ACTIONS.CREATE
            })
        }

    }

    handleOnchangeImage = async (event) => {

        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            // console.log('Base64 image: ', getBase64);
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgURL: objectUrl,
                avatar: base64
            })
        }
    }

    openReviewImgURL = () => {
        if (!this.state.previewImgURL)
            return;
        this.setState({
            isOpen: true
        })
    }

    handleSaveUser = () => {
        let isVaid = this.checkValidInput();
        if (isVaid === false)
            return;

        let { action } = this.state;
        if (action === CRUD_ACTIONS.CREATE) {
            // Fire redux create user
            this.props.createNewUser({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phonenumber: this.state.phonenumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                avatar: this.state.avatar
            })
        }

        if (action === CRUD_ACTIONS.EDIT) {
            // Fire redux edit user
            this.props.editAUserRedux({
                id: this.state.userEditId,
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phonenumber: this.state.phonenumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                avatar: this.state.avatar
            })
        }

        this.props.fetchUserRedux();
    }

    checkValidInput = () => {
        let isValid = true;
        let arrCheck = ['email', 'password', 'firstName', 'lastName', 'phonenumber', 'address'];
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert(`The input ${arrCheck[i]} is required !`);
                break;
            }
        }

        return isValid;
    }

    onChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;

        this.setState({
            ...copyState
        })
    }

    handleEditUserFromParent = (user) => {
        let imageBase64 = '';
        if (user.image) {
            const imageBuffer = Buffer.from(JSON.stringify(user.image));
            imageBase64 = new Buffer(user.image, 'base64').toString('binary');
        }

        this.setState({
            email: user.email,
            password: "HARDCODE",
            firstName: user.firstName,
            lastName: user.lastName,
            address: user.address,
            phonenumber: user.phonenumber,
            gender: user.gender,
            role: user.roleId,
            position: user.positionId,
            avatar: '',
            previewImgURL: imageBase64,
            action: CRUD_ACTIONS.EDIT,
            userEditId: user.id
        })
    }

    render() {
        let genders = this.state.genderArr;  // genders = {}
        let positions = this.state.positionArr;
        let roles = this.state.roleArr;

        let { language, genderRedux, isLoadingGenderRedux } = this.props;
        let { email, password, firstName, lastName, phonenumber,
            address, gender, position, role, avatar
        } = this.state;
        // console.log('Check state react: ', this.state)

        return (
            <div className='user-redux-container'>
                <div className="title" >Learn React Redux </div>
                <div>{isLoadingGenderRedux === true ? 'Loading gender' : ''}</div>
                <div className='user-redux-body'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12 my-3'>
                                <FormattedMessage id="manage-user.add" />
                            </div>
                            <div className='col-3'>
                                <label>
                                    <FormattedMessage id="manage-user.email" />
                                </label>
                                <input className='form-control' type='email'
                                    value={email}
                                    onChange={(event) => this.onChangeInput(event, 'email')}
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                />
                            </div>
                            <div className='col-3'>
                                <label>
                                    <FormattedMessage id="manage-user.password" />
                                </label>
                                <input className='form-control' type='password'
                                    value={password}
                                    onChange={(event) => this.onChangeInput(event, 'password')}
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                />
                            </div>
                            <div className='col-3'>
                                <label>
                                    <FormattedMessage id="manage-user.first-name" />
                                </label>
                                <input className='form-control' type='text'
                                    value={firstName}
                                    onChange={(event) => this.onChangeInput(event, 'firstName')} />
                            </div>
                            <div className='col-3'>
                                <label>
                                    <FormattedMessage id="manage-user.last-name" />
                                </label>
                                <input className='form-control' type='text'
                                    value={lastName}
                                    onChange={(event) => this.onChangeInput(event, 'lastName')} />
                            </div>
                            <div className='col-3'>
                                <label>
                                    <FormattedMessage id="manage-user.phone-number" />
                                </label>
                                <input className='form-control' type='text'
                                    value={phonenumber}
                                    onChange={(event) => this.onChangeInput(event, 'phonenumber')} />
                            </div>
                            <div className='col-9'>
                                <label>
                                    <FormattedMessage id="manage-user.address" />
                                </label>
                                <input className='form-control' type='text'
                                    value={address}
                                    onChange={(event) => this.onChangeInput(event, 'address')} />
                            </div>
                            <div className='col-3'>
                                <label>
                                    <FormattedMessage id="manage-user.gender" />
                                </label>
                                <select className="form-control"
                                    value={gender}
                                    onChange={(event) => this.onChangeInput(event, 'gender')}>
                                    {genders && genders.length > 0 &&
                                        genders.map((item, index) => {
                                            return (
                                                <option key={index} value={item.keyMap}>
                                                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                </option>
                                            )
                                        })}
                                </select>
                            </div>
                            <div className='col-3'>
                                <label>
                                    <FormattedMessage id="manage-user.position" />
                                </label>
                                <select className="form-control"
                                    value={position}
                                    onChange={(event) => this.onChangeInput(event, 'position')}>
                                    {positions && positions.length > 0 &&
                                        positions.map((item, index) => {
                                            return (
                                                <option key={index} value={item.keyMap}>
                                                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                </option>
                                            )
                                        })}
                                </select>
                            </div>
                            <div className='col-3'>
                                <label>
                                    <FormattedMessage id="manage-user.role" />
                                </label>
                                <select className="form-control"
                                    value={role}
                                    onChange={(event) => this.onChangeInput(event, 'role')}>
                                    {roles && roles.length > 0 &&
                                        roles.map((item, index) => {
                                            return (
                                                <option key={index} value={item.keyMap}>
                                                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                </option>
                                            )
                                        })}
                                </select>
                            </div>
                            <div className='col-3'>
                                <label>
                                    <FormattedMessage id="manage-user.image" />
                                </label>
                                <div className='preview-img-container'>
                                    <input type='file' id='choose-file'
                                        onChange={(event) => this.handleOnchangeImage(event)} hidden />
                                    <label className='label-upload' htmlFor='choose-file'>Choose file <i className="fas fa-upload"></i></label>
                                    <div
                                        className='preview-img'
                                        style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
                                        onClick={() => this.openReviewImgURL()}
                                    ></div>
                                </div>
                            </div>
                            <div className='col-12'>
                                <button
                                    className={this.state.action === CRUD_ACTIONS.EDIT ? 'btn btn-warning' : 'btn btn-primary mt-3'}
                                    onClick={() => this.handleSaveUser()}
                                >
                                    {this.state.action === CRUD_ACTIONS.EDIT ?
                                        <FormattedMessage id="manage-user.edit" />
                                        :
                                        <FormattedMessage id="manage-user.save" />
                                    }
                                </button>
                            </div>

                            <TableManageUser
                                handleEditUserFromParent={this.handleEditUserFromParent}
                                action={this.state.action}
                            />

                        </div>
                    </div>
                </div>

                {this.state.isOpen === true &&
                    <Lightbox
                        mainSrc={this.state.previewImgURL}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                }
            </div >

        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        positionRedux: state.admin.positions,
        roleRedux: state.admin.roles,
        isLoadingGenderRedux: state.admin.isLoadingGender,
        users: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        editAUserRedux: (data) => dispatch(actions.editAUser(data))
        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
