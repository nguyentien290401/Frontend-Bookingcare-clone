import React, { Component } from 'react';

import { connect } from 'react-redux';
import './Handbook.scss'

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class HandBook extends Component {

    constructor(props) {
        super(props);
        this.slider = React.createRef();
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
    }

    next() {
        if (this.slider.current) {
            this.slider.current.slickNext();
        }
    }

    previous() {
        if (this.slider.current) {
            this.slider.current.slickPrev();
        }
    }

    render() {
        const settings = {
            // dots: true,
            infinite: true,
            speed: 1000,
            slidesToShow: 4,
            slidesToScroll: 4
        };
        return (
            <div className='home-handbook'>
                <div className='handbook-container'>
                    <div className='handbook-header'>
                        <span className='handbook-header-title'>Cẩm nang</span>
                        <div className='handbook-header-button'>Xem thêm</div>
                    </div>
                    <div className='handbook-body'>
                        <Slider ref={this.slider} {...settings}>
                            <div className='handbook-customize' key={1}>
                                <div className='bg-img'></div>
                                <div className='handbook-title-cover'>
                                    <h3 className='handbook-title'>Ultherapy là gì? Địa chỉ thực hiện Ultherapy uy tín tại TPHCM?</h3>
                                </div>
                            </div>
                            <div className='handbook-customize' key={2}>
                                <div className='bg-img'></div>
                                <div className='handbook-title-cover'>
                                    <h3 className='handbook-title'>Ultherapy là gì? Địa chỉ thực hiện Ultherapy uy tín tại TPHCM?</h3>
                                </div>
                            </div>
                            <div className='handbook-customize' key={3}>
                                <div className='bg-img'></div>
                                <div className='handbook-title-cover'>
                                    <h3 className='handbook-title'>Ultherapy là gì? Địa chỉ thực hiện Ultherapy uy tín tại TPHCM?</h3>
                                </div>
                            </div>
                            <div className='handbook-customize' key={4}>
                                <div className='bg-img'></div>
                                <div className='handbook-title-cover'>
                                    <h3 className='handbook-title'>Ultherapy là gì? Địa chỉ thực hiện Ultherapy uy tín tại TPHCM?</h3>
                                </div>
                            </div>
                            <div className='handbook-customize' key={5}>
                                <h3>5</h3>
                            </div>
                            <div className='handbook-customize' key={6}>
                                <h3>6</h3>
                            </div>
                            <div className='handbook-customize' key={7}>
                                <h3>7</h3>
                            </div>
                            <div className='handbook-customize' key={8}>
                                <h3>8</h3>
                            </div>
                        </Slider>

                        <div className='handbook-footer'>
                            <div className='button-slide'>
                                <div className="button-left" onClick={this.previous}>
                                    <i className="fas fa-arrow-left"></i>
                                </div>
                                <div className="button-right" onClick={this.next}>
                                    <i className="fas fa-arrow-right"></i>
                                </div>
                            </div>
                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
