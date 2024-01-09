import React, { Component } from 'react';

import { connect } from 'react-redux';
import './OutstandingDoctor.scss'

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class OutstandingDoctor extends Component {

    render() {
        const settings = {
            // dots: true,
            infinite: true,
            speed: 1000,
            slidesToShow: 4,
            slidesToScroll: 4
        };
        return (
            <div className='home-doctor'>
                <div className='doctor-container'>
                    <div className='doctor-header'>
                        <span className='doctor-header-title'>Bác sĩ nổi bật</span>
                        <div className='doctor-header-button'>Xem thêm</div>
                    </div>
                    <div className='doctor-body'>
                        <Slider {...settings}>
                            <div className='doctor-customize'>
                                <div className='outer-bg'>
                                    <div className='bg-img'></div>
                                </div>
                                <div className='doctor-description'>
                                    <div className='doctor-title'>Khám Tại Trung Tâm Tiêu hóa Doctor Check</div>
                                    <div className='doctor-specialty'>Tiêu hóa</div>
                                </div>
                            </div>
                            <div className='doctor-customize'>
                                <div className='outer-bg'>
                                    <div className='bg-img'></div>
                                </div>
                                <div className='doctor-description'>
                                    <div className='doctor-title'>Khám Tại Trung Tâm Tiêu hóa Doctor Check</div>
                                    <div className='doctor-specialty'>Tiêu hóa</div>
                                </div>
                            </div>
                            <div className='doctor-customize'>
                                <div className='outer-bg'>
                                    <div className='bg-img'></div>
                                </div>
                                <div className='doctor-description'>
                                    <div className='doctor-title'>Khám Tại Trung Tâm Tiêu hóa Doctor Check</div>
                                    <div className='doctor-specialty'>Tiêu hóa</div>
                                </div>
                            </div>
                            <div className='doctor-customize'>
                                <div className='outer-bg'>
                                    <div className='bg-img'></div>
                                </div>
                                <div className='doctor-description'>
                                    <div className='doctor-title'>Khám Tại Trung Tâm Tiêu hóa Doctor Check</div>
                                    <div className='doctor-specialty'>Tiêu hóa</div>
                                </div>
                            </div>
                            <div className='doctor-customize'>
                                <h3>5</h3>
                            </div>
                            <div className='doctor-customize'>
                                <h3>6</h3>
                            </div>
                            <div className='doctor-customize'>
                                <h3>7</h3>
                            </div>
                            <div className='doctor-customize'>
                                <h3>8</h3>
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

export default connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor);
