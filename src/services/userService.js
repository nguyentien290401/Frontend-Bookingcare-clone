import axios from "../axios"

const handleLogin = (userEmail, userPassword) => {
    return axios.post('api/login', { email: userEmail, password: userPassword });
}

const getAllUsers = (inputId) => {
    return axios.get(`api/get-all-users?id=${inputId}`);
}

const createNewUserService = (data) => {
    console.log('check data: ', data)
    return axios.post('api/create-new-user', data);
}

const deleteUserService = (userId) => {
    return axios.delete('/api/delete-user', { data: { id: userId } });
}

const editUserService = (inputData) => {
    return axios.put('/api/update-user', inputData);
}

const getAllCodeService = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`);
}

const getTopDoctorService = (limit) => {
    return axios.get(`/api/top-doctor?limit=${limit}`);
}

const getAllDoctorsService = () => {
    return axios.get(`/api/get-doctors`)
}

const saveDoctorDetailService = (data) => {
    return axios.post('/api/save-doctor-detail', data);
}

const getDetailDoctorService = (id) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${id}`);
}

const saveBulkCreateScheduleDoctor = (data) => {
    return axios.post(`/api/bulk-create-schedule`, data);
}

const getScheduleDoctorByDate = (doctorId, date) => {
    return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`);
}

const getExtraInforDoctorById = (doctorId) => {
    return axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`);
}

export {
    handleLogin, getAllUsers, createNewUserService, deleteUserService,
    editUserService, getAllCodeService, getTopDoctorService, getAllDoctorsService,
    saveDoctorDetailService, getDetailDoctorService, saveBulkCreateScheduleDoctor,
    getScheduleDoctorByDate, getExtraInforDoctorById
}