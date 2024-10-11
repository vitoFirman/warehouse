import axios from "axios"
import { baseUrl } from "./Axios"

export const checkAbility = async (ability) => {
    try {
        const token = localStorage.getItem('token')
        const res = await axios.get(`${baseUrl}/ability/check/${ability}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return res.data.hasAbility
    } catch (error) {
        console.log(error);
        return false
    }
}