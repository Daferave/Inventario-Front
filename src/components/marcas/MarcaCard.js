import React from 'react';
import {Link} from'react-router-dom';

export const MarcaCard = (props) => {
 
 const{marca}=props;

  return (
    <div className="col">
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Caracteristicas</h5>
                <hr/>
                <p className="card-text">{`Nombre: ${marca.nombre}`}</p>
                <p className="card-text">{`Estado: ${marca.estado}`}</p>
                <p className="card-text">
                  <Link to={`/marcas/edit/${marca._id}`}>Editar</Link>
                </p>
            </div>
        </div> 
    </div>
  )
} 