import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import './ManageDoctor.scss';
import { LANGUAGES, CRUD_ACTIONS } from '../../../utils';
import { getDetailDoctorService } from '../../../services/userService';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

import Select from 'react-select';
import { has, result } from 'lodash';
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // Save to markdown table
            contentMarkdown: '',
            contentHTML: '',
            selectedOption: '',
            description: '',
            listDoctors: [],
            hasOldData: false,

            // Save to doctor-infor table
            listPrice: [],
            listPayment: [],
            listProvince: [],
            selectPrice: '',
            selectPayment: '',
            selectProvince: '',
            nameClinic: '',
            addressClinic: '',
            note: ''
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctorsRedux();
        this.props.getRequiredDoctorInforRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USERS');
            this.setState({
                listDoctors: dataSelect
            })
        }

        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
            this.setState({
                listDoctors: dataSelect
            })
        }

        if (prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor) {
            let { resPrice, resPayment, resProvince } = this.props.allRequiredDoctorInfor;

            let dataSelectPrice = this.buildDataInputSelect(resPrice);
            let dataSelectPayment = this.buildDataInputSelect(resPayment);
            let dataSelectProvince = this.buildDataInputSelect(resProvince);

            console.log('Check data: ', dataSelectPrice, dataSelectPayment, dataSelectProvince);

            this.setState({
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince
            })
        }
    }

    buildDataInputSelect = (inputData, type) => {
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                let labelVi = type === 'USERS' ? `${item.lastName} ${item.firstName}` : item.valueVi;
                let labelEn = type === 'USERS' ? `${item.firstName} ${item.lastName}` : item.valueEn;

                object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                object.value = item.id;
                result.push(object);
            })
        }
        return result;
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })
    }

    handleSaveContentMarkdown = () => {
        // hasOldData will check when the contentMarkdown of one id have data or not
        let { hasOldData } = this.state;
        this.props.saveDoctorDetailRedux({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedOption.value,
            action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.ADD
        })
        console.log('check doctor id: ', this.state.doctorId)
    }

    handleChangeSelect = async (selectedOption) => {
        this.setState({ selectedOption });

        let res = await getDetailDoctorService(selectedOption.value);
        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown;
            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true
            })
        } else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false
            })
        }
    };

    handleOnchangeDescription = (event) => {
        this.setState({
            description: event.target.value
        })
    }

    render() {
        let arrUsers = this.state.userRedux;
        let { hasOldData } = this.state;

        return (
            <React.Fragment>
                <div className="manage-doctor-container">
                    <div className="doctor-title">
                        <FormattedMessage id="admin.manage-doctor.title" />
                    </div>
                    <div className='more-infor'>
                        <div className='content-left'>
                            <label>
                                <FormattedMessage id="admin.manage-doctor.choose-doctor" />
                            </label>
                            <Select
                                defaultValue={this.state.selectedOption}
                                onChange={this.handleChangeSelect}
                                options={this.state.listDoctors}
                                placeholder={'Chọn bác sĩ'}
                            />
                        </div>
                        <div className='content-right'>
                            <label>
                                <FormattedMessage id="admin.manage-doctor.introduction" />
                            </label>
                            <textarea className='form-control' rows="4"
                                placeholder="Enter text here..."
                                onChange={(event) => this.handleOnchangeDescription(event)}
                                value={this.state.description} >
                            </textarea>
                        </div>

                    </div>
                    <div className='more-infor-extra row'>
                        <div className='col-4 form-group'>
                            <label>Chọn giá</label>
                            <Select
                                // defaultValue={this.state.selectedOption}
                                onChange={this.handleChangeSelect}
                                options={this.state.listPrice}
                                placeholder={'Chọn bác sĩ'}
                            />
                        </div>
                        <div className='col-4 form-group'>
                            <label>Chọn phương thức thanh toán</label>
                            <Select
                                // defaultValue={this.state.selectedOption}
                                onChange={this.handleChangeSelect}
                                options={this.state.listPayment}
                                placeholder={'Chọn phương thức thanh toán'}
                            />
                        </div>
                        <div className='col-4 form-group'>
                            <label>Chọn tỉnh thành</label>
                            <Select
                                // defaultValue={this.state.selectedOption}
                                onChange={this.handleChangeSelect}
                                options={this.state.listProvince}
                                placeholder={'Chọn tỉnh thành'}
                            />
                        </div>
                        <div className='col-4 form-group'>
                            <label>Tên phòng khám</label>
                            <input className='form-control' />
                        </div>
                        <div className='col-4 form-group'>
                            <label>Địa chỉ phòng khám</label>
                            <input className='form-control' />
                        </div>
                        <div className='col-4 form-group'>
                            <label>Ghi chú</label>
                            <input className='form-control' />
                        </div>
                    </div>

                    <div className='doctor-editor'>
                        <MdEditor
                            style={{ height: '500px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.contentMarkdown}
                        />
                    </div>
                    <button
                        onClick={() => this.handleSaveContentMarkdown()}
                        className={hasOldData === true ? 'save-content-doctor' : 'create-content-doctor'}
                    >
                        {hasOldData === true ?
                            <span>
                                <FormattedMessage id="admin.manage-doctor.save-infor" />
                            </span>
                            :
                            <span>
                                <FormattedMessage id="admin.manage-doctor.create-infor" />
                            </span>
                        }
                    </button>
                </div>
            </React.Fragment >

        );
    }
}

const mapStateToProps = state => {
    return {
        allDoctors: state.admin.allDoctors,
        language: state.app.language,
        allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctorsRedux: () => dispatch(actions.fetchAllDoctorsStart()),
        getRequiredDoctorInforRedux: () => dispatch(actions.getRequiredDoctorInforStart()),
        saveDoctorDetailRedux: (data) => dispatch(actions.saveDetailDoctorsStart(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
