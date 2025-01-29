import axios from "axios";

export default axios.create({
    baseURL: process.env.BASE_APP,
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
})