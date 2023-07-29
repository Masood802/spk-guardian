import axios from "axios";
axios.defaults.baseURL = 'http://dev.schoolpk.com/api/guardian';
axios.defaults.headers.common['Authorization'] = 'Bearer'+ localStorage.getItem('token');