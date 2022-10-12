import { axiosInstance } from '../helpers/axios-config'

const getEstadosEquipos = () => {
    return axiosInstance.get ('estado-equipo',{
        headers: {
            'content-type': 'aplication/json'
        }
    })
}
const crearEstadoEquipo = (data) => {
    const resp = axiosInstance.post('estado-equipo', data, {
        headers: {
            'Content-type': 'application/json'
        }
    });
    return resp;
}

const editarEstadoEquipo = (estadoEquipoId, data) => {
    const resp = axiosInstance.put(`estado-equipo/${estadoEquipoId}`, data, {
        headers: {
            'Content-type': 'application/json'
        }
    });
    return resp;
}
const getEstadoEquipoPorId =(estadoEquipoId)=>{
    return axiosInstance.get(`estado-equipo/${estadoEquipoId}`, {
      headers: {
        'Content-type': 'application/json'
      }
    });
  }

export {
    getEstadosEquipos, crearEstadoEquipo, editarEstadoEquipo, getEstadoEquipoPorId
}