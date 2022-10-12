import React, {useState,useEffect} from 'react'
import { useParams } from "react-router-dom";
import {  getTipoEquipoPorId, editarTipoEquipo} from "../../services/tipoEquipoService"
import Swal from 'sweetalert2';

export const TipoUpdate = () => {

    const {tipoEquipoId=''}=useParams();
    const[tipoEquipo,setTipoEquipo] = useState({})
    const[valores,setValores]=useState({});


    const {nombre='', estado=''}=valores;

    useEffect(()=>{
        setValores({
            nombre:tipoEquipo.nombre,
            estado:tipoEquipo.estado,
        })
        console.log(valores);
      },[tipoEquipo]); 
   
    const getTipoEquipo= async()=>{
        try {
            Swal.fire({
                allowOutsideClick:false,
                text: 'CARGANDO.'
            }); 
            const{data}=await getTipoEquipoPorId(tipoEquipoId)
            setTipoEquipo(data);
            Swal.close();
        } catch (error) {
            console.log(error);
        }
    }

    console.log(tipoEquipo);

    useEffect(()=>{
        getTipoEquipo();
    },[tipoEquipoId]);       


      const handleOnSubmit = async (e)=>{
        e.preventDefault();
        const tipoEquipo={
            nombre, estado,}
        console.log(tipoEquipo);
        try {
            Swal.fire({
                allowOutsideClick:false,
                text: 'CARGANDO.'
            });
            Swal.showLoading();
            const{data}=await editarTipoEquipo(tipoEquipoId,tipoEquipo);
            console.log(data);
            Swal.close();
        } catch (error) {
            console.log(error);
            console.log(error.response);
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

    const handleOnChange=({target})=>{
        const{name,value}=target;
        setValores({...valores,[name]:value}) 
    }


 return(
    <div className='container-fluid mt-3 mb-2'>
        <div className='card'>
            <div className='card-header'>
                <h5 className='card-title'>Detalle Tipo de Equipo</h5>
            </div>
            <div className='card-body'>
                <div className='row'>
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
                </div>
            </div>
        </div>
 )
}