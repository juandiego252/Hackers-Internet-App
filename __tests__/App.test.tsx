import { loginAdmin, loginClient } from '../src/services/loginServices';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

const BASE_URL_ADMIN = 'https://tesis-kphi.onrender.com/api/admin';
const BASE_URL_CLIENT = 'https://tesis-kphi.onrender.com/api';

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

// describe('loginAdmin', () => {
//     let mock: MockAdapter;

//     beforeEach(() => {
//         mock = new MockAdapter(axios);
//     });

//     afterEach(() => {
//         mock.reset();
//     });

//     it('debe iniciar sesión como administrador y devolver datos de usuario con el tipo de usuario "admin""', async () => {
//         const mockData = { id: 1, nombre: 'Admin User', correo: 'admin@example.com' };

//         mock.onPost(`${BASE_URL_ADMIN}/login`).reply(200, mockData);

//         const result = await loginAdmin('admin@example.com', 'password');

//         expect(result).toEqual({ ...mockData, userType: 'admin' });
//     });

//     it('debería arrojar un error si falla el inicio de sesión', async () => {
//         mock.onPost(`${BASE_URL_ADMIN}/login`).reply(400);

//         await expect(loginAdmin('admin@example.com', 'wrongpassword')).rejects.toThrow(Error);
//     });
// });

// describe('loginClient', () => {
//     let mock: MockAdapter;

//     beforeEach(() => {
//         mock = new MockAdapter(axios);
//     });

//     afterEach(() => {
//         mock.reset();
//     });

//     it('debe iniciar sesión como cliente y devolver los datos del cliente con el tipo de usuario "cliente"', async () => {
//         const mockData: Cliente[] = [
//             { id: 1, nombre: 'Client User', correo: 'client@example.com', telefono: '1234567890', password: 'password' },
//         ];

//         mock.onPost(`${BASE_URL_CLIENT}/cliente/login`).reply(200);
//         mock.onGet(`${BASE_URL_CLIENT}/clientes`).reply(200, mockData);

//         const result = await loginClient('client@example.com', 'password');

//         expect(result).toEqual({ ...mockData[0], userType: 'client' });
//     });
//     it('debería arrojar un error si falla el inicio de sesión', async () => {
//         mock.onPost(`${BASE_URL_CLIENT}/cliente/login`).reply(400);

//         await expect(loginClient('client@example.com', 'wrongpassword')).rejects.toThrow(Error);
//     });
// });

import { editAdminProfile, recoveryPasswordAdmin, AdminData } from "../src/services/adminServices";
import { deleteEquipment, findEquipment, listEquipment, notifyEquipment } from '../src/services/equipmentServices';

const API_BASE_URL = 'https://tesis-kphi.onrender.com/api/';

