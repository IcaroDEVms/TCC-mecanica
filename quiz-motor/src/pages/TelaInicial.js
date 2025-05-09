import React from 'react';
import Navbar from '../components/Navbar.js';
import CardLink from '../components/CardLink.js'

function TelaInicial() {
  return (
    <div>
      <Navbar />
      <h1>Manuais Disponíveis</h1>
      <CardLink
        to="/pagina-destino"
        image="https://th.bing.com/th/id/OIP.ARcfJm47G3v082RT1Ko3iAHaFW?cb=iwc1&rs=1&pid=ImgDetMain"
        title="Ir para o manual"
      />
    </div>
  );
}

export default TelaInicial;
