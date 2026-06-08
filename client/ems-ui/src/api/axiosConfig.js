import axios from "axios";

const createApi = (email,password) => {
    return axios.create({
        baseURL: 'http://localhost:8090/api',
        auth : {
            username: email,
            password: password
        },
        headers: {
            'Content-Type' : 'application/json'
        }
    })
}

export const publicApi = axios.create({
    baseURL: 'http://localhost:8090/api',
    headers: {
        'Content-Type': 'application/json'
    }
})

export default createApi