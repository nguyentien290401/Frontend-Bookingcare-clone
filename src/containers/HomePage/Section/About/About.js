import React, { Component } from 'react';

import { connect } from 'react-redux';
import './About.scss'

class About extends Component {

    render() {

        return (
            <div className="home-about">
                <div className="about-container">
                    <div className="about-header">Truyền thông nói về BookingCare</div>
                    <div className="about-body">
                        <div className="content-left">
                            <div className="video-cover">
                                <iframe
                                    title="YouTube video player"
                                    className="video-frame"
                                    src="https://www.youtube.com/embed/FyDQljKtWnI?si=A7qfEcRhiyj7Ml3I"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>
                        <div className="content-right">
                            <a className="channel-link" href='#'>
                                <div className="channel-img">
                                </div>
                            </a>
                            <a className="channel-link" href='#'>
                                <div className="channel-img"></div>
                            </a>
                            <a className="channel-link" href='#'>
                                <div className="channel-img"></div>
                            </a>
                            <a className="channel-link" href='#'>
                                <div className="channel-img"></div>
                            </a>
                            <a className="channel-link" href='#'>
                                <div className="channel-img"></div>
                            </a>
                            <a className="channel-link" href='#'>
                                <div className="channel-img"></div>
                            </a>
                            <a className="channel-link" href='#'>
                                <div className="channel-img"></div>
                            </a>
                            <a className="channel-link" href='#'>
                                <div className="channel-img"></div>
                            </a>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