describe("Admin Services", () => {
    let mock: MockAdapter;

    beforeEach(() => {
        mock = new MockAdapter(axios);
    });

    afterEach(() => {
        mock.reset();
    });

    // describe("editAdminProfile", () => {
    //     it("Deberia editar el perfil exitosamente", async () => {
    //         const mockId = 1;
    //         const mockData: AdminData = {
    //             correo: "admin@example.com",
    //             nombre: "Admin User",
    //             telefono: "1234567890",
    //             password: "newpassword"
    //         };
    //         const mockResponse = { message: "Perfil editado exitosamente" };

    //         mock.onPut(`${API_BASE_URL}/admin/${mockId}`).reply(200, mockResponse);

    //         const result = await editAdminProfile(mockId, mockData);

    //         expect(result).toEqual(mockResponse);
    //     });

    //     it("Deberia tirar un error", async () => {
    //         const mockId = 1;
    //         const mockData: AdminData = {
    //             correo: "admin@example.com",
    //             nombre: "Admin User",
    //             telefono: "1234567890",
    //             password: "newpassword"
    //         };

    //         mock.onPut(`${API_BASE_URL}/admin/${mockId}`).reply(400, { message: "Update failed" });

    //         await expect(editAdminProfile(mockId, mockData)).rejects.toThrow();
    //     });
    // });

    // describe("recoveryPasswordAdmin", () => {
    //     it("debería iniciar con éxito la recuperación de contraseña", async () => {
    //         const mockEmail = "admin@example.com";
    //         const mockResponse = { message: "Password recovery email sent" };

    //         mock.onPost(`${API_BASE_URL}/admin/recuperar-password`).reply(200, mockResponse);

    //         const result = await recoveryPasswordAdmin(mockEmail);

    //         expect(result).toEqual(mockResponse);
    //     });

    //     it("Deberia tirar un error", async () => {
    //         const mockEmail = "admin@example.com";

    //         mock.onPost(`${API_BASE_URL}/admin/recuperar-password`).reply(400, { message: "Recovery failed" });

    //         await expect(recoveryPasswordAdmin(mockEmail)).rejects.toThrow();
    //     });
    // });

    // describe("Servicios de Equipos", () => {
    //     let mock: MockAdapter;

    //     beforeEach(() => {
    //         mock = new MockAdapter(axios);
    //     });

    //     afterEach(() => {
    //         mock.reset();
    //     });

    //     describe("listEquipment", () => {
    //         it("debería listar los equipos correctamente", async () => {
    //             mock.onGet(`${API_BASE_URL}/equipos`).reply(200);
    //         });

    //         it("debería lanzar un error si la petición falla", async () => {
    //             mock.onGet(`${API_BASE_URL}/equipos`).reply(400, { mensaje: "Error en el servidor" });

    //             await expect(listEquipment()).rejects.toThrow('Error al obtener los equipos');
    //         });

    //         it("debería incluir el mensaje de error en la excepción", async () => {
    //             mock.onGet(`${API_BASE_URL}/equipos`).networkError();

    //             await expect(listEquipment()).rejects.toThrow('Error al obtener los equipos');
    //         });
    //     });
    // });
    // describe("Servicios de Equipos", () => {
    //     let mock: MockAdapter;
    //     let consoleLogSpy: jest.SpyInstance;

    //     beforeEach(() => {
    //         mock = new MockAdapter(axios);
    //         consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => { });
    //     });

    //     afterEach(() => {
    //         mock.reset();
    //         consoleLogSpy.mockRestore();
    //     });

    //     describe("findEquipment", () => {
    //         it("debería encontrar un equipo específico correctamente", async () => {
    //             mock.onGet(`${API_BASE_URL}/equipo/${1}`).reply(200);
    //         });

    //         it("debería lanzar un error si el equipo no se encuentra", async () => {
    //             const mockId = "999";

    //             mock.onGet(`${API_BASE_URL}/equipo/${mockId}`).reply(404, { mensaje: "Equipo no encontrado" });

    //             await expect(findEquipment(mockId)).rejects.toThrow('Error al buscar el equipo');
    //             expect(consoleLogSpy).toHaveBeenCalledWith('Error al obtener el equipo:', expect.any(Error));
    //         });

    //         it("debería lanzar un error si la petición falla", async () => {
    //             const mockId = "1";

    //             mock.onGet(`${API_BASE_URL}/equipo/${mockId}`).reply(500, { mensaje: "Error interno del servidor" });

    //             await expect(findEquipment(mockId)).rejects.toThrow('Error al buscar el equipo');
    //             expect(consoleLogSpy).toHaveBeenCalledWith('Error al obtener el equipo:', expect.any(Error));
    //         });

    //         it("debería manejar errores de red", async () => {
    //             const mockId = "1";

    //             mock.onGet(`${API_BASE_URL}/equipo/${mockId}`).networkError();

    //             await expect(findEquipment(mockId)).rejects.toThrow('Error al buscar el equipo');
    //             expect(consoleLogSpy).toHaveBeenCalledWith('Error al obtener el equipo:', expect.any(Error));
    //         });
    //     });
    // });
    // describe('notifyEquipment', () => {
    //     let mock: MockAdapter;

    //     beforeEach(() => {
    //         mock = new MockAdapter(axios);
    //     });

    //     afterEach(() => {
    //         mock.reset();
    //     });

    //     it('debe notificar el equipo y devolver la respuesta correcta', async () => {
    //         const id_equipo = '2';
    //         mock.onPost(`${API_BASE_URL}/equipos/${id_equipo}/notificar`).reply(200);
    //     });

    //     it('debería arrojar un error si falla la notificación del equipo', async () => {
    //         const id_equipo = '12345';
    //         mock.onPost(`${API_BASE_URL}/equipos/${id_equipo}/notificar`).reply(400, { message: 'Error en la notificación' });

    //         await expect(notifyEquipment(id_equipo)).rejects.toThrow('Error al notificar el equipo');
    //     });

    //     it('debería manejar errores de red', async () => {
    //         const id_equipo = '12345';
    //         mock.onPost(`${API_BASE_URL}/equipos/${id_equipo}/notificar`).networkError();

    //         await expect(notifyEquipment(id_equipo)).rejects.toThrow('Error al notificar el equipo');
    //     });
    // });
    describe('deleteEquipment', () => {
        let mock: MockAdapter;

        beforeEach(() => {
            mock = new MockAdapter(axios);
        });

        afterEach(() => {
            mock.reset();
        });

        it('debe eliminar el equipo correctamente', async () => {
            const id = '2';

            mock.onDelete(`${API_BASE_URL}/equipo/${id}`).reply(200);
        });

        it('debe lanzar un error si falla la eliminación del equipo', async () => {
            const id = '12345';

            mock.onDelete(`${API_BASE_URL}/equipo/${id}`).reply(400, { message: 'Error al eliminar' });

            await expect(deleteEquipment(id)).rejects.toThrow('Error al eliminar el equipo');
        });

        it('debe manejar errores de red', async () => {
            const id = '12345';

            mock.onDelete(`${API_BASE_URL}/equipo/${id}`).networkError();

            await expect(deleteEquipment(id)).rejects.toThrow('Error al eliminar el equipo');
        });

        it('debe manejar errores del servidor (500)', async () => {
            const id = '12345';

            mock.onDelete(`${API_BASE_URL}/equipo/${id}`).reply(500, { message: 'Error interno del servidor' });

            await expect(deleteEquipment(id)).rejects.toThrow('Error al eliminar el equipo');
        });
    });
});
