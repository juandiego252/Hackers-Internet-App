import axios from "axios";
const API_BASE_URL = 'https://tesis-kphi.onrender.com/api/'
export interface AdminData {
    correo: string,
    nombre: string,
    telefono: string,
    password: string,
}


export const editAdminProfile = async (id: number, data: AdminData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/admin/${id}`, data)
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const recoveryPasswordAdmin = async (correo: string) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/admin/recuperar-password`, { correo })
        return response.data;
    } catch (error) {
        throw error;
    }
}

