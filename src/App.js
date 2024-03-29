import React from 'react';
import {BrowserRouter as Router, Switch, Route,  } from "react-router-dom";
import { Header } from './components/ui/Header'; 
import {EstadosView} from './components/estados/EstadosView'
import {InventarioView} from './components/inventarios/InventarioView'
import {MarcaView} from './components/marcas/MarcaView'
import {TipoView} from './components/tipos/TipoView'
import {UsuarioView} from './components/usuarios/UsuarioView'
import { InventarioUpdate } from "./components/inventarios/InventarioUpdate";
import { MarcaUpdate } from "./components/marcas/MarcaUpdate";
import { UsuarioUpdate } from "./components/usuarios/UsuarioUpdate";
import { EstadoUpdate } from "./components/estados/EstadoUpdate";
import { TipoUpdate } from "./components/tipos/TipoUpdate";
import { Redirect } from 'react-router-dom';


const App = () => {
    return <Router>
        <Header />
        <Switch>
            <Route exact path='/' component={ InventarioView } /> 
            <Route exact path='/usuarios' component={ UsuarioView }/>
            <Route exact path='/marcas' component={ MarcaView }/>
            <Route exact path='/estados' component={ EstadosView }/>
            <Route exact path='/tipos' component={ TipoView }/>
            <Route exact path='/inventarios/edit/:id' component={InventarioUpdate}/>
            <Route exact path='/marcas/edit/:id' component={MarcaUpdate}/>
            <Route exact path='/usuarios/edit/:id' component={UsuarioUpdate}/>
            <Route exact path='/estados/edit/:id' component={EstadoUpdate}/>
            <Route exact path='/tipos/edit/:id' component={TipoUpdate}/> 
            <Redirect to='/'/>
    </Switch>
</Router>
}

export {
    App
}