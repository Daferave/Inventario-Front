import React from 'react';
import {Link} from'react-router-dom';

export const TipoCard = (props) => {
 
 const{tipoEquipo}=props;

  return (
    <div className="col">
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Caracteristicas</h5>
                <hr/>
                <p className="card-text">{`Nombre: ${tipoEquipo.nombre}`}</p>
                <p className="card-text">{`Estado: ${tipoEquipo.estado}`}</p>
                <p className="card-text">
                  <Link to={`/tipos/edit/${tipoEquipo._id}`}>Editar</Link>
                </p>
            </div>
        </div> 
    </div>
  )
} 