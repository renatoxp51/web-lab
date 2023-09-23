/* Este arquivo servira para definir as rotas entre páginas com o React Router*/

import { Fragment, React} from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import Inicio from "../pages/Inicio";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Cadastro from "../pages/Cadastro";

const Private = ({ Item })=>{
    const signed = true;

    return signed > 0 ? <Item /> : <Login />;
};

function RoutesApp(){
   return(
       <BrowserRouter>
            <Fragment>
                <Routes>
                    <Route exact path="/home" element={<Private Item={Home} />}/>
                    <Route path="/login" element={<Login />}/>
                    <Route exact path="/cadastro" element={<Cadastro/>}/>
                    <Route path="*" element={<Inicio />}/>
                </Routes>
           </Fragment>
       </BrowserRouter>
   )
}

export default RoutesApp