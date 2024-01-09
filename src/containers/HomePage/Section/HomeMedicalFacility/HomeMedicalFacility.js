import React, { Component } from 'react';

import { connect } from 'react-redux';
import './HomeMedicalFacility.scss';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class HomePage extends Component {

    render() {
        const settings = {
            // dots: true,
            infinite: true,
            speed: 1000,
            slidesToShow: 3,
            slidesToScroll: 3
        };
        return (
            <div className='home-medical'>
                <div className='medical-container'>
                    <div className='medical-header'>
                        <span className='medical-header-title'>Cơ sở y tế</span>
                        <div className='medical-header-button'>Xem thêm</div>
                    </div>
                    <div className='medical-body'>
                        <Slider {...settings}>
                            <div className='medical-customize'>
                                <div className='bg-img'></div>
                                <h3 className='medical-title'>Doctor Check - Tầm Soát Bệnh Để Sống Thọ Hơn</h3>
                            </div>
                            <div className='medical-customize'>
                                <div className='bg-img'></div>
                                <h3 className='medical-title'>Cơ xương khớp</h3>
                            </div>
                            <div className='medical-customize'>
                                <div className='bg-img'></div>
                                <h3 className='medical-title'>Cơ xương khớp</h3>
                            </div>
                            <div className='medical-customize'>
                                <h3>4</h3>
                            </div>
                            <div className='medical-customize'>
                                <h3>5</h3>
                            </div>
                            <div className='medical-customize'>
                                <h3>6</h3>
                            </div>
                            <div className='medical-customize'>
                                <h3>7</h3>
                            </div>
                            <div className='medical-customize'>
                                <h3>8</h3>
                            </div>
                            <div className='medical-customize'>
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
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
