import React, { Component } from 'react';
import { connect } from "react-redux";
import './ExtraInforDoctor.scss';
import { getExtraInforDoctorById } from '../../../services/userService';
import { LANGUAGES } from '../../../utils/constant';
import { FormattedMessage } from 'react-intl';
import NumberFormat from 'react-number-format';

class ExtraInforDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowDetailInfor: false,
            extraInfor: {}
        }
    }

    componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {

        }

        if (prevProps.doctorIdFromParent !== this.props.doctorIdFromParent) {
            let res = await getExtraInforDoctorById(this.props.doctorIdFromParent);
            if (res && res.errCode === 0) {
                this.setState({
                    extraInfor: res.data
                })
            }
        }
    }

    isShowDetailInfor = (status) => {
        this.setState({
            isShowDetailInfor: status
        })
    }

    render() {
        let { isShowDetailInfor, extraInfor } = this.state;
        let { language } = this.props;

        return (
            <div className='extra-infor-doctor-container'>
                <div className='content-up'>
                    <div className='text-address'>
                        <FormattedMessage id="patient.extra-infor-doctor.text-address" />
                    </div>
                    <div className='name-clinic'>
                        {extraInfor && extraInfor.nameClinic ? extraInfor.nameClinic : ''}
                    </div>
                    <div className='detail-address'>
                        {extraInfor && extraInfor.addressClinic ? extraInfor.addressClinic : ''}
                    </div>
                    <hr />
                </div>
                <div className='content-down'>
                    {isShowDetailInfor === false &&
                        <div>
                            <span className='price-header'>
                                <FormattedMessage id="patient.extra-infor-doctor.price-header" />
                            </span>
                            {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.VI
                                &&
                                <NumberFormat
                                    value={extraInfor.priceTypeData.valueVi}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'VND'}
                                />
                            } &nbsp;

                            {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.EN
                                &&
                                <NumberFormat
                                    value={extraInfor.priceTypeData.valueEn}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'$'}
                                />
                            } &nbsp;

                            <span className='show-content' onClick={() => this.isShowDetailInfor(true)}>
                                <FormattedMessage id="patient.extra-infor-doctor.show-content" />
                            </span>
                        </div>
                    }
                    {isShowDetailInfor === true &&
                        <>
                            <div className='price-header'>
                                <FormattedMessage id="patient.extra-infor-doctor.price-header" />
                            </div>
                            <div className='price-body'>
                                <span className='left'>
                                    <FormattedMessage id="patient.extra-infor-doctor.price" />
                                </span>
                                <span className='right'>
                                    {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.VI
                                        &&
                                        <NumberFormat
                                            value={extraInfor.priceTypeData.valueVi}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            suffix={'VND'}
                                        />
                                    } &nbsp;

                                    {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.EN
                                        &&
                                        <NumberFormat
                                            value={extraInfor.priceTypeData.valueEn}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            suffix={'$'}
                                        />
                                    } &nbsp;
                                </span>
                            </div>
                            <span className='hide-content' onClick={() => this.isShowDetailInfor(false)}>
                                <FormattedMessage id="patient.extra-infor-doctor.hide-content" />
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
