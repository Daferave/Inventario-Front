import { axiosInstance } from '../helpers/axios-config'

const getTiposEquipos = () => {
    return axiosInstance.get ('tipo-equipo',{
        headers: {
            'content-type': 'aplication/json'
        }
    })
}
const crearTipoEquipo = (data) => {
    const resp = axiosInstance.post('tipo-equipo', data, {
        headers: {
            'Content-type': 'application/json'
        }
    });
    return resp;
}

const editarTipoEquipo = (tipoEquipoId, data) => {
    const resp = axiosInstance.put(`tipo-equipo/${tipoEquipoId}`, data, {
        headers: {
            'Content-type': 'application/json'
        }
    });
    return resp;
}

export {
    getTiposEquipos, crearTipoEquipo, editarTipoEquipo
}