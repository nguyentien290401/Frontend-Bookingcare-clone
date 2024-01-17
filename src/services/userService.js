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
export {
    handleLogin, getAllUsers, createNewUserService, deleteUserService,
    editUserService, getAllCodeService, getTopDoctorService, getAllDoctorsService,
    saveDoctorDetailService,
}