import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';

import { FormattedMessage } from 'react-intl';
import logo from '../../assets/Logo.png';
import { LANGUAGES } from '../../utils/constant';
import { changeLanguageApp } from '../../store/actions/appActions';

class HomeHeader extends Component {

    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
        // fire redux event: actions

    }
    render() {
        let language = this.props.language;
        console.log('check language ', language)
        return (
            <>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <div><i className="fas fa-bars"></i></div>
                            <div className='header-logo'>
                                <img src={logo} />
                            </div>
                        </div>
                        <div className='center-content'>
                            <div className='child-content'>
                                <div><b> <FormattedMessage id="home-header.speciality" /> </b></div>
                                <div className='subs-title'><FormattedMessage id="home-header.search-doctor" /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="home-header.health-facility" /></b></div>
                                <div className='subs-title'><FormattedMessage id="home-header.select-room" /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="home-header.doctor" /></b></div>
                                <div className='subs-title'><FormattedMessage id="home-header.select-doctor" /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="home-header.fee" /></b></div>
                                <div className='subs-title'><FormattedMessage id="home-header.check-health" /></div>
                            </div>
                        </div>

                        <div className='right-content'>
                            <div className='schedule'>
                                <a><i className="fas fa-calendar-alt"></i></a>
                                <div><FormattedMessage id="home-header.schedule" /></div>
                            </div>
                            <div className='support'>
                                <a><i className="fas fa-question-circle"></i></a>
                                <div><FormattedMessage id="home-header.support" /></div>
                            </div>
                            <div className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}>
                                <span onClick={() => this.changeLanguage(LANGUAGES.VI)}>VN</span>
                            </div>
                            <div className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}>
                                <span onClick={() => this.changeLanguage(LANGUAGES.EN)}>EN</span>
                            </div>
                        </div>
                    </div>
                </div>
            </>


            // {/* <div className='home-header-search'>
            //     <i className="fas fa-search"></i>
            //     <input type='text' placeholder='Tìm chuyên khoa khám bệnh' />
            // </div> */}

        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
