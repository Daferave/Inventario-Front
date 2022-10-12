import React, { useEffect, useState } from "react";
import {getTiposEquipos} from '../../services/tipoEquipoService';
import {TipoCard} from './TipoCard'; 
import { TipoNew } from "./TipoNew.js";
import Swal from 'sweetalert2';

export const TipoView = () => {

  const[tiposEquipo,setTiposEquipo]=useState([]);
  const[openModal,setOpenModal]=useState(false); 

  const listarTiposEquipo=async()=>{
    try {
      Swal.fire({
        allowOutsideClick:false,
        text: 'CARGANDO.'
      }); 
      const {data} = await getTiposEquipos();
      console.log(data);
      setTiposEquipo(data);
      Swal.close();
    } catch (error) {
      console.log(error); 
    }
  } 

  useEffect(()=>{
    listarTiposEquipo();
  },[]);

  const handleOpenModal=()=>{
    setOpenModal(!openModal)
  }

  return ( 
    <div className="container-fluid">
      <div className="mt-2 mb-2 row row-cols-1 row-cols-md-4 g-4">
        { 
          tiposEquipo.map((tipoEquipo)=>{
            return <TipoCard key={tipoEquipo._id} tipoEquipo={tipoEquipo}/>
          })
        }
      </div>

      {
        openModal ? <TipoNew 
                    handleOpenModal={handleOpenModal}
                    listarTiposEquipo={listarTiposEquipo}/>
      : (<button className="btn btn-primary fab" onClick={handleOpenModal}>
          <i className="fa-solid fa-plus"></i>
         </button>)
}
    </div>
  )
}
