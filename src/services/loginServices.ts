import axios from "axios";

const BASE_URL_ADMIN = 'https://tesis-kphi.onrender.com/api/admin'
const BASE_URL_CLIENT = 'https://tesis-kphi.onrender.com/api'

interface Cliente {
    id: number;
    correo: string;
    nombre: string;
    telefono: string;
    password: string;
}
interface ClienteConTipo extends Cliente {
    userType: 'client';
}
export const loginAdmin = async (correo: string, password: string) => {
    try {
        const response = await axios.post(`${BASE_URL_ADMIN}/login`, {
            correo,
            password
        })
        return { ...response.data, userType: 'admin' };
    } catch (error) {
        throw new Error
    }
}
export const loginClient = async (correo: string, password: string): Promise<ClienteConTipo> => {
    try {
        // Paso 1: Autenticar al usuario
        await axios.post(`${BASE_URL_CLIENT}/cliente/login`, {
            correo,
            password
        });

        // Paso 2: Si la autenticación es exitosa, obtener los datos completos del cliente
        const clientesResponse = await axios.get<Cliente[]>(`${BASE_URL_CLIENT}/clientes`);
        const clientes = clientesResponse.data;

        // Buscar el cliente que coincida con el correo
        const clienteData = clientes.find(cliente => cliente.correo === correo);

        if (!clienteData) {
            throw new Error('No se encontraron datos del cliente');
        }

        // Retornar los datos del cliente junto con el tipo de usuario
        return { ...clienteData, userType: 'client' as const };
    } catch (error) {
        throw new Error
    }
};