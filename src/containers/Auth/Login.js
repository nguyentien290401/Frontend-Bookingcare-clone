import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowPassword: false
        }
    }

    handeUsername = (event) => {
        this.setState({
            username: event.target.value
        });
    }

    handePassword = (event) => {
        this.setState({
            password: event.target.value
        });
    }

    handleClickLogin = () => {
        this.setState({
            username: this.state.username,
            password: this.state.password
        })

        let data = JSON.stringify(this.state);
        alert(data);
    }

    handleEye = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })

    }

    render() {
        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content row'>
                        <div className='col-12 text-login'>Login</div>
                        <div className='col-12 form-group login-input'>
                            <label>Username:</label>
                            <input type='text' className='form-control'
                                value={this.state.username}
                                onChange={(event) => this.handeUsername(event)} />
                        </div>

                        <div className='col-12 form-group login-input'>
                            <label>Password:</label>
                            <div className='custom-input-password'>
                                <input
                                    type={this.state.isShowPassword ? 'text' : 'password'}
                                    className='form-control'
                                    value={this.state.password}
                                    onChange={(event) => this.handePassword(event)} />
                                <span
                                    onClick={() => this.handleEye()}

                                ><i class={this.state.isShowPassword ? "far fa-eye" : "far fa-eye-slash"}></i></span>
                            </div>

                        </div>

                        <div className='col-12'>
                            <button className='btn-login'
                                onClick={() => this.handleClickLogin()}>Login</button>
                        </div>

                        <div className='col-12'>
                            <span className='forgot-password'>Forgot the password?</span>
                        </div>
                        <div className='col-12 text-center mt-3'>
                            <span className='text-other-login'>Or Login with: </span>
                        </div>
                        <div className='col-12 social-login'>
                            <i className="fab fa-google-plus-g google"></i>
                            <i className="fab fa-facebook-f facebook"></i>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
        adminLoginFail: () => dispatch(actions.adminLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
