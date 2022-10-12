import React, {useState,useEffect} from 'react';
import { useParams } from "react-router-dom";
import {  getInventarioPorId, editarInventario} from "../../services/inventarioService";
import { getUsuarios } from "../../services/usuarioService";
import { getMarcas } from "../../services/marcaService";
import { getTiposEquipos } from "../../services/tipoEquipoService";
import { getEstadosEquipos} from "../../services/estadoEquipoService";
import Swal from 'sweetalert2';
 

export const InventarioUpdate = () => {

    const {id=''}=useParams();
    const[inventario,setInventario] = useState({})
    const[valores,setValores]=useState({});
    const[usuarios,setUsuarios]=useState([]);
    const[marcas,setMarcas]=useState([]);
    const[estados,setEstados]=useState([]);
    const[tipos,setTipos]=useState([]);

    const {serial='', modelo='', descripcion='', color='', foto='', fechaCompra='', precio='', 
            usuario, marca, tipo, estado}=valores;

            useEffect(()=>{
                setValores({
                    serial:inventario.serial,
                    modelo:inventario.modelo,
                    descripcion:inventario.descripcion,
                    color:inventario.color,
                    foto:inventario.foto,
                    fechaCompra:inventario.fechaCompra,
                    precio:inventario.precio,   
                    usuario:inventario.usuario,
                    marca:inventario.marca,
                    estado:inventario.estadoEquipo,                        
                    tipo:inventario.tipoEquipo
                })
                console.log(valores);
              },[inventario]);

    const listarUsuarios=async()=>{
                try {
                    const {data}= await getUsuarios();
                    setUsuarios (data);
                    console.log(data);
                } catch (error) {
                    console.log(error);
                }
    }
    useEffect(()=>{
        listarUsuarios();
    },[]);
        
    const listarMarcas=async()=>{
                try {
                    const {data}=await getMarcas();
                    setMarcas (data);
                } catch (error) {
                    console.log(error);
                }
    }
    useEffect(()=>{
        listarMarcas();
    },[]);
        
    const listarTipos=async()=>{
                try {
                    const {data}=await getTiposEquipos();
                    setTipos (data);
                } catch (error) {
                    console.log(error);
                }
    }
    useEffect( ()=>{
        listarTipos();
    },[]);
        
    const listarEstados=async()=>{
                try {
                    const {data}=await getEstadosEquipos();
                    setEstados (data);
                } catch (error) {
                    console.log(error);
                }
    }
    useEffect( ()=>{
        listarEstados();
    },[]);

    const getInventario= async()=>{
        try {
            Swal.fire({
                allowOutsideClick:false,
                text: 'CARGANDO.'
            }); 
            const{data}=await getInventarioPorId(id)
            setInventario(data);
            Swal.close();
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        getInventario();
    },[id]);

    

      const handleOnSubmit = async (e)=>{
        e.preventDefault();
        const inventario={
            serial, modelo, descripcion, color, foto, fechaCompra, precio, 
            usuario:{_id:usuario}, 
            marca:{_id:marca}, 
            tipoEquipo:{_id:tipo}, 
            estadoEquipo:{_id:estado}}
        console.log(inventario);
        try {
            Swal.fire({
                allowOutsideClick:false,
                text: 'CARGANDO.'
            });
            Swal.showLoading();
            const{data}=await editarInventario(id,inventario);
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
                <h5 className='card-title'>Detalle Activo</h5>
            </div>
            <div className='card-body'>
                <div className='row'>
                    <div className='col-md-4'>
                        <img className='img-thumbnail' src={inventario.foto}/>
                    </div>
                    <div className='col-md-8'>
                        <form onSubmit={(e)=>handleOnSubmit(e)}>
                           <div className='row'>
                                <div className='col'>
                                    <div className="mb-3">
                                        <label className="form-label">Serial</label>
                                        <input type="text" 
                                               name='serial' 
                                               value={serial} 
                                               onChange={(e)=>handleOnChange(e)} 
                                               className="form-control"
                                               required/>
                                    </div>
                                </div>
                                <div className='col'>
                                    <div className="mb-3">
                                        <label className="form-label">Modelo</label>
                                        <input type="text" 
                                               name='modelo' 
                                               value={modelo} 
                                               onChange={(e)=>handleOnChange(e)} 
                                               className="form-control"
                                               required/>
                                    </div>
                                </div>
                                <div className='col'>
                                    <div className="mb-3">
                                        <label className="form-label">Descripcion</label>
                                        <input type="text" 
                                               name='descripcion' 
                                               value={descripcion} 
                                               onChange={(e)=>handleOnChange(e)} 
                                               className="form-control"
                                               required/>
                                    </div>
                                </div>
                                <div className='col'>
                                    <div className="mb-3">
                                        <label className="form-label">Color</label>
                                        <input type="text" 
                                               name='color' 
                                               value={color} 
                                                onChange={(e)=>handleOnChange(e)} 
                                               className="form-control"
                                               required/>
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col'>
                                    <div className="mb-3">
                                        <label className="form-label">Foto</label>
                                        <input type="url" 
                                               name='foto' 
                                               value={foto} 
                                               onChange={(e)=>handleOnChange(e)} 
                                               className="form-control"
                                               required/>
                                    </div>
                                </div>
                                <div className='col'>
                                    <div className="mb-3">
                                        <label className="form-label">Fecha Compra</label>
                                        <input type="date" 
                                               name='fechaCompra'
                                               value={fechaCompra} 
                                               onChange={(e)=>handleOnChange(e)} 
                                               className="form-control"
                                               required/>
                                    </div>
                                    
                                </div>
                                <div className='col'>
                                    <div className="mb-3">
                                        <label className="form-label">Precio</label>
                                        <input type="number"
                                            name='precio' 
                                            value={precio} 
                                            onChange={(e)=>handleOnChange(e)} 
                                            className="form-control"
                                            required/>
                                    </div>
                                </div>
                                <div className='col'>
                                    <div className="mb-3">
                                        <label className="form-label">Usuario</label>
                                        <select className="form-select" 
                                                onChange={(e)=>handleOnChange(e)}
                                                name='usuario'
                                                value={usuario}
                                                required>
                                            <option value="">--SELECCIONA--</option>
                                            {
                                                usuarios.map(({_id,nombre})=>{
                                                    return <option key={_id} value={_id}>
                                                                {nombre}
                                                        </option>
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col'>
                                    <div className="mb-3">
                                        <label className="form-label">Marca</label>
                                        <select className="form-select"
                                                onChange={(e)=>handleOnChange(e)}
                                                name='marca'
                                                value={marca}
                                                required>
                                            <option value="">--SELECCIONA--</option>
                                            {
                                                marcas.map(({_id,nombre})=>{
                                                    return <option key={_id} value={_id}>
                                                                {nombre}
                                                        </option>
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className='col'>
                                    <div className="mb-3">
                                        <label className="form-label">Tipo Equipo</label>
                                        <select className="form-select"
                                                onChange={(e)=>handleOnChange(e)}
                                                name='tipo'
                                                value={tipo}
                                                required>
                                            <option value="">--SELECCIONA--</option>
                                            {
                                                tipos.map(({_id,nombre})=>{
                                                    return <option key={_id} value={_id}>
                                                                {nombre}
                                                        </option>
                                                })
                                            }
                                        </select>
                                    </div>
                                    
                                </div>
                                <div className='col'>
                                    <div className="mb-3">
                                        <label className="form-label">Estado Equipo</label>
                                        <select className="form-select"
                                                onChange={(e)=>handleOnChange(e)}
                                                name='estado'
                                                value={estado}
                                                required>
                                            <option value="">--SELECCIONA--</option>
                                            {
                                                estados.map(({_id,nombre})=>{
                                                    return <option key={_id} value={_id}>
                                                                {nombre}
                                                        </option>
                                                })
                                            }
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
    </div>
 )
}
 