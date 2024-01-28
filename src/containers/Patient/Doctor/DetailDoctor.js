import React, { Component } from 'react';
import { connect } from "react-redux";

import { getDetailDoctorService } from '../../../services/userService';
import { LANGUAGES } from '../../../utils/constant';

import HomeHeader from '../../HomePage/HomeHeader';
import './DetailDoctor.scss';
import ScheduleDoctor from './ScheduleDoctor';

class DetailDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailDoctor: {}
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let res = await getDetailDoctorService(id);

            if (res && res.errCode === 0) {
                this.setState({
                    detailDoctor: res.data
                })
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    render() {
        let { detailDoctor } = this.state;
        let { language } = this.props;
        console.log('check state: ', this.state.detailDoctor);

        let nameVi = '', nameEn = '';
        if (detailDoctor && detailDoctor.positionData) {
            nameVi = `${detailDoctor.positionData.valueVi}, ${detailDoctor.lastName} ${detailDoctor.firstName} `;
            nameEn = `${detailDoctor.positionData.valueEn}, ${detailDoctor.firstName} ${detailDoctor.lastName}`;
        }

        return (
            <>
                <HomeHeader />
                <div className='detail-doctor-container'>
                    <div className='intro-doctor'>
                        <div
                            className='content-left'
                            style={{ backgroundImage: `url(${detailDoctor.image ? detailDoctor.image : ''})` }}>

                        </div>
                        <div className='content-right'>
                            <span className='doctor'>
                                {language === LANGUAGES.VI ? nameVi : nameEn}
                            </span>

                            {detailDoctor.Markdown && detailDoctor.Markdown.description &&
                                <span className='description'>
                                    {detailDoctor.Markdown.description}
                                </span>
                            }

                            <span className='location'>Hà Nội</span>
                        </div>
                    </div>

                    <div className='schedule-doctor'>
                        <div className='content-left'>
                            <ScheduleDoctor
                                doctorIdFromParent={detailDoctor && detailDoctor.id ? detailDoctor.id : -1}
                            />
                        </div>
                        <div className='content-right'></div>
                    </div>

                    <div className='detail-infor-container'>
                        {detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.contentHTML &&
                            <div
                                className='detail-infor-doctor'
                                dangerouslySetInnerHTML={{ __html: detailDoctor.Markdown.contentHTML }}
                            >

                            </div>
                        }
                    </div>

                    <div className='comment'></div>
                </div>

            </>

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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
