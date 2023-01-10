import axios from "axios"

// axios的create方法可以创建一个新的axios对象即request，
// 即创建一个自己，可以为自己进行一些配置，
// 配置完成之后可以提取一些请求的公共部分
const request = axios.create({
    baseURL: process.env.VUE_BASE_APP_API + "/",
    timeout: 5000 //request timeout
})

export default request