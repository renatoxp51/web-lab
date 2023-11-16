import React, {useState } from 'react';
import { Routes, Route} from 'react-router-dom';
import { Home } from '../pages/Home';
import { Inicio } from '../pages/Inicio';
import { Cadastro } from '../pages/Cadastro';
import { Laboratorio } from '../pages/Laboratorios';
import { Reserva } from '../pages/Reserva';
import  styles from './Navigator.module.css'; 
import  AuthLayout from './AuthLayout';

function Navigator() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  console.log('IsLoggedIn:', isLoggedIn);

  return (
    <div className={styles.container}>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              setIsLoggedIn={setIsLoggedIn}
              isLoggedIn={isLoggedIn}
            />
          }
        />
        {isLoggedIn && (
          <>
            <Route
              path="/inicio"
              element={<AuthLayout isLoggedIn={isLoggedIn}><Inicio /></AuthLayout>}
            />
            <Route
              path="/laboratorio"
              element={<AuthLayout isLoggedIn={isLoggedIn}><Laboratorio /></AuthLayout>}
            />
            <Route
              path="/reserva"
              element={<AuthLayout isLoggedIn={isLoggedIn}><Reserva /></AuthLayout>}
            />
          </>
        )}
        <Route path="/cadastro" element={<Cadastro />} />
      </Routes>
    </div>
  );
}

export default Navigator;