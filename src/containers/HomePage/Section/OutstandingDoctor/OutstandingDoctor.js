import React, { Component } from 'react';

import { connect } from 'react-redux';
import './OutstandingDoctor.scss';
import * as actions from '../../../../store/actions';
import { LANGUAGES } from '../../../../utils/constant';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import actionTypes from '../../../../store/actions/actionTypes';
import { FormattedMessage } from 'react-intl';

class OutstandingDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctors: []
        }
    }

    handleAfterChange = () => {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
            this.setState({
                arrDoctors: this.props.topDoctorsRedux
            })
        }
    }

    componentDidMount() {
        this.props.loadTopDoctor();
    }

    render() {
        let arrDoctors = this.state.arrDoctors;
        let { language } = this.props;
        const settings = {
            // dots: true,
            infinite: false,
            speed: 1000,
            slidesToShow: 4,
            slidesToScroll: 1,
            afterChange: this.handleAfterChange
        };
        return (
            <div className='home-doctor'>
                <div className='doctor-container'>
                    <div className='doctor-header'>
                        <span className='doctor-header-title'>
                            <FormattedMessage id="home-page.outstanding-doctor" />
                        </span>
                        <div className='doctor-header-button'>
                            <FormattedMessage id="home-page.more-infor" />
                        </div>
                    </div>
                    <div className='doctor-body'>
                        <Slider {...settings}>
                            {arrDoctors && arrDoctors.length > 0
                                && arrDoctors.map((item, index) => {
                                    let imageBase64 = '';
                                    if (item.image) {
                                        imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                                    }

                                    let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName} `;
                                    let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`;

                                    return (
                                        <div className='doctor-customize' key={index}>
                                            <div className='outer-bg'>
                                                <div className='bg-img'
                                                    style={{ backgroundImage: `url(${imageBase64})` }}
                                                />
                                            </div>
                                            <div className='doctor-description'>
                                                <div className='doctor-title'>{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                                                <div className='doctor-specialty'>Tiêu hóa</div>
                                            </div>
                                        </div>
                                    )
                                })}
                        </Slider>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        isLoggedIn: state.user.isLoggedIn,
        topDoctorsRedux: state.admin.topDoctors,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctor: () => dispatch(actions.fetchTopDoctorStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor);
