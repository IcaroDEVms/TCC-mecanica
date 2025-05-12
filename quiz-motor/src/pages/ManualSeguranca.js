import Navbar from '../components/Navbar';
import '../styles/ManualSeguranca.css';

const ManualSeguranca = () => {
  const epis = [
    {
      id: 1,
      name: "Capacete de Segurança",
      description: "Proteção contra impactos na cabeça causados por quedas de objetos ou choques contra obstáculos.",
      norm: "NR-6 / ABNT NBR 8221"
    },
    {
      id: 2,
      name: "Óculos de Proteção",
      description: "Proteção contra partículas volantes, respingos de produtos químicos e radiação.",
      norm: "NR-6 / ABNT NBR 14604"
    },
    {
      id: 3,
      name: "Protetor Auricular",
      description: "Redução dos níveis de ruído que atingem o ouvido interno, prevenindo perda auditiva.",
      norm: "NR-6 / ABNT NBR 16077"
    },
    {
      id: 4,
      name: "Respirador",
      description: "Proteção contra inalação de poeiras, fumos, névoas, gases ou vapores químicos.",
      norm: "NR-6 / ABNT NBR 13694"
    },
    {
      id: 5,
      name: "Luvas de Proteção",
      description: "Proteção das mãos contra agentes cortantes, químicos, térmicos ou biológicos.",
      norm: "NR-6 / ABNT NBR 16359"
    },
    {
      id: 6,
      name: "Calçado de Segurança",
      description: "Proteção contra impactos, perfurações, quedas e choques elétricos.",
      norm: "NR-6 / ABNT NBR 20345"
    }
  ];

  const normas = [
    "NR-6 - Equipamento de Proteção Individual (EPI)",
    "NR-12 - Segurança no Trabalho em Máquinas e Equipamentos",
    "NR-15 - Atividades e Operações Insalubres",
    "NR-18 - Condições e Meio Ambiente de Trabalho na Indústria da Construção",
    "ABNT NBR 16359 - Luvas de proteção",
    "ABNT NBR 20345 - Calçados de segurança"
  ];

  const procedimentos = [
    "Inspecionar o EPI antes de cada uso",
    "Utilizar o EPI adequado para cada atividade",
    "Manter os EPIs limpos e em boas condições",
    "Armazenar em local adequado após o uso",
    "Comunicar qualquer dano ou defeito no EPI",
    "Substituir o EPI quando danificado ou vencido"
  ];

  return (
    <div className="manual-seguranca">
      <Navbar />
      <div className="content-container">
        <div className="page-header">
          <h1>Manual de Segurança EPI</h1>
          <p>Normas e procedimentos para utilização correta de Equipamentos de Proteção Individual</p>
        </div>

        <div className="section">
          <h2>O que é EPI?</h2>
          <p>
            Equipamento de Proteção Individual (EPI) é todo dispositivo ou produto de uso individual utilizado pelo trabalhador, destinado à proteção de riscos suscetíveis de ameaçar a segurança e a saúde no trabalho.
          </p>
        </div>

        <div className="section">
          <h2>Principais EPIs</h2>
          <div className="epi-list">
            {epis.map(epi => (
              <div key={epi.id} className="epi-item">
                <h3>{epi.name}</h3>
                <p>{epi.description}</p>
                <p><strong>Norma:</strong> {epi.norm}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="section">
          <h2>Normas de Segurança</h2>
          <ul>
            {normas.map((norma, index) => (
              <li key={index} style={{ marginBottom: '10px' }}>{norma}</li>
            ))}
          </ul>
        </div>

        <div className="section">
          <h2>Procedimentos de Segurança</h2>
          <ol>
            {procedimentos.map((procedimento, index) => (
              <li key={index} style={{ marginBottom: '10px' }}>{procedimento}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default ManualSeguranca;