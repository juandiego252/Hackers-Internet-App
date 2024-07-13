import axios from "axios"

const API_BASE_URL = 'https://tesis-kphi.onrender.com/api/'

export const submitClient = async (client: any) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/cliente`, client)
        return response.data;
    } catch (error) {
        throw error;
    }
}
