import React, { useEffect, useState } from "react";
import {getInventarios} from '../../services/inventarioService';
import {InventarioCard} from './InventarioCard'; 
import { InventarioNew } from "./InventarioNew";
import Swal from 'sweetalert2';

export const InventarioView = () => {

  const[inventarios,setInventarios]=useState([]);
  const[openModal,setOpenModal]=useState(false);

  const listarInventarios=async()=>{
    try {
      Swal.fire({
        allowOutsideClick:false,
        text: 'CARGANDO.'
      }); 
      const {data} = await getInventarios();
      console.log(data);
      setInventarios(data);
      Swal.close();
    } catch (error) {
      console.log(error);
    }
  } 

  useEffect(()=>{
    listarInventarios();
  },[]);

  const handleOpenModal=()=>{
    setOpenModal(!openModal)

  }

  return ( 
    <div className="container-fluid">
      <div className="mt-2 mb-2 row row-cols-1 row-cols-md-4 g-4">
        { 
          inventarios.map((inventario)=>{
            return <InventarioCard key={inventario._id} inventario={inventario}/>
          })
        }
      </div>

      {
        openModal ? <InventarioNew 
                    handleOpenModal={handleOpenModal}
                    listarInventarios={listarInventarios}/>
      : (<button className="btn btn-primary fab" onClick={handleOpenModal}>
          <i className="fa-solid fa-plus"></i>
         </button>)
}
    </div>
  )
}