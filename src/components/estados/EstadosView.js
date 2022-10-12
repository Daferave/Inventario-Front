import React, { useEffect, useState } from "react";
import {getEstadosEquipos} from '../../services/estadoEquipoService';
import {EstadoCard} from './EstadoCard'; 
import { EstadoNew } from "./EstadoNew.js";
import Swal from 'sweetalert2';

export const EstadosView = () => {

  const[estadosEquipo,setEstadosEquipos]=useState([]);
  const[openModal,setOpenModal]=useState(false);

  const listarEstadosEquipo=async()=>{
    try {
      Swal.fire({
        allowOutsideClick:false,
        text: 'CARGANDO.'
      }); 
      const {data} = await getEstadosEquipos();
      console.log(data);
      setEstadosEquipos(data);
      Swal.close();
    } catch (error) {
      console.log(error);
    }
  } 

  useEffect(()=>{
    listarEstadosEquipo();
  },[]);

  const handleOpenModal=()=>{
    setOpenModal(!openModal)
  }

  return ( 
    <div className="container-fluid">
      <div className="mt-2 mb-2 row row-cols-1 row-cols-md-4 g-4">
        { 
          estadosEquipo.map((estadoEquipo)=>{
            return <EstadoCard key={estadoEquipo._id} estadoEquipo={estadoEquipo}/>
          })
        }
      </div>

      {
        openModal ? <EstadoNew 
                    handleOpenModal={handleOpenModal}
                    listarEstadosEquipo={listarEstadosEquipo}/>
      : (<button className="btn btn-primary fab" onClick={handleOpenModal}>
          <i className="fa-solid fa-plus"></i>
         </button>)
}
    </div>
  )
}

