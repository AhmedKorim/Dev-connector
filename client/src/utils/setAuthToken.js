import axios from 'axios';
axios.defaults.baseURL ="http://localhost:5000";
const setAuthToken = token =>{
    if(token){
        // apply to every request
        axios.defaults.headers.common['Authorization'] =token;
    }else{
        // delete the toke
        delete axios.defaults.headers.common['Authorization'];

    }
}
export default setAuthToken;