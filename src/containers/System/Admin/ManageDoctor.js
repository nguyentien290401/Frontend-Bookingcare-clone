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
            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            nameClinic: '',
            addressClinic: '',
            note: ''
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctorsRedux();
        this.props.getRequiredDoctorInforRedux();
    }

    buildDataInputSelect = (inputData, type) => {
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            if (type === 'USERS') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.lastName} ${item.firstName}`;
                    let labelEn = `${item.firstName} ${item.lastName}`;

                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.id;
                    result.push(object);
                })
            }

            if (type === 'PRICE') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.valueVi} VND`;
                    let labelEn = `${item.valueEn} USD`;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    result.push(object);
                })
            }

            if (type === 'PAYMENT' || type === 'PROVINCE') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.valueVi}`;
                    let labelEn = `${item.valueEn}`;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    result.push(object);
                })
            }
        }
        return result;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USERS');
            this.setState({
                listDoctors: dataSelect
            })
        }

        if (prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor) {
            let { resPrice, resPayment, resProvince } = this.props.allRequiredDoctorInfor;

            let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE');
            let dataSelectPayment = this.buildDataInputSelect(resPayment, 'PAYMENT');
            let dataSelectProvince = this.buildDataInputSelect(resProvince, 'PROVINCE');

            console.log('Check data: ', dataSelectPrice, dataSelectPayment, dataSelectProvince);

            this.setState({
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince
            })
        }


        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USERS');
            let { resPrice, resPayment, resProvince } = this.props.allRequiredDoctorInfor;
            let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE');
            let dataSelectPayment = this.buildDataInputSelect(resPayment, 'PAYMENT');
            let dataSelectProvince = this.buildDataInputSelect(resProvince, 'PROVINCE');

            this.setState({
                listDoctors: dataSelect,
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince
            })
        }

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
            action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.ADD,

            selectedPrice: this.state.selectedPrice.value,
            selectedPayment: this.state.selectedPayment.value,
            selectedProvince: this.state.selectedProvince.value,
            nameClinic: this.state.nameClinic,
            addressClinic: this.state.addressClinic,
            note: this.state.note
        })
        console.log('check doctor id: ', this.state.doctorId)
    }

    handleChangeSelect = async (selectedOption) => {
        this.setState({ selectedOption });

        let res = await getDetailDoctorService(selectedOption.value);
        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown;
            let { listPayment, listPrice, listProvince } = this.state;

            let addressClinic = '', nameClinic = '', note = '',
                paymentId = '', priceId = '', provinceId = '',
                selectedPayment = '', selectedPrice = '', selectedProvince = '';

            if (res.data.Doctor_Infor) {
                addressClinic = res.data.Doctor_Infor.addressClinic;
                nameClinic = res.data.Doctor_Infor.nameClinic;
                note = res.data.Doctor_Infor.note;
                paymentId = res.data.Doctor_Infor.paymentId;
                priceId = res.data.Doctor_Infor.priceId;
                provinceId = res.data.Doctor_Infor.provinceId;

                selectedPayment = listPayment.find(item => {
                    return item && item.value === paymentId;
                })

                selectedPrice = listPrice.find(item => {
                    return item && item.value === priceId;
                })

                selectedProvince = listProvince.find(item => {
                    return item && item.value === provinceId;
                })

            }

            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true,
                addressClinic: addressClinic,
                nameClinic: nameClinic,
                note: note,
                selectedPayment: selectedPayment,
                selectedPrice: selectedPrice,
                selectedProvince: selectedProvince
            })
        } else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false,
                addressClinic: '',
                nameClinic: '',
                note: ''
            })
        }
    };

    handleChangeSelectDoctorInfor = async (selectedOption, name) => {
        let stateName = name.name;
        let stateCopy = { ...this.state };

        stateCopy[stateName] = selectedOption;

        this.setState({
            ...stateCopy
        })
        console.log('Check onchange data: ', selectedOption, stateName)
    }

    handleOnchangeText = (event, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy
        })
    }

    handleOnchangeDescription = (event) => {
        this.setState({
            description: event.target.value
        })
    }

    render() {
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
                                placeholder={<FormattedMessage id="admin.manage-doctor.choose-doctor" />}
                            />
                        </div>
                        <div className='content-right'>
                            <label>
                                <FormattedMessage id="admin.manage-doctor.introduction" />
                            </label>
                            <textarea className='form-control' rows="4"

                                onChange={(event) => this.handleOnchangeText(event, 'description')}
                                value={this.state.description} >
                            </textarea>
                        </div>

                    </div>
                    <div className='more-infor-extra row'>
                        <div className='col-4 form-group'>
                            <label>
                                <FormattedMessage id="admin.manage-doctor.price" />
                            </label>
                            <Select
                                value={this.state.selectedPrice}
                                onChange={this.handleChangeSelectDoctorInfor}
                                options={this.state.listPrice}
                                placeholder={<FormattedMessage id="admin.manage-doctor.price" />}
                                name="selectedPrice"
                            />
                        </div>
                        <div className='col-4 form-group'>
                            <label>
                                <FormattedMessage id="admin.manage-doctor.payment" />
                            </label>
                            <Select
                                value={this.state.selectedPayment}
                                onChange={this.handleChangeSelectDoctorInfor}
                                options={this.state.listPayment}
                                placeholder={<FormattedMessage id="admin.manage-doctor.payment" />}
                                name="selectedPayment"
                            />
                        </div>
                        <div className='col-4 form-group'>
                            <label>
                                <FormattedMessage id="admin.manage-doctor.province" />
                            </label>
                            <Select
                                value={this.state.selectedProvince}
                                onChange={this.handleChangeSelectDoctorInfor}
                                options={this.state.listProvince}
                                placeholder={<FormattedMessage id="admin.manage-doctor.province" />}
                                name="selectedProvince"
                            />
                        </div>
                        <div className='col-4 form-group'>
                            <label>
                                <FormattedMessage id="admin.manage-doctor.nameClinic" />
                            </label>
                            <input className='form-control'
                                onChange={(event) => this.handleOnchangeText(event, 'nameClinic')}
                                value={this.state.nameClinic}

                            />
                        </div>
                        <div className='col-4 form-group'>
                            <label>
                                <FormattedMessage id="admin.manage-doctor.addressClinic" />
                            </label>
                            <input className='form-control'
                                onChange={(event) => this.handleOnchangeText(event, 'addressClinic')}
                                value={this.state.addressClinic}

                            />
                        </div>
                        <div className='col-4 form-group'>
                            <label>
                                <FormattedMessage id="admin.manage-doctor.note" />
                            </label>
                            <input className='form-control'
                                onChange={(event) => this.handleOnchangeText(event, 'note')}
                                value={this.state.note}

                            />
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
