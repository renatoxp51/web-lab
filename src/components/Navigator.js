import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Inicio from '../pages/Inicio';
import Login from '../pages/Login';
import Cadastro from '../pages/Cadastro';
import Laboratorio from '../pages/Laboratorios';
import Reserva from '../pages/Reserva';

function Navigator() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checkingLogin, setCheckingLogin] = useState(true);

  useEffect(() => {
    // Verifica se o usuário está logado
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
    setCheckingLogin(false); // Marca que a verificação foi concluída
  }, []);

  // Mostra uma tela de carregamento enquanto verifica o login
  if (checkingLogin) {
    return <div>Verificando Login...</div>;
  }

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inicio" element={isLoggedIn ? <Inicio /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/laboratorio" element={isLoggedIn ? <Laboratorio /> : <Navigate to="/login" />} />
        <Route path="/reserva" element={isLoggedIn ? <Reserva /> : <Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

export default Navigator;
