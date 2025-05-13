import { useState, useEffect } from 'react';
import {jsPDF} from 'jspdf';

export default function QuizMecanica() {
  // Estados para gerenciar o quiz
  const [faseAtual, setFaseAtual] = useState(0);
  const [respostas, setRespostas] = useState({});
  const [pontuacao, setPontuacao] = useState(0);
  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const [feedbackCorreto, setFeedbackCorreto] = useState(false);
  const [quizCompletado, setQuizCompletado] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const [isMobile, setIsMobile] = useState(false);
  const [camposVisiveis, setCamposVisiveis] = useState({});
  const [showExitModal, setShowExitModal] = useState(false);
  const [respostasVerificadas, setRespostasVerificadas] = useState({});
  const [faseJaPontuada, setFaseJaPontuada] = useState({});
  
  // Detectar tamanho da tela e ajustar para mobile
  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;
      setWindowWidth(width);
      setIsMobile(width < 768); // Define como mobile se a largura for menor que 768px
    }
    
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      handleResize(); // Verificar na carga inicial
      
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);
  
  // Resetar campos visíveis ao mudar de fase
  useEffect(() => {
    setCamposVisiveis({});
  }, [faseAtual]);

  // Função para mostrar um campo quando o botão é clicado
  const mostrarCampo = (campoId) => {
    setCamposVisiveis({
      ...camposVisiveis,
      [campoId]: true
    });
  };

  // Dados das fases do quiz
  const fases = [
    {
      id: 1,
      titulo: "Ajuste da Folga do Rotor",
      descricao: "Meça as dimensões necessárias para o ajuste da folga do rotor da bomba centrífuga",
      imagem: "../manual/M-01.png",
      imagemMobile: "../manual/M-01.png",
      campos: [
        { 
          id: 1,
          label: "Excentricidade do Anel (mm)", 
          labelMain:'Medição de Excentricidade do anel de desgaste do rotor LOA',
          x: 61,            // Posição X para desktop 
          y: 31,            // Posição Y para desktop
          xMobile: 75,      // Posição X para mobile
          yMobile: 15,      // Posição Y para mobile
          valorCorreto: "0.07",
          width: "160px",         // Largura da caixa para desktop
          minWidth: "120px",      // Largura mínima
          widthMobile: "140px",   // Largura para mobile
          inputWidth: "100px",    // Largura do input para desktop
          inputWidthMobile: "80px", // Largura do input para mobile
          inputHeight: "22px"     // Altura do input
        },
        { 
          id: 2, 
          label: "Excentricidade do cubo (mm)", 
          labelMain:"Medição de Excentricidade do cubo do aclopamento",
          x: 61, 
          y: 85,
          xMobile: 70,
          yMobile: 50, 
          valorCorreto: "0.07",
          width: "170px",
          minWidth: "150px",
          widthMobile: "140px",
          inputWidth: "100px",
          inputWidthMobile: "80px",
          inputHeight: "32px"
        },
      ]
    },
    {
      id: 2,
      titulo: "Alinhamento do Acoplamento",
      descricao: "Identifique as dimensões corretas para o alinhamento do acoplamento da bomba",
      imagem: "../manual/M-02.png",
      imagemMobile: "../manual/M-02.png",
      campos: [
        { 
          id: 3, 
          label: "Desalinhamento Radial (mm)", 
          labelMain:"Medição de excentricidade da guia de caixa de mancais",
          x: 36, 
          y: 39,
          xMobile: 75,
          yMobile: 15,
          valorCorreto: "0.07",
          width: "150px",
          widthMobile: "140px",
          inputWidth: "100px",
          inputWidthMobile: "80px"
        },
        { 
          id: 4, 
          label: "Desalinhamento Angular (mm)",
          labelMain:"Medição de Excentricidade do anel de desgaste do motor LA", 
          x: 67, 
          y: 39, 
          xMobile: 70,
          yMobile: 50,
          valorCorreto: "0.07",
          width: "220px",
          widthMobile: "140px",
          inputWidth: "100px",
          inputWidthMobile: "80px"
        },
      ]
    },
    {
      id: 3,
      titulo: "Dimensionamento do Selo Mecânico",
      descricao: "Insira as medidas corretas para a instalação do selo mecânico",
      imagem: "../manual/M-03.png",
      imagemMobile: "../manual/M-03.png",
      campos: [
        { 
          id: 5, 
          label: "Comprimento de Inserção (mm)", 
          labelMain: "Medição de excentricidade do anel de desgaste da caixa de selagem",
          x: 33, 
          y: 40, 
          xMobile: 75,
          yMobile: 15,
          valorCorreto: "12.5",
          width: "220px",
          widthMobile: "140px",
          inputWidth: "100px",
          inputWidthMobile: "80px"
        },
        { 
          id: 6, 
          label: "Diâmetro Interno (mm)", 
          labelMain: "Medição da excentricidade das guias dos selos componente e selo cartucho",
          x: 33, 
          y: 55, 
          xMobile: 70,
          yMobile: 50,
          valorCorreto: "45.2",
          width: "200px",
          widthMobile: "140px",
          inputWidth: "100px",
          inputWidthMobile: "80px"
        },
        { 
          id: 7, 
          label: "Espessura da Face (mm)", 
          labelMain: "Medição da excentricidade da guia da caixa de selagem",
          x: 68, 
          y: 45, 
          xMobile: 65,
          yMobile: 85,
          valorCorreto: "1.8",
          width: "200px",
          widthMobile: "140px",
          inputWidth: "100px",
          inputWidthMobile: "80px"
        },
      ]
    }
  ];

  const normalizarNumero = (valor) => {
  if (!valor) return '';
  // Substitui vírgula por ponto e remove caracteres não numéricos exceto ponto e vírgula
  return valor.toString()
    .replace(/[^\d,.-]/g, '')  // Remove tudo que não for número, vírgula, ponto ou sinal negativo
    .replace(/,/g, '.');       // Substitui vírgula por ponto
};

  // Verificar resposta e mostrar feedback
  const verificarRespostas = () => {
  const fase = fases[faseAtual];
  let todasCorretas = true;
  
  fase.campos.forEach(campo => {
    if (camposVisiveis[campo.id]) {
      const respostaUsuario = normalizarNumero(respostas[`${fase.id}_${campo.id}`]);
      const valorCorretoNormalizado = normalizarNumero(campo.valorCorreto);
      
      if (respostaUsuario !== valorCorretoNormalizado) {
        todasCorretas = false;
      }
    }
  });
  
  setFeedbackCorreto(todasCorretas);
  setFeedbackVisible(true);
  
  if (todasCorretas && !faseJaPontuada[faseAtual]) {
    setPontuacao(pontuacao + 100);
    setFaseJaPontuada({...faseJaPontuada, [faseAtual]: true});
  }
  
};

  // Próxima fase
  const proximaFase = () => {
  setFeedbackVisible(false);
  if (faseAtual < fases.length - 1) {
    setFaseAtual(faseAtual + 1);
  } else {
    setQuizCompletado(true);
  }
};

  // Fase anterior
  const faseAnterior = () => {
    if (faseAtual > 0) {
      setFaseAtual(faseAtual - 1);
    }
  };

  // Reiniciar quiz
  const reiniciarQuiz = () => {
  setFaseAtual(0);
  setRespostas({});
  setPontuacao(0);
  setQuizCompletado(false);
  setCamposVisiveis({});
  setRespostasVerificadas({});
  setFaseJaPontuada({});
};

  // Atualizar respostas
  const handleInputChange = (faseId, campoId, valor) => {
  const valorNormalizado = normalizarNumero(valor);
  
  // Verifica se o valor normalizado é um número válido ou string vazia
  if (valorNormalizado === '' || !isNaN(valorNormalizado)) {
    setRespostas({
      ...respostas,
      [`${faseId}_${campoId}`]: valorNormalizado
    });
  }
};

  const faseDados = fases[faseAtual];

  // Verificar se todas as respostas da fase atual foram preenchidas
  const todasRespostasPreenchidas = faseDados.campos
  .filter(campo => camposVisiveis[campo.id])
  .every(campo => respostas[`${faseDados.id}_${campo.id}`]);

  const handleExit = () => {
  window.location.href = 'TelaInicial';
};

  // Função para gerar e baixar o relatório em PDF
  const baixarRelatorioPDF = () => {
    const doc = new jsPDF();
    
    // Configurações iniciais
    const margin = 15;
    let yPos = margin;
    const lineHeight = 7;
    const pageHeight = doc.internal.pageSize.height - margin;
    
    // Adicionar título
    doc.setFontSize(20);
    doc.setTextColor(40, 53, 147);
    doc.text('Relatório do Quiz - Manutenção de Bombas', 105, yPos, { align: 'center' });
    yPos += lineHeight * 2;
    
    // Adicionar informações gerais
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    
    const dataFormatada = new Date().toLocaleString('pt-BR');
    doc.text(`Data: ${dataFormatada}`, margin, yPos);
    yPos += lineHeight;
    
    doc.text(`Pontuação Final: ${pontuacao} pontos`, margin, yPos);
    yPos += lineHeight;
    
    const desempenho = (pontuacao / (fases.length * 100) * 100).toFixed(1);
    doc.text(`Desempenho: ${desempenho}%`, margin, yPos);
    yPos += lineHeight * 2;
    
    // Adicionar detalhes por fase
    doc.setFontSize(14);
    doc.setTextColor(40, 53, 147);
    doc.text('Detalhes por Fase:', margin, yPos);
    yPos += lineHeight * 1.5;
    
    fases.forEach((fase, index) => {
      // Verificar se precisa de nova página
      if (yPos > pageHeight - 30) {
        doc.addPage();
        yPos = margin;
      }
      
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text(`Fase ${index + 1}: ${fase.titulo}`, margin, yPos);
      yPos += lineHeight;
      
      fase.campos.forEach(campo => {
        const respostaUsuario = respostas[`${fase.id}_${campo.id}`] || 'Não respondido';
        const correta = respostaUsuario === campo.valorCorreto;
        
        // Definir cor com base na correção da resposta
        if (correta) {
          doc.setTextColor(0, 128, 0); // Verde para respostas corretas
        } else {
          doc.setTextColor(255, 0, 0); // Vermelho para respostas incorretas
        }
        
        doc.setFontSize(10);
        doc.text(`- ${campo.label}:`, margin + 5, yPos);
        doc.text(` ${respostaUsuario}`, margin + 60, yPos);
        
        // Voltar para cor preta para a resposta correta
        doc.setTextColor(0, 0, 0);
        doc.text(`(Correto: ${campo.valorCorreto})`, margin + 70, yPos);
                
        yPos += lineHeight;
      });
      
      yPos += lineHeight * 0.5;
    });
    
    // Adicionar rodapé
    doc.addPage();
    yPos = margin;
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text('Relatório gerado pelo Quiz de Manutenção de Bombas Centrífugas', 105, yPos, { align: 'center' });
    yPos += lineHeight;
    doc.text('Desenvolvido para estudantes de mecânica', 105, yPos, { align: 'center' });
    
    // Salvar o PDF
    doc.save(`relatorio-quiz-bombas-${new Date().toISOString().split('T')[0]}.pdf`);
  };

  if (quizCompletado) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 relative">
      {/* Botão X de sair */}
      <button 
        onClick={() => setShowExitModal(true)}
        className="absolute right-4 top-4 text-gray-600 hover:text-gray-800 focus:outline-none"
        aria-label="Sair do quiz"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">Quiz Completo!</h1>
        <p className="text-xl mb-4">Parabéns! Você completou o quiz sobre manutenção de bombas centrífugas.</p>
        <p className="text-2xl font-bold mb-6">Pontuação final: {pontuacao} pontos</p>
        <div className="flex flex-col space-y-3">
          <button 
            onClick={reiniciarQuiz}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
          >
            Reiniciar Quiz
          </button>
          <button 
            onClick={baixarRelatorioPDF}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Baixar Relatório (PDF)
          </button>
          <button 
            onClick={() => setShowExitModal(true)}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Sair do Quiz
          </button>
        </div>
      </div>

      {/* Modal de confirmação para sair */}
      {showExitModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm mx-4">
            <div className="text-center">
              <h3 className="text-xl font-bold mb-4">Tem certeza que deseja sair?</h3>
              <p className="mb-6">Você será redirecionado para a página inicial.</p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => setShowExitModal(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg transition-colors duration-300"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleExit}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
                >
                  Sair
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Cabeçalho */}
      <header className="bg-blue-600 text-white p-4">
        {/* Botão de sair */}
        <button 
          onClick={() => setShowExitModal(true)}
          className="absolute right-4 top-4 text-white hover:text-gray-200 focus:outline-none"
          aria-label="Sair do quiz"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <h1 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold mb-2 md:mb-0 text-center md:text-left`}>
            Quiz de Mecânica: Bombas Centrífugas
          </h1>
          <div className="bg-blue-800 px-4 py-2 rounded-lg">
            <span className="font-bold">Pontuação: {pontuacao}</span>
          </div>
        </div>
      </header>

      {showExitModal && (
  <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm mx-4">
      <div className="text-center">
        <h3 className="text-xl font-bold mb-4">Tem certeza que deseja sair?</h3>
        <p className="mb-6">Suas respostas não serão salvas.</p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => setShowExitModal(false)}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg transition-colors duration-300"
          >
            Cancelar
          </button>
          <button
            onClick={handleExit}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
          >
            Sair
          </button>
        </div>
      </div>
    </div>
  </div>
)}

      {/* Conteúdo principal */}
      <main className="flex-grow container mx-auto p-4">
        {/* Progresso */}
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span>Progresso:</span>
            <span>{faseAtual + 1}/{fases.length}</span>
          </div>
          <div className="w-full bg-gray-300 rounded-full h-2.5">
            <div 
              className="bg-blue-600 h-2.5 rounded-full" 
              style={{ width: `${((faseAtual + 1) / fases.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Informações da fase */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold mb-2">{faseDados.titulo}</h2>
          <p className="text-gray-700 mb-4">{faseDados.descricao}</p>
        </div>

        {/* Área de quiz interativa */}
        <div className="bg-white rounded-lg shadow-lg p-6 relative">
          {/* Imagem central - responsiva */}
          <div className="relative mb-6 flex justify-center">
            <img 
              src={isMobile ? (faseDados.imagemMobile || faseDados.imagem) : faseDados.imagem} 
              alt={faseDados.titulo} 
              className="rounded-lg border-2 border-gray-300 max-w-full"
            />
            
            {/* Inputs posicionados em torno da imagem - mostrados apenas se visíveis */}
            {faseDados.campos.map((campo) => (
              camposVisiveis[campo.id] ? (
                <div 
                  key={campo.id}
                  className="absolute bg-white border-2 border-blue-500 rounded-lg shadow-md"
                  style={{ 
                    left: `${isMobile ? (campo.xMobile || campo.x) : campo.x}%`, 
                    top: `${isMobile ? (campo.yMobile || campo.y) : campo.y}%`,
                    transform: 'translate(-50%, -50%)',
                    width: isMobile ? (campo.widthMobile || '140px') : (campo.width || 'auto'),
                    minWidth: campo.minWidth || '120px',
                    padding: isMobile ? '0.5rem' : '0.75rem',
                  }}
                >
                  <label className={`block ${isMobile ? 'text-xs' : 'text-sm'} font-medium mb-1`}>
                    {campo.label}
                  </label>
                  <input
                    type="text"
                    value={respostas[`${faseDados.id}_${campo.id}`] || ''}
                    onChange={(e) => {
                      if (!respostasVerificadas[`${faseDados.id}_${campo.id}`]) {
                        handleInputChange(faseDados.id, campo.id, e.target.value);
                      }
                    }}
                    onKeyPress={(e) => {
                      if (respostasVerificadas[`${faseDados.id}_${campo.id}`] || 
                          (!/[0-9,.-]/.test(e.key) && 
                          e.key !== 'Backspace' && 
                          e.key !== 'Delete' && 
                          e.key !== 'ArrowLeft' && 
                          e.key !== 'ArrowRight')) {
                        e.preventDefault();
                      }
                    }}
                    className={`border border-gray-300 rounded px-2 py-1 text-center ${
                      respostasVerificadas[`${faseDados.id}_${campo.id}`] ? 'bg-gray-100 cursor-not-allowed' : ''
                    }`}
                    style={{
                      width: isMobile ? (campo.inputWidthMobile || '80px') : (campo.inputWidth || '100px'),
                      height: isMobile ? '28px' : (campo.inputHeight || '32px'),
                      fontSize: isMobile ? '0.8rem' : '1rem'
                    }}
                    placeholder="0,0"
                    readOnly={respostasVerificadas[`${faseDados.id}_${campo.id}`]}
                  />
                </div>
              ) : (
                <button
                  key={`btn-${campo.id}`}
                  onClick={() => mostrarCampo(campo.id)}
                  className="absolute bg-blue-500 hover:bg-blue-600 text-white rounded-lg p-2 text-xs md:text-sm flex items-center justify-center"
                  style={{ 
                    left: `${isMobile ? (campo.xMobile || campo.x) : campo.x}%`, 
                    top: `${isMobile ? (campo.yMobile || campo.y) : campo.y}%`,
                    transform: 'translate(-50%, -50%)',
                    width: isMobile ? (campo.widthMobile || '140px') : (campo.width || 'auto'),
                    height: isMobile ? '60px' : '80px'
                  }}
                >
                  {campo.labelMain}
                </button>
              )
            ))}
          </div>

          {/* Feedback visual - responsivo */}
          {feedbackVisible && (
  <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
    <div className={`p-4 md:p-6 rounded-lg shadow-lg ${feedbackCorreto ? 'bg-green-100' : 'bg-red-100'} max-w-xs md:max-w-sm mx-4`}>
      <div className="text-center">
        <div className={`inline-flex items-center justify-center ${isMobile ? 'w-12 h-12' : 'w-16 h-16'} rounded-full mb-3 md:mb-4 ${feedbackCorreto ? 'bg-green-500' : 'bg-red-500'}`}>
          <span className={`text-white ${isMobile ? 'text-xl' : 'text-2xl'}`}>
            {feedbackCorreto ? '✓' : '✗'}
          </span>
        </div>
        <h3 className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold mb-2`}>
          {feedbackCorreto ? 'Correto!' : 'Incorreto!'}
        </h3>
        <p className={`${isMobile ? 'text-sm' : 'text-base'} mb-4`}>
          {feedbackCorreto 
            ? 'Parabéns! Todas as medidas estão corretas.' 
            : 'Verifique novamente os valores inseridos.'}
        </p>
        <button
          onClick={() => {
            setFeedbackVisible(false);
            if (faseAtual < fases.length - 1) {
              setFaseAtual(faseAtual + 1);
            } else {
              setQuizCompletado(true);
            }
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
        >
          Continuar
        </button>
      </div>
    </div>
  </div>
)}

          {/* Botões de navegação e verificação - responsivos */}
          <div className={`${isMobile ? 'flex flex-col space-y-2' : 'flex justify-between'} mt-6`}>
            <button
              onClick={faseAnterior}
              disabled={faseAtual === 0}
              className={`${isMobile ? 'w-full' : 'px-4'} py-2 rounded-lg ${
                faseAtual === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              Anterior
            </button>
            
            <div className="flex flex-col items-center">
              <button
                onClick={verificarRespostas}
                disabled={!todasRespostasPreenchidas || Object.keys(camposVisiveis).length === 0}
                className={`${isMobile ? 'w-full' : 'px-4'} py-2 rounded-lg ${
                  !todasRespostasPreenchidas || Object.keys(camposVisiveis).length === 0
                    ? 'bg-gray-300 cursor-not-allowed' 
                    : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
              >
                Verificar Respostas
              </button>
              {Object.keys(camposVisiveis).length === 0 && (
                <p className="text-red-500 text-sm mt-2 text-center">
                  Clique nos botões na imagem para adicionar os valores a serem verificados
                </p>
              )}
            </div>
            
            <button
              onClick={proximaFase}
              disabled={faseAtual === fases.length - 1}
              className={`${isMobile ? 'w-full' : 'px-4'} py-2 rounded-lg ${
                faseAtual === fases.length - 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              Próxima
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}