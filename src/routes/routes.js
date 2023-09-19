/* Este arquivo servira para definir as rotas entre páginas com o React Router*/

import React from "react";
import { Route, BrowserRouter } from "react-router-dom";

import Inicio from "../pages/Inicio";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Cadastro from "../pages/Cadastro";

const Routes = () => {
   return(
       <BrowserRouter>
           <Route component = { Inicio }  path="/" exact />
           <Route component = { Home }  path="/home"  />
           <Route component = { Login }  path="/login" />
           <Route component = { Cadastro }  path="/cadastro" />
       </BrowserRouter>
   )
}

export default Routes;