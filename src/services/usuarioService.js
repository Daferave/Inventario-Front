import { axiosInstance } from '../helpers/axios-config'

const getUsuarios = () => {
    return axiosInstance.get ('usuario',{
        headers: {
            'content-type': 'aplication/json'
        }
    })
}
const crearUsuario = (data) => {
    const resp = axiosInstance.post('usuario', data, {
        headers: {
            'Content-type': 'application/json'
        }
    });
    return resp;
}

const editarUsuario = (usuarioId, data) => {
    const resp = axiosInstance.put(`usuario/${usuarioId}`, data, {
        headers: {
            'Content-type': 'application/json'
        }
    });
    return resp;
}

export {
    getUsuarios, crearUsuario, editarUsuario
}