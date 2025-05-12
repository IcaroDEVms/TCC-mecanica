import React from 'react';
import Navbar from '../components/Navbar.js';
import CardLink from '../components/CardLink.js';

function TelaInicial() {
  const manuals = [
    {
      id: 1,
      title: "Quiz Manutenção De Bombas Centrífugas",
      image: "https://th.bing.com/th/id/OIP.ARcfJm47G3v082RT1Ko3iAHaFW?cb=iwc1&rs=1&pid=ImgDetMain",
      description: "Guia completo sobre motores e suas aplicações",
      to: "/QuizMotor",
      color: "from-blue-500 to-cyan-400"
    },
    {
      id: 2,
      title: "PDF Padrão de Ajustes Para Montagem de Bombas Centrífugas",
      image: "https://i.imgur.com/ZUK3j8j.png",
      description: "Documento técnico com especificações padrões para ajustes de bombas centrífugas",
      to: "/VerManual",
      color: "from-purple-500 to-pink-400"
    },
    {
      id: 3,
      title: "Manual de Segurança EPI",
      image: "https://th.bing.com/th/id/OIP.32XJNCER5W0fbOQJ6mmfXQHaKX?rs=1&pid=ImgDetMain",
      description: "Normas e procedimentos de segurança",
      to: "/ManualSeguranca",
      color: "from-orange-500 to-yellow-400"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-4 animate-fade-in">
            Manuais Disponíveis
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Selecione um manual para começar sua jornada de aprendizado
          </p>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {manuals.map(manual => (
            <CardLink
              key={manual.id}
              to={manual.to}
              image={manual.image}
              title={manual.title}
              description={manual.description}
              color={manual.color}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default TelaInicial;