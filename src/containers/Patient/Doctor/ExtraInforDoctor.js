import React, { Component } from 'react';
import { connect } from "react-redux";
import './ExtraInforDoctor.scss';
import moment from 'moment';
import localization from 'moment/locale/vi';
import { getScheduleDoctorByDate } from '../../../services/userService';
import { LANGUAGES } from '../../../utils/constant';
import { FormattedMessage } from 'react-intl';

class ExtraInforDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowDetailInfor: false
        }
    }

    componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {

        }
    }

    isShowDetailInfor = (status) => {
        this.setState({
            isShowDetailInfor: status
        })
    }

    render() {
        let { isShowDetailInfor } = this.state;

        return (
            <div className='extra-infor-doctor-container'>
                <div className='content-up'>
                    <div className='text-address'>ĐỊA CHỈ KHÁM</div>
                    <div className='name-clinic'>Phòng khám Chuyên khoa Da Liễu</div>
                    <div className='detail-address'>207 - Phố Huế - Hai Bà Trưng - Hà Nội</div>
                    <hr />
                </div>
                <div className='content-down'>
                    {isShowDetailInfor === false &&
                        <div>
                            <span className='price-header'>GIÁ KHÁM: </span>
                            200.000đ &nbsp;
                            <span className='show-content' onClick={() => this.isShowDetailInfor(true)}>
                                Xem chi tiết
                            </span>
                        </div>
                    }
                    {isShowDetailInfor === true &&
                        <>
                            <div className='price-header'>GIÁ KHÁM: </div>
                            <div className='price-body'>
                                <span className='left'>Giá khám</span>
                                <span className='right'>200.000đ</span>
                            </div>
                            <span className='hide-content' onClick={() => this.isShowDetailInfor(false)}>
                                Ẩn bảng giá
                            </span>
                        </>
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ExtraInforDoctor);
