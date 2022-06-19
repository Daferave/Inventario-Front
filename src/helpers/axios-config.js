import axios from "axios";


const axiosInstance = axios.create ({
    baseURL: 'http://localhost:4005/'
})


export {
    axiosInstance 
}