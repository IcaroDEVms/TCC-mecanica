import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 ">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-2">Sistema de Manuais Técnicos</h3>
            <p className="text-gray-400">© {new Date().getFullYear()} Todos os direitos reservados</p>
          </div>
          
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
            <div>
              <h4 className="font-semibold mb-2">Links Úteis</h4>
              <ul className="space-y-2">
                <li><Link to="/TelaInicial" className="text-gray-400 hover:text-white transition">Início</Link></li>
                <li><Link to="/QuizMotor" className="text-gray-400 hover:text-white transition">Quiz</Link></li>
                <li><Link to="/VerManual" className="text-gray-400 hover:text-white transition">Manuais</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Contato</h4>
              <ul className="text-gray-400 space-y-2">
                <li>tropadaduvida@empresa.com</li>
                <li>(11) 1234-5678</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>Desenvolvido com React e Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;