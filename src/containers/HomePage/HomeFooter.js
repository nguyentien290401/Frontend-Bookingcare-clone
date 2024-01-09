import React, { Component } from 'react';

import { connect } from 'react-redux';
import './HomeFooter.scss'

class HomeFooter extends Component {

    render() {

        return (
            <div className='home-footer'>
                <p>&copy; 2024 Bookingcare Clone with Minh Tien. For more detail, press the Github</p>

                <a href='https://github.com/nguyentien290401/Frontend-Bookingcare-clone'>
                    <i className="fab fa-github"></i>
                </a>

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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
