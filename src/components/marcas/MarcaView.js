import React, { useEffect, useState } from "react";
import {getMarcas} from '../../services/marcaService';
import {MarcaCard} from './MarcaCard'; 
import { MarcaNew } from "./MarcaNew";
import Swal from 'sweetalert2';

export const MarcaView = () => {

  const[marcas,setMarcas]=useState([]);
  const[openModal,setOpenModal]=useState(false);

  const listarMarcas=async()=>{
    try {
      Swal.fire({
        allowOutsideClick:false,
        text: 'CARGANDO.'
      }); 
      const {data} = await getMarcas();
      console.log(data);
      setMarcas(data);
      Swal.close();
    } catch (error) {
      console.log(error);
    }
  } 

  useEffect(()=>{
    listarMarcas();
  },[]);

  const handleOpenModal=()=>{
    setOpenModal(!openModal)
  }

  return ( 
    <div className="container-fluid">
      <div className="mt-2 mb-2 row row-cols-1 row-cols-md-4 g-4">
        { 
          marcas.map((marca)=>{
            return <MarcaCard key={marca._id} marca={marca}/>
          })
        }
      </div>

      {
        openModal ? <MarcaNew 
                    handleOpenModal={handleOpenModal}
                    listarMarcas={listarMarcas}/>
      : (<button className="btn btn-primary fab" onClick={handleOpenModal}>
          <i className="fa-solid fa-plus"></i>
         </button>)
}
    </div>
  )
}
