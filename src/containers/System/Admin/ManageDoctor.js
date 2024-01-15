import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import './ManageDoctor.scss';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

import Select from 'react-select';

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            selectedDoctor: '',
            description: ''
        }
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }


    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })
    }

    handleSaveContentMarkdown = () => {
        console.log('Check state: ', this.state);
    }

    handleChange = (selectedDoctor) => {
        this.setState({ selectedDoctor }, () =>
            console.log(`Option selected:`, this.state.selectedDoctor)
        );
    };

    handleOnchangeDescription = (event) => {
        this.setState({
            description: event.target.value
        })
    }

    render() {
        console.log('Check props redux: ', this.props.users);
        console.log('Check state: ', this.state.userRedux);
        let arrUsers = this.state.userRedux;

        return (
            <React.Fragment>
                <div className="manage-doctor-container">
                    <div className="doctor-title">Tạo thêm thông tin Doctor</div>
                    <div className='more-infor'>
                        <div className='content-left'>
                            <label>Chọn bác sĩ</label>
                            <Select
                                defaultValue={this.state.selectedDoctor}
                                onChange={this.handleChange}
                                options={options}
                            />
                        </div>
                        <div className='content-right'>
                            <label>Description:</label>
                            <textarea className='form-control' rows="4"
                                placeholder="Enter text here..."
                                onChange={(event) => this.handleOnchangeDescription(event)}
                                value={this.state.description} >
                            </textarea>
                        </div>

                    </div>
                    <div className='doctor-editor'>
                        <MdEditor
                            style={{ height: '500px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                        />
                    </div>
                    <button
                        className='save-content-doctor'
                        onClick={() => this.handleSaveContentMarkdown()}
                    >Lưu thông tin</button>
                </div>
            </React.Fragment >

        );
    }
}

const mapStateToProps = state => {
    return {
        users: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        deleteAUserRedux: (id) => dispatch(actions.deleteAUser(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
