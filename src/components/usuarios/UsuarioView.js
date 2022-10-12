import React, {useEffect, useState} from 'react'
import { getUsuarios } from '../../services/usuarioService'; 
import {UsuarioCard} from './UsuarioCard'; 
import { UsuarioNew } from './UsuarioNew';
import Swal from 'sweetalert2';

export const UsuarioView = () => {

  const [usuarios, setUsuarios] = useState ([]);
  const [ openModal, setOpenModal ] = useState (false);

  const listarUsuarios=async()=>{
    try {
      Swal.fire({
        allowOutsideClick:false,
        text: 'CARGANDO.'
      }); 
      const {data} = await getUsuarios();

      setUsuarios(data);
      Swal.close();
    } catch (error) {
      console.log(error);
    }
  } 

  useEffect(()=>{
    listarUsuarios();
  },[]);

  const handleOpenModal=()=>{
    setOpenModal(!openModal)
  }
  return ( 
    <div className="container-fluid">
      <div className="mt-2 mb-2 row row-cols-1 row-cols-md-4 g-4">
        { 
          usuarios.map((usuario)=>{
            return <UsuarioCard key={usuario._id} usuario={usuario}/>
          })
        }
      </div>

      {
        openModal ? <UsuarioNew 
                    handleOpenModal={handleOpenModal}
                    listarUsuarios={listarUsuarios}/>
      : (<button className="btn btn-primary fab" onClick={handleOpenModal}>
          <i className="fa-solid fa-plus"></i>
         </button>)
}
    </div>
  )
}
