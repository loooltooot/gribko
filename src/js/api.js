import axios from "axios";

const api = axios.create({
    baseURL: "http://gribkobackend/api"
})

export default api