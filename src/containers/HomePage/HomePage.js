import React, { Component } from 'react';

import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import HomeCarousel from './Section/HomeCarousel/HomeCarousel';
import HomeService from './Section/HomeService/HomeService';
import HomeSpecialty from './Section/HomeSpecialty/HomeSpecialty';
import HomeMedicalFacility from './Section/HomeMedicalFacility/HomeMedicalFacility';
import OutstandingDoctor from './Section/OutstandingDoctor/OutstandingDoctor';
import Handbook from './Section/HandBook/Handbook';
import About from './Section/About/About';
import HomeFooter from './HomeFooter';

import { imagesBannerList } from './Section/ImagesBanner';

class HomePage extends Component {

    render() {

        return (
            <div>
                <HomeHeader />
                <div className='section-content'>
                    <HomeCarousel images={imagesBannerList} />
                    <HomeService />
                    <HomeSpecialty />
                    <HomeMedicalFacility />
                    <OutstandingDoctor />
                    <Handbook />
                    <About />
                    <HomeFooter />
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
