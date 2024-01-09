import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeSpecialty.scss';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { FormattedMessage } from 'react-intl';

class HomeSpecialty extends Component {

    render() {
        const settings = {
            // dots: true,
            infinite: true,
            speed: 1000,
            slidesToShow: 3,
            slidesToScroll: 3
        };
        return (
            <div className='home-specialty'>
                <div className='specialty-container'>
                    <div className='specialty-header'>
                        <span className='specialty-header-title'>Chuyên khoa</span>
                        <div className='specialty-header-button'>Xem thêm</div>
                    </div>
                    <div className='specialty-body'>
                        <Slider {...settings}>
                            <div className='specialty-customize'>
                                <div className='bg-img'></div>
                                <h3 className='specialty-title'>Cơ xương khớp</h3>
                            </div>
                            <div className='specialty-customize'>
                                <div className='bg-img'></div>
                                <h3 className='specialty-title'>Cơ xương khớp</h3>
                            </div>
                            <div className='specialty-customize'>
                                <div className='bg-img'></div>
                                <h3 className='specialty-title'>Cơ xương khớp</h3>
                            </div>
                            <div className='specialty-customize'>
                                <h3>4</h3>
                            </div>
                            <div className='specialty-customize'>
                                <h3>5</h3>
                            </div>
                            <div className='specialty-customize'>
                                <h3>6</h3>
                            </div>
                            <div className='specialty-customize'>
                                <h3>7</h3>
                            </div>
                            <div className='specialty-customize'>
                                <h3>8</h3>
                            </div>
                            <div className='specialty-customize'>
                                <h3>9</h3>
                            </div>
                        </Slider>
                    </div>
                </div>
            </div>
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeSpecialty);
