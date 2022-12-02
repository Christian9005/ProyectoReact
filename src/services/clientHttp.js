import axios from 'axios';

const clientHttp = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    timeout: 30000,
});

export default clientHttp;
