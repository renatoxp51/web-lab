import React from 'react';
import Navigator from './components/Navigator'; 

function App() {
  return (
    <div className="App">
      {/* Cabeçalho global */}
      <header>
        <h1>ReservaLab</h1>
      </header>

      {/* Renderiza o componente Navigator, que contém todas as rotas */}
      <Navigator />

      {/* Rodapé global */}
      <footer>
        <p>Rodapé</p>
      </footer>
    </div>
  );
}

export default App;
