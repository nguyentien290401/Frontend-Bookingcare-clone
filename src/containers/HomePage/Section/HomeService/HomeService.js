import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './HomeService.scss';

class HomeService extends Component {

    render() {
        return (
            <div className='service-container'>
                <div className='service-wrapper'>
                    <div className='service-title'>
                        <FormattedMessage id="home-service.full-service" />
                    </div>
                    <div className='service-content'>

                        <div className='service-item'>
                            <div className='service-item-image-cover'>
                                <div className='service-item-image'>
                                    <i className="far fa-hospital"></i>
                                </div>
                            </div>
                            <span className='service-item-title'>
                                <FormattedMessage id="home-service.specialty" />
                            </span>
                        </div>
                        <div className='service-item'>
                            <div className='service-item-image-cover'>
                                <div className='service-item-image'>
                                    <i className="fas fa-mobile-alt"></i>
                                </div>
                            </div>
                            <span className='service-item-title'>
                                <FormattedMessage id="home-service.remote" />
                            </span>
                        </div>
                        <div className='service-item'>
                            <div className='service-item-image-cover'>
                                <div className='service-item-image'>
                                    <i className="fas fa-notes-medical"></i>
                                </div>
                            </div>
                            <span className='service-item-title'>
                                <FormattedMessage id="home-service.general" />
                            </span>
                        </div>
                        <div className='service-item'>
                            <div className='service-item-image-cover'>
                                <div className='service-item-image'>
                                    <i className="fas fa-vial"></i>
                                </div>
                            </div>
                            <span className='service-item-title'>
                                <FormattedMessage id="home-service.medical" />
                            </span>
                        </div>
                        <div className='service-item'>
                            <div className='service-item-image-cover'>
                                <div className='service-item-image'>
                                    <i className="fas fa-user-md"></i>
                                </div>
                            </div>
                            <span className='service-item-title'>
                                <FormattedMessage id="home-service.mental" />
                            </span>
                        </div>
                        <div className='service-item'>
                            <div className='service-item-image-cover'>
                                <div className='service-item-image'>
                                    <i className="fab fa-affiliatetheme"></i>
                                </div>
                            </div>
                            <span className='service-item-title'>
                                <FormattedMessage id="home-service.dental" />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeService);
