import axios from "axios";

const createApi = (email,password) => {
    return axios.create({
        baseURL: 'ems-worksphere-production-49c7.up.railway.app',
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
    baseURL: 'ems-worksphere-production-49c7.up.railway.app',
    headers: {
        'Content-Type': 'application/json'
    }
})

export default createApi
