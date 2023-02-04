import axios from "axios"
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API + "/api",
    timeout: 5000 //request timeout
})
service.interceptors.request.use(
    req => {
        let token = localStorage.getItem("token")
        if (token) {
            req.headers.token = token;
            //也可以这种写法
            // req.headers['token'] = token;
        }
        return req
    }
)
export default service