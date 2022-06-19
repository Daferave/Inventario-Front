import React from 'react';
import {BrowserRouter as Router, Switch, Route,  } from "react-router-dom";
import { Header } from './components/ui/Header'; 
import {EstadosView} from './components/estados/EstadosView'
import {InventarioView} from './components/inventarios/InventarioView'
import {MarcaView} from './components/marcas/MarcaView'
import {TipoView} from './components/tipos/TipoView'
import {UsuarioView} from './components/usuarios/UsuarioView'
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
            <Redirect to='/'/>
    </Switch>
</Router>
}

export {
    App
}