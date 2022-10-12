import React, {useState}from 'react'
import Swal from 'sweetalert2';
import { crearEstadoEquipo } from '../../services/estadoEquipoService';

export const EstadoNew = ({handleOpenModal, listarEstadosEquipo}) => {

   
    const[valores,setValores]=useState({});

    const {nombre='', estado=''}=valores;
 
    const handleOnChange=({target})=>{
        const{name,value}=target;
        setValores({...valores,[name]:value}) 
    }

    const handleOnSubmit = async (e)=>{
        e.preventDefault();
        const estadoEquipo={
            nombre, estado
            }
        console.log(estadoEquipo);
        try {
            Swal.fire({
                allowOutsideClick:false,
                text: 'CARGANDO.'
            });
            Swal.showLoading();
            const{data}=await crearEstadoEquipo(estadoEquipo);
            console.log(data);
            Swal.close();
            handleOpenModal();
            listarEstadosEquipo();
        } catch (error) {
            console.log(error);
            Swal.close();
            let mensaje;
            if(error && error.response && error.response.data){
                mensaje=error.response.data;
            }else{
                mensaje='Ocurrio un error, intente de nuevo';
            }
            Swal.fire('ERROR',mensaje,'error')
        }
        }     
    
  return (
    <div className='sidebar'>
        <div className='container-fluid'>
            <div className='row'>
                <div className='col'>
                    <div className='sidebar-header'>
                        <h3>Nuevao Estado de Equipo</h3> 
                        <i className="fa-solid fa-xmark" onClick={handleOpenModal}></i>
                    </div>
                </div>
            </div>
            <div className='row'><hr/></div>
        </div>
        <form onSubmit={(e)=>handleOnSubmit(e)}>
            <div className='row'>
                <div className='col'>
                    <div className="mb-3">
                        <label className="form-label">Nombre</label>
                        <input type="text" 
                               name='nombre' 
                               value={nombre} 
                               onChange={(e)=>handleOnChange(e)} 
                               className="form-control"
                               required/>
                    </div>
                </div>
                <div className='col'>
                    <div className="mb-3">
                    <label className="form-label">Estado</label>
                    <select className="form-select"
                                onChange={(e)=>handleOnChange(e)}
                                name='estado'
                                value={estado}
                                required>
                            <option value="">--SELECCIONA--</option>
                            <option value="Activo">Activo</option>
                            <option value="Inactivo">Inactivo</option>                        
                        </select>
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='col'>
                    <button className='btn btn-primary'>GUARDAR</button>
                </div>
            </div>
        </form>
    </div>
  )
}