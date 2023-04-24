import axios from "axios";
import { PUBLIC_API_PATH } from '$env/static/public'

const api = axios.create({
    baseURL: PUBLIC_API_PATH
})

export default api