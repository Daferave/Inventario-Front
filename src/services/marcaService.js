import { axiosInstance } from '../helpers/axios-config'

const getMarcas = () => {
    return axiosInstance.get ('marca',{
        headers: {
            'content-type': 'aplication/json'
        }
    })
}
const crearMarca = (data) => {
    const resp = axiosInstance.post('marca', data, {
        headers: {
            'Content-type': 'application/json'
        }
    });
    return resp;
}

const editarMarca = (marcaId, data) => {
    const resp = axiosInstance.put(`marca/${marcaId}`, data, {
        headers: {
            'Content-type': 'application/json'
        }
    });
    return resp;
}

export {
    getMarcas, crearMarca, editarMarca
}