import React, { Component } from 'react';

import { connect } from 'react-redux';
import './HomeCarousel.scss';

class HomeCarousel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 0,
            autoPlay: true,
        };
        this.timeOut = null;
    }

    componentDidMount() {
        this.handleAutoPlay();
    }

    componentWillUnmount() {
        clearTimeout(this.timeOut);
    }

    handleAutoPlay = () => {
        const { images } = this.props;
        this.timeOut = setInterval(() => {
            this.slideRight(images.length);
        }, 2500);
    };

    handleMouseEnter = () => {
        this.setState({ autoPlay: false });
        clearInterval(this.timeOut);
    };

    handleMouseLeave = () => {
        this.setState({ autoPlay: true });
        this.handleAutoPlay();
    };

    slideRight = (length) => {
        this.setState((prevState) => ({
            current: prevState.current === length - 1 ? 0 : prevState.current + 1,
        }));
    };

    slideLeft = (length) => {
        this.setState((prevState) => ({
            current: prevState.current === 0 ? length - 1 : prevState.current - 1,
        }));
    };

    handleDotClick = (index) => {
        this.setState({ current: index });
    };

    render() {
        const { current, autoPlay } = this.state;
        const { images } = this.props;

        return (
            <>
                <div
                    className="carousel"
                    onMouseEnter={this.handleMouseEnter}
                    onMouseLeave={this.handleMouseLeave}
                >
                    <div className="carousel_wrapper">
                        {images.map((image, index) => (
                            <div
                                key={index}
                                className={
                                    index === current
                                        ? 'carousel_card carousel_card-active'
                                        : 'carousel_card'
                                }
                            >
                                <img className="card_image" src={image.image} alt="Image Error" />
                                {/* <div className="card_overlay">
                                <h2 className="card_title">{image.title}</h2>
                            </div> */}
                            </div>
                        ))}
                        {/* <div className="carousel_arrow_left" onClick={() => this.slideLeft(images.length)}>
                        &lsaquo;
                    </div>
                    <div className="carousel_arrow_right" onClick={() => this.slideRight(images.length)}>
                        &rsaquo;
                    </div> */}

                    </div>
                </div>
                <div className="carousel_pagination">
                    {images.map((_, index) => (
                        <div
                            key={index}
                            className={
                                index === current
                                    ? 'pagination_dot pagination_dot-active'
                                    : 'pagination_dot'
                            }
                            onClick={() => this.handleDotClick(index)}
                        ></div>
                    ))}
                </div>
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeCarousel);
