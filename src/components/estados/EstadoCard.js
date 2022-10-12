import React from 'react';
import {Link} from'react-router-dom';

export const EstadoCard = (props) => {
 
 const{estadoEquipo}=props;

  return (
    <div className="col">
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Caracteristicas</h5>
                <hr/>
                <p className="card-text">{`Nombre: ${estadoEquipo.nombre}`}</p>
                <p className="card-text">{`Estado: ${estadoEquipo.estado}`}</p>
                <p className="card-text">
                  <Link to={`/estados/edit/${estadoEquipo._id}`}>Editar</Link>
                </p>
            </div>
        </div> 
    </div>
  )
}