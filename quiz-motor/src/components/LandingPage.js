import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Wrench,
  Cog,
  Clock,
  Users,
  BookOpen,
  ArrowRight,
  Award,
  WrenchIcon,
  ChevronRight
} from 'lucide-react';

const Gear = ({ size, speed, position, rotate = 0, opacity = 1 }) => {
  return (
    <div 
      className="absolute" 
      style={{ 
        top: position.top, 
        left: position.left, 
        right: position.right,
        bottom: position.bottom,
        animation: `spin ${speed}s linear infinite${position.reverse ? ' reverse' : ''}`,
        transform: `rotate(${rotate}deg)`,
        opacity: opacity
      }}
    >
      <svg width={size} height={size} viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
        <path 
          fill="#1E293B" 
          d="M60,15 L65,15 L66.5,25 C70,25.6 73.2,26.8 76.1,28.4 L84.5,22.5 L88.7,26.7 L82.6,35.1 C84.2,38 85.4,41.2 86,44.7 L96,46 L96,52 L86,53.2 C85.4,56.8 84.2,60 82.6,62.9 L88.7,71.3 L84.5,75.5 L76.1,69.6 C73.2,71.2 70,72.4 66.5,73 L65,83 L60,83 L58.5,73 C55,72.4 51.8,71.2 48.9,69.6 L40.5,75.5 L36.3,71.3 L42.4,62.9 C40.8,60 39.6,56.8 39,53.2 L29,51.9 L29,45.9 L39,44.7 C39.6,41.1 40.8,37.9 42.4,35 L36.3,26.6 L40.5,22.4 L48.9,28.3 C51.8,26.7 55,25.5 58.5,24.9 L60,15 Z M64,40 C55.2,40 48,47.2 48,56 C48,64.8 55.2,72 64,72 C72.8,72 80,64.8 80,56 C80,47.2 72.8,40,64,40 Z"
        />
        <circle cx="64" cy="56" r="10" fill="#475569" />
      </svg>
    </div>
  );
};

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('sobre');
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const TabContent = () => {
    switch(activeTab) {
      case 'sobre':
        return (
          <div className="space-y-4 animate-fadeIn">
            <h3 className="text-xl font-bold">Sobre o Projeto</h3>
            <p>O Manual Rep&Aprova é uma maneira mais simples de aprender sobre elementos da mecânica. O sistema busca ensinar alunos da escola técnica a como entender mais sobre o funcionamento da bomba centrífuga</p>
            <p>Este projeto é resultado de semanas de pesquisa, desenvolvimento e testes práticos, aplicando os princípios fundamentais da engenharia mecânica.</p>
          </div>
        );
      case 'recursos':
        return (
          <div className="space-y-4 animate-fadeIn">
            <h3 className="text-xl font-bold">Recursos Principais</h3>
            <ul className="space-y-2">
              <li className="flex items-center"><ChevronRight className="text-blue-500 mr-2" size={18} /> Simulação de sistemas mecânicos em tempo real</li>
              <li className="flex items-center"><ChevronRight className="text-blue-500 mr-2" size={18} /> Cálculos automáticos de ajustes de bomba centrífuga</li>
              <li className="flex items-center"><ChevronRight className="text-blue-500 mr-2" size={18} /> Entendimento fácil e educativo</li>
              <li className="flex items-center"><ChevronRight className="text-blue-500 mr-2" size={18} /> Relatórios detalhados de análise de falhas</li>
              <li className="flex items-center"><ChevronRight className="text-blue-500 mr-2" size={18} /> Interface intuitiva</li>
            </ul>
          </div>
        );
      case 'equipe':
        return (
          <div className="space-y-4 animate-fadeIn">
            <h3 className="text-xl font-bold">Nossa Equipe</h3>
            <p>Somos um grupo de estudantes dedicados do curso técnico de Mecânica do SENAI, comprometidos com a inovação e excelência técnica. Nossa equipe multidisciplinar combina conhecimentos em:</p>
            <ul className="space-y-2">
              <li className="flex items-center"><ChevronRight className="text-blue-500 mr-2" size={18} /> Projeto mecânico e desenho técnico</li>
              <li className="flex items-center"><ChevronRight className="text-blue-500 mr-2" size={18} /> Materiais e processos de fabricação</li>
              <li className="flex items-center"><ChevronRight className="text-blue-500 mr-2" size={18} /> Automação e controle</li>
              <li className="flex items-center"><ChevronRight className="text-blue-500 mr-2" size={18} /> Programação e desenvolvimento de sistemas</li>
            </ul>
          </div>
        );
      default:
        return null;
    }
  };

  const CardFeature = ({ icon: Icon, title, description }) => (
    <div className="bg-slate-800 p-6 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20 hover:-translate-y-2 group">
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-14 h-14 rounded-lg flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110">
        <Icon size={24} className="text-white" />
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-slate-300">{description}</p>
    </div>
  );

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white overflow-hidden">
      {/* Background gears */}
      <Gear size={120} speed={20} position={{ top: '10%', right: '5%' }} opacity={0.2} />
      <Gear size={80} speed={15} position={{ top: '20%', left: '8%' }} opacity={0.1} />
      <Gear size={150} speed={25} position={{ bottom: '15%', right: '12%' }} opacity={0.15} />
      <Gear size={100} speed={18} position={{ bottom: '25%', left: '15%' }} opacity={0.1} />
      <Gear size={60} speed={12} position={{ top: '60%', right: '20%' }} opacity={0.2} />
      
      {/* Navigation */}
      <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-900/95 shadow-lg shadow-blue-900/20 py-2' : 'bg-transparent py-4'}`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Cog size={28} className="text-blue-500 animate-spin" style={{ animationDuration: '8s' }} />
              <Cog size={18} className="text-blue-400 absolute -top-1 -right-2 animate-spin" style={{ animationDuration: '6s', animationDirection: 'reverse' }} />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">Rep&Aprov</h1>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <a href="#inicio" className="hover:text-blue-400 transition-colors flex items-center gap-1.5 group">
              <span>Início</span>
              <div className="w-0 group-hover:w-full h-0.5 bg-blue-400 transition-all duration-300"></div>
            </a>
            <a href="#sobre" className="hover:text-blue-400 transition-colors flex items-center gap-1.5 group">
              <span>Sobre</span>
              <div className="w-0 group-hover:w-full h-0.5 bg-blue-400 transition-all duration-300"></div>
            </a>
            <a href="#recursos" className="hover:text-blue-400 transition-colors flex items-center gap-1.5 group">
              <span>Recursos</span>
              <div className="w-0 group-hover:w-full h-0.5 bg-blue-400 transition-all duration-300"></div>
            </a>
            <a href="#contato" className="hover:text-blue-400 transition-colors flex items-center gap-1.5 group">
              <span>Contato</span>
              <div className="w-0 group-hover:w-full h-0.5 bg-blue-400 transition-all duration-300"></div>
            </a>
          </nav>
          <Link to="/LoginPage">
            <button className="bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-600/50 transform hover:-translate-y-0.5 hidden md:block">
            Acessar Sistema
          </button>
          </Link>
          
        </div>
      </header>
      
      {/* Hero Section */}
      <section id="inicio" className="relative min-h-screen flex items-center pt-20">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6 z-10">
            <div className="inline-block bg-blue-900/30 py-1 px-3 rounded-full border border-blue-800">
              <p className="text-blue-400 text-sm font-medium flex items-center">
                <span>Trabalho de Conclusão de Curso</span>
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full ml-2"></span>
                <span className="ml-2">SENAI</span>
              </p>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Manual Inovador para <br />
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                Mecânica
              </span>
            </h1>
            
            <p className="text-slate-300 text-lg max-w-lg">
              Uma plataforma avançada desenvolvida por estudantes para revolucionar 
              o curso técnico de Mecânica com tecnologia de ponta e interface intuitiva.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg hover:shadow-blue-600/50 transform hover:-translate-y-1 group">
                <span>Conheça o Projeto</span>
                <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              <a
                href="https://github.com/IcaroDEVms/TCC-mecanica"
                target="_blank"
                rel="noopener noreferrer"
              ><button className="bg-transparent border border-slate-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-slate-800/50 transition-all duration-300 flex items-center justify-center gap-2">
                <span>Ver Documentação</span>
                <BookOpen size={18} />
              </button>
            </a>
            </div>  
            <div className="flex items-center gap-4 pt-6">
              <div className="flex -space-x-2">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">S</div>
                <div className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center text-white font-bold">E</div>
                <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">N</div>
              </div>
              <div className="text-sm text-slate-400">
                <p>Desenvolvido por alunos</p>
                <p className="font-semibold text-white">Curso Técnico de Mecânica</p>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative z-10 bg-slate-800/70 backdrop-blur-sm p-4 rounded-2xl border border-slate-700 shadow-xl">
            <div className="aspect-[4/3] rounded-lg overflow-hidden relative bg-slate-900">
              <img
                src="https://i.imgur.com/DaxwI1b.png"
                alt="Fundo do Sistema"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-70"></div>
              <div className="absolute bottom-6 left-6 z-10">
                <h3 className="text-xl font-bold">Sistema Rep&Aprov</h3>
                <p className="text-blue-400">Versão 1.0</p>
              </div>
            </div>
              <div className="flex justify-between items-center mt-4">
                <div className="flex space-x-2">
                  <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                  <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                </div>
                <div className="text-xs text-slate-400">Rep&Aprov.senai.2025</div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10">
              <div className="absolute w-64 h-64 rounded-full bg-blue-600/20 filter blur-3xl"></div>
              <div className="absolute w-64 h-64 rounded-full bg-indigo-600/20 filter blur-3xl -translate-x-1/2"></div>
            </div>
          </div>
        </div>
        
        
      </section>
      
      {/* About Section */}
      <section id="sobre" className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                Sobre o Projeto
              </span>
            </h2>
            <p className="text-slate-300">
              Desenvolvido como trabalho de conclusão do curso técnico em Mecânica do SENAI, 
              nosso sistema une tecnologia e conhecimentos técnicos para criar soluções inovadoras.
            </p>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 shadow-lg shadow-blue-900/5">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3">
                <div className="sticky top-20">
                  <div className="space-y-2 mb-6">
                    <button 
                      onClick={() => setActiveTab('sobre')}
                      className={`w-full text-left px-4 py-2 rounded-lg flex items-center transition-all ${activeTab === 'sobre' ? 'bg-blue-600 text-white' : 'hover:bg-slate-700'}`}
                    >
                      <BookOpen size={18} className="mr-2" />
                      <span>Sobre o Projeto</span>
                    </button>
                    
                    <button 
                      onClick={() => setActiveTab('recursos')}
                      className={`w-full text-left px-4 py-2 rounded-lg flex items-center transition-all ${activeTab === 'recursos' ? 'bg-blue-600 text-white' : 'hover:bg-slate-700'}`}
                    >
                      <Wrench size={18} className="mr-2" />
                      <span>Recursos</span>
                    </button>
                    
                    <button 
                      onClick={() => setActiveTab('equipe')}
                      className={`w-full text-left px-4 py-2 rounded-lg flex items-center transition-all ${activeTab === 'equipe' ? 'bg-blue-600 text-white' : 'hover:bg-slate-700'}`}
                    >
                      <Users size={18} className="mr-2" />
                      <span>Nossa Equipe</span>
                    </button>
                  </div>
                  
                  
                </div>
              </div>
              
              <div className="md:w-2/3">
                <TabContent />
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                  <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-900/30 flex items-center gap-3">
                    <div className="bg-blue-600/20 p-2 rounded-md">
                      <Clock size={20} className="text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-300">Tempo de Desenvolvimento</p>
                      <p className="font-medium text-white">6 meses</p>
                    </div>
                  </div>
                  
                  <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-900/30 flex items-center gap-3">
                    <div className="bg-blue-600/20 p-2 rounded-md">
                      <Users size={20} className="text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-300">Equipe</p>
                      <p className="font-medium text-white">5 alunos</p>
                    </div>
                  </div>
                  
                  <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-900/30 flex items-center gap-3">
                    <div className="bg-blue-600/20 p-2 rounded-md">
                
                    </div>
                    <div>
                      <p className="text-sm text-slate-300">Tecnologias</p>
                      <p className="font-medium text-white">3 integradas</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <Gear size={200} speed={30} position={{ bottom: '-5%', right: '-5%' }} opacity={0.1} />
      </section>
      
      {/* Features Section */}
      <section id="recursos" className="py-20 bg-slate-900 relative">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block px-3 py-1 rounded-full bg-blue-900/30 text-blue-400 font-medium text-sm mb-4">
              Recursos e Funcionalidades
            </div>
            <h2 className="text-3xl font-bold mb-4">
              Tecnologia Avançada para 
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent"> Projetos Mecânicos</span>
            </h2>
            <p className="text-slate-300">
              Nosso sistema oferece ferramentas completas para desenvolvimento, análise e documentação 
              de projetos em engenharia mecânica.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            
            <CardFeature 
              icon={Cog} 
              title="Quiz Dinâmico" 
              description="Teste o comportamento os seus conhecimentos mecânicos de maneira prática."
            />
            
            <CardFeature 
                icon={Award}
              title="Análise Estrutural" 
              description="Calcule tensões, deformações e fatores de segurança em componentes mecânicos."
            />
            
            
            
            <CardFeature 
              icon={BookOpen} 
              title="Documentação Técnica" 
              description="Gere relatórios detalhados e documentação técnica para os projetos desenvolvidos."
            />
            
            {/* Timeline end<CardFeature 
              icon={Users} 
              title="Colaboração" 
              description="Trabalhe em equipe com recursos de compartilhamento e controle de versões de projetos."
            /> */}
          </div>
          
          <div className="mt-16 text-center">
            <button className="bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 px-8 rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-blue-600/50 transform hover:-translate-y-1">
              Explorar Todos os Recursos
            </button>
          </div>
        </div>
        
        <Gear size={150} speed={25} position={{ top: '10%', left: '-5%' }} opacity={0.1} />
        <Gear size={100} speed={18} position={{ bottom: '20%', right: '5%' }} opacity={0.1} />
      </section>
      
      {/* Timeline Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                Nossa Jornada
              </span>
            </h2>
            <p className="text-slate-300">
              Confira as etapas do desenvolvimento do nosso projeto, desde a concepção 
              até a apresentação final.
            </p>
          </div>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute w-1 bg-blue-800/50 h-full left-1/2 transform -translate-x-1/2"></div>
            
            {/* Timeline items */}
            <div className="space-y-20">
              {/* Item 1 */}
              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-4 border-blue-500 bg-slate-900 z-10"></div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="md:text-right md:pr-8 transition-all duration-300 hover:-translate-y-1">
                    <h3 className="text-xl font-bold text-white">Concepção do Projeto</h3>
                    <p className="text-blue-400 mb-2">Janeiro 2025</p>
                    <p className="text-slate-300">Definição do escopo, objetivos e metodologia de desenvolvimento do sistema.</p>
                  </div>
                  <div className="md:pl-8"></div>
                </div>
              </div>
              
              {/* Item 2 */}
              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-4 border-blue-500 bg-slate-900 z-10"></div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="md:pr-8"></div>
                  <div className="md:pl-8 transition-all duration-300 hover:-translate-y-1">
                    <h3 className="text-xl font-bold text-white">Desenvolvimento da Base</h3>
                    <p className="text-blue-400 mb-2">Fevereiro 2025</p>
                    <p className="text-slate-300">Construção da estrutura fundamental do sistema e integração com bancos de dados.</p>
                  </div>
                </div>
              </div>
              
              {/* Item 3 */}
              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-4 border-blue-500 bg-slate-900 z-10"></div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="md:text-right md:pr-8 transition-all duration-300 hover:-translate-y-1">
                    <h3 className="text-xl font-bold text-white">Implementação de Recursos</h3>
                    <p className="text-blue-400 mb-2">Março 2025</p>
                    <p className="text-slate-300">Adição das funcionalidades principais e testes de desempenho.</p>
                  </div>
                  <div className="md:pl-8"></div>
                </div>
              </div>
              
              {/* Item 4 */}
              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-4 border-blue-500 bg-slate-900 z-10"></div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="md:pr-8"></div>
                  <div className="md:pl-8 transition-all duration-300 hover:-translate-y-1">
                    <h3 className="text-xl font-bold text-white">Validação e Testes</h3>
                    <p className="text-blue-400 mb-2">Abril 2025</p>
                    <p className="text-slate-300">Validação do sistema com usuários reais e ajustes baseados no feedback recebido.</p>
                  </div>
                </div>
              </div>
              
              {/* Item 5 */}
              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-4 border-blue-500 bg-slate-900 z-10"></div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="md:text-right md:pr-8 transition-all duration-300 hover:-translate-y-1">
                    <h3 className="text-xl font-bold text-white">Apresentação Final</h3>
                    <p className="text-blue-400 mb-2">Maio 2025</p>
                    <p className="text-slate-300">Demonstração do sistema finalizado e defesa do projeto perante a banca avaliadora.</p>
                  </div>
                  <div className="md:pl-8"></div>
                </div>
              </div>
            </div>
            
            {/* Timeline end */}
            <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0 w-4 h-4 rounded-full bg-blue-500 z-10 animate-pulse"></div>
          </div>
        </div>
        
        <Gear size={180} speed={22} position={{ top: '40%', right: '-8%' }} opacity={0.12} />
        <Gear size={120} speed={15} position={{ bottom: '10%', left: '-5%' }} opacity={0.15} />
      </section>
      
      {/* Technologies Section */}
      <section className="py-20 bg-slate-900 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block px-3 py-1 rounded-full bg-blue-900/30 text-blue-400 font-medium text-sm mb-4">
              Tecnologias Utilizadas
            </div>
            <h2 className="text-3xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                Tecnologias de Ponta
              </span>
            </h2>
            <p className="text-slate-300">
              Nosso sistema integra diversas tecnologias para oferecer uma experiência completa
              e funcionalidades avançadas para projetos mecânicos.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* Tech 1 */}
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 text-center transition-all duration-300 hover:bg-slate-800/80 hover:shadow-lg hover:shadow-blue-900/20 hover:-translate-y-1 group">
              <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4 rounded-lg bg-gradient-to-br from-slate-700 to-slate-800 border border-slate-600 group-hover:border-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-1">adicionar</h3>
              <p className="text-sm text-slate-400">adicionar</p>
            </div>
            
            
          </div>
          
          {/* Animated background gears */}
          <div className="relative h-16 mt-16 mb-8">
            <div className="absolute inset-0 overflow-hidden">
              <div className="flex justify-between items-center w-full h-full animate-slideLeft">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="text-slate-800 mx-8">
                    <svg width="40" height="40" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
                      <path 
                        d="M60,15 L65,15 L66.5,25 C70,25.6 73.2,26.8 76.1,28.4 L84.5,22.5 L88.7,26.7 L82.6,35.1 C84.2,38 85.4,41.2 86,44.7 L96,46 L96,52 L86,53.2 C85.4,56.8 84.2,60 82.6,62.9 L88.7,71.3 L84.5,75.5 L76.1,69.6 C73.2,71.2 70,72.4 66.5,73 L65,83 L60,83 L58.5,73 C55,72.4 51.8,71.2 48.9,69.6 L40.5,75.5 L36.3,71.3 L42.4,62.9 C40.8,60 39.6,56.8 39,53.2 L29,51.9 L29,45.9 L39,44.7 C39.6,41.1 40.8,37.9 42.4,35 L36.3,26.6 L40.5,22.4 L48.9,28.3 C51.8,26.7 55,25.5 58.5,24.9 L60,15 Z" 
                      />
                    </svg>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="absolute inset-0 overflow-hidden">
              <div className="flex justify-between items-center w-full h-full animate-slideRight" style={{ animationDelay: '0.5s' }}>
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="text-slate-800 mx-12">
                    <svg width="30" height="30" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
                      <path 
                        d="M60,15 L65,15 L66.5,25 C70,25.6 73.2,26.8 76.1,28.4 L84.5,22.5 L88.7,26.7 L82.6,35.1 C84.2,38 85.4,41.2 86,44.7 L96,46 L96,52 L86,53.2 C85.4,56.8 84.2,60 82.6,62.9 L88.7,71.3 L84.5,75.5 L76.1,69.6 C73.2,71.2 70,72.4 66.5,73 L65,83 L60,83 L58.5,73 C55,72.4 51.8,71.2 48.9,69.6 L40.5,75.5 L36.3,71.3 L42.4,62.9 C40.8,60 39.6,56.8 39,53.2 L29,51.9 L29,45.9 L39,44.7 C39.6,41.1 40.8,37.9 42.4,35 L36.3,26.6 L40.5,22.4 L48.9,28.3 C51.8,26.7 55,25.5 58.5,24.9 L60,15 Z" 
                      />
                    </svg>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <a href="https://www.senaibahia.com.br/cursotecnico/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors">
              <span>Saiba mais sobre o curso técnico de Mecânica do SENAI</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17l9.2-9.2M17 17V7H7"></path>
              </svg>
            </a>
          </div>
        </div>
      </section>
      
      {/* Testimonial Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                Feedbacks
              </span>
            </h2>
            <p className="text-slate-300">
              O que nossos orientadores e avaliadores estão dizendo sobre o projeto
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-2xl border border-slate-700 shadow-lg shadow-blue-900/5 transition-all duration-300 hover:shadow-blue-900/20 hover:-translate-y-1">
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-xl font-bold text-white">
                  PS
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-lg">Prof. Paulo Silva</h4>
                  <p className="text-blue-400 text-sm">Coordenador do Curso de Mecânica</p>
                </div>
              </div>
              
              <div className="mb-6">
                <svg width="100" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {[...Array(5)].map((_, i) => (
                    <path
                      key={i}
                      d="M9.15 4.25l1.65 5.25h5.45l-4.4 3.3 1.65 5.25-4.4-3.3-4.4 3.3 1.65-5.25-4.4-3.3h5.45z"
                      transform={`translate(${i * 20}, 0)`}
                      fill="#3B82F6"
                    />
                  ))}
                </svg>
              </div>
              
              <p className="text-slate-300 italic">
                "adicionar feedback."
              </p>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-2xl border border-slate-700 shadow-lg shadow-blue-900/5 transition-all duration-300 hover:shadow-blue-900/20 hover:-translate-y-1">
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-xl font-bold text-white">
                  LM
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-lg">Eng. Luiza Mendes</h4>
                  <p className="text-blue-400 text-sm">Avaliadora Externa - Empresa ABC</p>
                </div>
              </div>
              
              <div className="mb-6">
                <svg width="100" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {[...Array(5)].map((_, i) => (
                    <path
                      key={i}
                      d="M9.15 4.25l1.65 5.25h5.45l-4.4 3.3 1.65 5.25-4.4-3.3-4.4 3.3 1.65-5.25-4.4-3.3h5.45z"
                      transform={`translate(${i * 20}, 0)`}
                      fill="#3B82F6"
                    />
                  ))}
                </svg>
              </div>
              
              <p className="text-slate-300 italic">
                "adiciona feedback."
              </p>
            </div>
          </div>
        </div>
        
        <Gear size={220} speed={35} position={{ top: '20%', left: '-10%' }} opacity={0.08} />
        <Gear size={180} speed={25} position={{ bottom: '-5%', right: '-8%' }} opacity={0.1} />
      </section>
      
      {/* Contact Section */}
      <section id="contato" className="py-20 bg-slate-900 relative">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block px-3 py-1 rounded-full bg-blue-900/30 text-blue-400 font-medium text-sm mb-4">
              Entre em Contato
            </div>
            <h2 className="text-3xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                Quer Saber Mais?
              </span>
            </h2>
            <p className="text-slate-300">
              Entre em contato conosco para obter mais informações sobre o projeto 
              ou agendar uma demonstração do sistema.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 shadow-lg shadow-blue-900/5">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2" htmlFor="name">
                      Nome Completo
                    </label>
                    <input 
                      type="text" 
                      id="name" 
                      className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Seu nome" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2" htmlFor="email">
                      E-mail
                    </label>
                    <input 
                      type="email" 
                      id="email" 
                      className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="seu@email.com" 
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2" htmlFor="subject">
                    Assunto
                  </label>
                  <input 
                    type="text" 
                    id="subject" 
                    className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Assunto da mensagem" 
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2" htmlFor="message">
                    Mensagem
                  </label>
                  <textarea 
                    id="message" 
                    rows={5} 
                    className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    placeholder="Sua mensagem" 
                  />
                </div>
                
                <button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 px-6 rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-blue-600/50 transform hover:-translate-y-1 flex items-center justify-center gap-2"
                >
                  <span>Enviar Mensagem</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </form>
            </div>
            
            <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-700 shadow-lg shadow-blue-900/5 flex flex-col">
              <div className="p-8 flex-grow">
                <h3 className="text-xl font-bold mb-6">Informações de Contato</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-900/30 p-3 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-slate-400">E-mail</p>
                      <p className="font-medium text-white">contato@Rep&Aprov.senai.br</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-900/30 p-3 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-slate-400">Telefone</p>
                      <p className="font-medium text-white">(11) 1234-5678</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-900/30 p-3 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-slate-400">Endereço</p>
                      <p className="font-medium text-white">Rua da Inovação, 1000</p>
                      <p className="text-slate-400">São Paulo - SP</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h4 className="font-medium mb-4">Siga-nos</h4>
                  <div className="flex space-x-4">
                    <a href="#" className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-blue-400 hover:bg-blue-600 hover:text-white transition-all">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.24V8.05h2.218l-.354 2.326H9.25v5.625c3.824-.604 6.75-3.934 6.75-7.951C16 3.603 12.418 0 8 0C3.582 0 0 3.603 0 8.049c0 4.017 2.926 7.347 6.75 7.951V9.25H4.72V6.924h2.03V5.533c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25v5.625c3.824-.604 6.75-3.934 6.75-7.951z"/>
                      </svg>
                    </a>
                    
                    <a href="#" className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-blue-400 hover:bg-blue-600 hover:text-white transition-all">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                      </svg>
                    </a>
                    
                    <a href="#" className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-blue-400 hover:bg-blue-600 hover:text-white transition-all">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                      </svg>
                    </a>
                    
                    <a href="#" className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-blue-400 hover:bg-blue-600 hover:text-white transition-all">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-900/50 p-8 mt-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-sm text-slate-400">Disponível para demonstração</span>
                  </div>
                  <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                    Agendar apresentação
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900/80 border-t border-slate-800 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="relative">
                  <Cog size={24} className="text-blue-500" />
                  <Cog size={16} className="text-blue-400 absolute -top-1 -right-1" />
                </div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                  Rep&Aprov
                </h2>
              </div>
              <p className="text-slate-400 text-sm">
                Manual inovador para projetos mecânicos desenvolvido como TCC do curso técnico em Mecânica do SENAI.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-4">Links Rápidos</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#inicio" className="text-slate-400 hover:text-blue-400 transition-colors">Início</a></li>
                <li><a href="#sobre" className="text-slate-400 hover:text-blue-400 transition-colors">Sobre</a></li>
                <li><a href="#recursos" className="text-slate-400 hover:text-blue-400 transition-colors">Recursos</a></li>
                <li><a href="#contato" className="text-slate-400 hover:text-blue-400 transition-colors">Contato</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-4">Recursos</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">Documentação</a></li>
                <li><a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">Tutoriais</a></li>
                <li><a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">API</a></li>
                <li><a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">Suporte</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-4">Newsletter</h4>
              <p className="text-sm text-slate-400 mb-4">
                Receba atualizações sobre o projeto e novidades do setor.
              </p>
              <form className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Seu e-mail"
                  className="flex-grow px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button 
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Inscrever
                </button>
              </form>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-400">
              © 2025 Rep&Aprov. Todos os direitos reservados.
            </p>
            
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">Termos de Uso</a>
              <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">Privacidade</a>
              <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}