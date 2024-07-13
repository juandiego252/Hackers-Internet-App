import axios from "axios"

export interface EquipmentData {
    id_cliente?: number;
    marca: string;
    modelo: string;
    estado: string;
    cliente_nombre: string;
    observaciones: string;
    tipo?: string;
}

interface EquipmentNotify {
    marca: string;
    modelo: string;
    estado: string;
    id_cliente: number;
    observaciones: string;
    tipo: string;
}


const API_BASE_URL = 'https://tesis-kphi.onrender.com/api'

export const submitEquipment = async (equipment: any) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/equipo`, equipment)
        return response.data;
    } catch (error) {
        throw error;
    }
}


export const listEquipment = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/equipos`);
        return response.data;
    } catch (error) {
        throw new Error('Error al obtener los equipos' + error)
    }
}

export const deleteEquipment = async (id: string) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/equipo/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Error al eliminar el equipo' + error)
    }
}

export const editEquipment = async (id: string, equipmentData: EquipmentData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/equipo/${id}`, equipmentData);
        console.log('Response from server:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error during editEquipment:', error);
        throw new Error('Error al editar el equipo' + error)
    }
}
// https://tesis-kphi.onrender.com/api/equipos/estado

export const findEquipment = async (id: string) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/equipo/${id}`);
        console.log('Response from server:', response.data);
        return response.data;
    } catch (error) {
        console.log('Error al obtener el equipo:', error);
        throw new Error('Error al buscar el equipo: ' + error);
    }
}
export const notifyEquipment = async (id_equipo: string) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/equipos/${id_equipo}/notificar`);
        return response.data;
    } catch (error) {
        console.log('Error al notificar el equipo:', error);
        throw new Error('Error al notificar el equipo: ' + error);
    }
}


export const listEquipmentToNotify = async () => {
    const estado = 'listo';
    try {
        const response = await axios.get(`${API_BASE_URL}/equipos/estado/${estado}`);
        return response.data;
    } catch (error) {
        throw new Error('Error al obtener los equipos' + error)
    }
}

export const editEquipmentNotify = async (id: string, equipmentData: EquipmentNotify) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/equipo/${id}`, equipmentData);
        console.log('Response from server:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error during editEquipment:', error);
        throw new Error('Error al editar el equipo' + error)
    }
}

export const findEquipmentStatus = async (status: string) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/equipos/estado/${status}`);
        console.log('Response from server:', response.data);
        return response.data;
    } catch (error) {
        console.log('Error al obtener el equipo:', error);
        throw new Error('Error al buscar el equipo: ' + error);
    }
}
export const EquipmentMaintenance = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/mantenimiento`);
        console.log('Response from server:', response.data);
        return response.data;
    } catch (error) {
        console.log('Error al obtener los mantenimientos:', error);
        throw new Error('Error al obtener los mantenimientos: ' + error);
    }
}
export const listEquipmentClient = async (id_cliente: number | undefined) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/equipos/cliente/${id_cliente}`);
        console.log('Response from server:', response.data);
        return response.data;
    } catch (error) {
        console.log('Error al obtener los equipos del cliente:', error);
        throw new Error('Error al obtener los equipos: ' + error);
    }
}
