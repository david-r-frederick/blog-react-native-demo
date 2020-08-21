import axios from 'axios';

export default axios.create({
    baseURL: 'http://{code goes here}.ngrok.io'
});