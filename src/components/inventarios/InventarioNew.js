import React, { useState, useEffect } from 'react'
import {getUsuarios} from '../../services/usuarioService';
import {getEstadosEquipos} from '../../services/estadoEquipoService';
import {getMarcas} from '../../services/marcaService';
import {getTiposEquipos} from '../../services/tipoEquipoService';
import {crearInventario} from '../../services/inventarioService';
import Swal from 'sweetalert2';

export const InventarioNew = ({handleOpenModal, listarInventarios}) => {

    const [usuarios, setUsuarios] = useState([]);
    const [marcas, setMarcas] = useState([]);
    const [tipos, setTipos] = useState([]);
    const [estados, setEstados] = useState([]);
    const [valoresForm, setValoresForm] = useState([]);
    const { serial = '', modelo = '', descripcion = '', color = '', foto = '', 
            fechaCompra = '', precio = '', usuario, marca, tipoEquipo, estadoEquipo } = valoresForm;

    const listarUsuarios=async()=>{
        try {
            const {data}= await getUsuarios();
            setUsuarios (data);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect( () =>{
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

    useEffect( () =>{
       listarMarcas(); 
    },[])

    const listarEstados = async () => {
        try {
            const { data } = await getEstadosEquipos();
            setEstados(data);
        } catch (error){
            console.log(error);
        }
    }
    useEffect( () =>{
        listarEstados();
    },[])

    const listarTipos = async () => {
        try {
            const { data } = await getTiposEquipos();
            setTipos(data);
        } catch (error){
            console.log(error);
        }
    }
    useEffect( () =>{
       listarTipos(); 
    },[])

    const handleOnChange = ({target}) => {
        const {name, value} = target;
        setValoresForm({...valoresForm, [name]: value});
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const inventario = {
            serial, modelo, descripcion, color, foto,
            fechaCompra, precio,
            usuario: {
                _id: usuario
            },
            marca:{
                _id: marca
            },
            tipoEquipo:{
                _id: tipoEquipo
            },
            estadoEquipo:{
                _id: estadoEquipo
            }
        }
        console.log(inventario);
        try {
            Swal.fire({
                allowOutsideClick:false,
                text: 'CARGANDO.'
            });
            Swal.showLoading();
            const{data}=await crearInventario(inventario);
            console.log(data);
            Swal.close();
            handleOpenModal();
            listarInventarios();
        } catch (error) {
            console.log(error);
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

  return (
    <div className='sidebar'>
        <div className='container-fluid'>
            <div className='row'>
                <div className='col'>
                    <div className='sidebar-header'>
                        <h3>Nuevo Inventario</h3>
                        <i className="fa-solid fa-xmark" onClick={ handleOpenModal }></i>
                    </div>
                </div>
            </div>
            <div className='ror'>
                <div className='col'>
                    <hr/>
                </div>
            </div>
            <form onSubmit={ (e) => handleOnSubmit(e) }>
                <div className='row'>
                    <div className='col'>
                        <div className="mb-3">
                            <label className="form-label">Serial</label>
                            <input type="text" name='serial' 
                            required
                            value={serial}
                            onChange = { (e) => handleOnChange(e) } 
                            className="form-control"  />   
                        </div>
                    </div>
                    <div className='col'>
                        <div className="mb-3">
                            <label className="form-label">Modelo</label>
                            <input type="text" name='modelo' 
                             required
                            value={modelo} 
                            onChange = { (e) => handleOnChange(e) } 
                            className="form-control"  />   
                        </div>
                    </div>
                    <div className='col'>
                        <div className="mb-3">
                            <label className="form-label">Descripción</label>
                            <input type="text" name='descripcion' 
                             required
                            value={descripcion} 
                            onChange = { (e) => handleOnChange(e) } 
                            className="form-control"  />   
                        </div>
                    </div> 
                    <div className='col'>
                        <div className="mb-3">
                            <label className="form-label">Color</label>
                            <input type="text" name='color' 
                             required
                            value={color} 
                            onChange = { (e) => handleOnChange(e) } 
                            className="form-control"  />   
                        </div>
                    </div>  
                </div>
                <div className='row'>
                    <div className='col'>
                        <div className="mb-3">
                            <label className="form-label">Foto</label>
                            <input type="url" name='foto' 
                             required
                            value={foto} 
                            onChange = { (e) => handleOnChange(e) } 
                            className="form-control"  />   
                        </div>
                    </div>
                    <div className='col'>
                        <div className="mb-3">
                            <label className="form-label">Fecha de Compra</label>
                            <input type="date" name='fechaCompra' 
                             required
                            value={fechaCompra} 
                            onChange = { (e) => handleOnChange(e) } 
                            className="form-control"  />   
                        </div>
                    </div>
                    <div className='col'>
                        <div className="mb-3">
                            <label className="form-label">Precio</label>
                            <input type="number" name='precio' 
                             required
                            value={precio} 
                            onChange = { (e) => handleOnChange(e) } 
                            className="form-control"  />   
                        </div>
                    </div> 
                    <div className='col'>
                        <div className="mb-3">
                            <label className="form-label">Usuario</label>
                            <select className="form-select" name='usuario' 
                             required
                            onChange = { (e) => handleOnChange(e) } 
                            value = {usuario} >
                                <option value="">--SELECCIONE--</option>
                                {
                                    usuarios.map (usuario => {
                                        return <option key={usuario._id} value={usuario._id}>{usuario.nombre}</option>
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
                            <select className="form-select" name='marca'
                             required
                            onChange = { (e) => handleOnChange(e) }  
                            value = {marca} >
                                <option value="">--SELECCIONE--</option>
                                {
                                    marcas.map (marca => {
                                        return <option key={marca._id} value={marca._id}>{marca.nombre}</option>
                                    })
                                }
                                
                            </select> 
                        </div>
                    </div>
                    <div className='col'>
                        <div className="mb-3">
                            <label className="form-label">Tipo Equipo</label>
                            <select className="form-select" name='tipoEquipo'
                             required
                            onChange = { (e) => handleOnChange(e) }  
                            value = {tipoEquipo} >
                                <option value="">--SELECCIONE--</option>
                                {
                                    tipos.map (tipo => {
                                        return <option key={tipo._id} value={tipo._id}>{tipo.nombre}</option>
                                    })
                                   
                                    
                                }
                                
                            </select>   
                        </div>
                    </div>
                    <div className='col'>
                        <div className="mb-3">
                            <label className="form-label">Estado Equipo</label>
                            <select className="form-select" name='estadoEquipo'
                             required
                            onChange = { (e) => handleOnChange(e) }  
                            value = {estadoEquipo} >
                                <option value="">--SELECCIONE--</option>
                                {
                                    estados.map (estado => {
                                        return <option key={estado._id} value={estado._id}>{estado.nombre}</option>
                                    })
                                }
                                
                            </select>    
                        </div>
                    </div>  
                </div>
                <div className='row'>
                    <div className='col'>
                        <button className='btn btn-primary'>Guardar</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
  )
}
