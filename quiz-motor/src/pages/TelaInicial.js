import React from 'react';
import Navbar from '../components/Navbar.js';
import CardLink from '../components/CardLink.js';
import '../styles/TelaInicial.css';

function TelaInicial() {
  const manuals = [
    {
      id: 1,
      title: "Manual de Manutenção de Motores",
      image: "https://th.bing.com/th/id/OIP.ARcfJm47G3v082RT1Ko3iAHaFW?cb=iwc1&rs=1&pid=ImgDetMain",
      description: "Guia completo sobre motores e suas aplicações",
      to: "/manual-motores"
    },
    {
      id: 2,
      title: "Manual de Manutenção",
      image: "https://images-na.ssl-images-amazon.com/images/I/61hg5ihv0RL.jpg",
      description: "Procedimentos de manutenção preventiva",
      to: "/manual-manutencao"
    },
    {
      id: 3,
      title: "Manual de Segurança EPI",
      image: "https://th.bing.com/th/id/OIP.32XJNCER5W0fbOQJ6mmfXQHaKX?rs=1&pid=ImgDetMain",
      description: "Normas e procedimentos de segurança",
      to: "/manual-seguranca"
    }
  ];

  return (
    <div className="tela-inicial">
      <Navbar />
      <div className="content-container">
        <header className="page-header">
          <h1>Manuais Disponíveis</h1>
          <p>Selecione um manual para começar</p>
        </header>
        
        <div className="cards-grid">
          {manuals.map(manual => (
            <CardLink
              key={manual.id}
              to={manual.to}
              image={manual.image}
              title={manual.title}
              description={manual.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default TelaInicial;
