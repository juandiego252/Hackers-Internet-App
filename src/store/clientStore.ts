import { create } from 'zustand';

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
interface ClientState {
    clientData: ClienteConTipo | null;
    setClientData: (data: ClienteConTipo) => void;
    clearClientData: () => void;
}

export const useClientStore = create<ClientState>((set) => ({
    clientData: null,
    setClientData: (data) => set({ clientData: data }),
    clearClientData: () => set({ clientData: null }),
}));