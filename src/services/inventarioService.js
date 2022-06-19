import { axiosInstance } from '../helpers/axios-config';


const getInventarios = () => {
    const resp = axiosInstance.get('inventario');
    return resp;
}

const crearInventario = (data) => {
    const resp = axiosInstance.post('inventario', data, {
        headers: {
            'Content-type': 'application/json'
        }
    });
    return resp;
}

const editarInventario = (inventarioId, data) => {
    const resp = axiosInstance.put(`inventario/${inventarioId}`, data, {
        headers: {
            'Content-type': 'application/json'
        }
    });
    return resp;
}

export {
    getInventarios, crearInventario, editarInventario
}
