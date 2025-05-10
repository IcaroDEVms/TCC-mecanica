import { useState, useEffect } from 'react';
import { ChevronRight, Award, RefreshCw, BarChart2, Check, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Componente principal do App
export default function MaintenanceQuiz() {
  const [currentScreen, setCurrentScreen] = useState('start');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [showCorrect, setShowCorrect] = useState(false);
  const [showIncorrect, setShowIncorrect] = useState(false);
  const [showTimeUp, setShowTimeUp] = useState(false);

  // Lista de questões baseadas no fluxograma de manutenção
  const questions = [
    {
      id: 1,
      category: "Excentricidade",
      question: "Qual o valor máximo aceitável para o anel de desgaste do rotor LOA?",
      options: ["0,05mm", "0,07mm", "0,10mm", "0,15mm"],
      correctAnswer: 1,
      explanation: "Conforme a posição 01 do procedimento, o valor máximo aceitável para o anel de desgaste do rotor LOA é de 0,07mm."
    },
    {
      id: 2,
      category: "Excentricidade",
      question: "Qual é a excentricidade máxima permitida para o cubo de acoplamento?",
      options: ["0,03mm", "0,05mm", "0,07mm", "0,10mm"],
      correctAnswer: 2,
      explanation: "De acordo com a posição 02, a excentricidade máxima do cubo de acoplamento deve ser de -0,07mm."
    },
    {
      id: 3,
      category: "Excentricidade",
      question: "Qual o valor de excentricidade do eixo da caixa de mancais?",
      options: ["0,05mm", "0,07mm", "0,09mm", "0,10mm"],
      correctAnswer: 1,
      explanation: "Conforme a posição 03, a excentricidade do eixo da caixa de mancais deve ser de -0,07mm."
    },
    {
      id: 4,
      category: "Excentricidade",
      question: "Qual a excentricidade máxima para o anel de desgaste do rotor LA?",
      options: ["0,05mm", "0,07mm", "0,09mm", "0,10mm"],
      correctAnswer: 1,
      explanation: "Conforme a posição 04, a excentricidade do anel de desgaste do rotor LA deve ser de -0,07mm."
    },
    {
      id: 5,
      category: "Excentricidade",
      question: "Qual valor máximo de excentricidade para a caixa de selagem?",
      options: ["0,05mm", "0,07mm", "0,09mm", "0,10mm"],
      correctAnswer: 1,
      explanation: "Conforme a posição 05, a excentricidade do anel de desgaste da caixa de selagem deve ser de -0,07mm."
    },
    {
      id: 6,
      category: "Excentricidade",
      question: "Qual o valor de excentricidade das guias dos selos componente e selo cartucho?",
      options: ["0,07mm", "0,09mm", "0,10mm", "0,12mm"],
      correctAnswer: 2,
      explanation: "De acordo com a posição 06, a excentricidade das guias dos selos componente e selo cartucho deve ser de -0,10mm."
    },
    {
      id: 7,
      category: "Excentricidade",
      question: "Qual o valor de excentricidade da guia da caixa de Selagem?",
      options: ["0,05mm", "0,07mm", "0,09mm", "0,10mm"],
      correctAnswer: 1,
      explanation: "Conforme a posição 07, a excentricidade da guia da caixa de Selagem deve ser de -0,07mm."
    },
    {
      id: 8,
      category: "Empeno",
      question: "Qual o empeno máximo permitido para a junção/região do rotor?",
      options: ["Max 0,03mm", "Max 0,05mm", "Max 0,07mm", "Max 0,10mm"],
      correctAnswer: 0,
      explanation: "De acordo com a posição 08, o empeno máximo (Run-Out) na região do rotor deve ser de Max 0,03mm."
    },
    {
      id: 9,
      category: "Empeno",
      question: "Qual o empeno máximo permitido para o cubo de acoplamento?",
      options: ["Max 0,02mm", "Max 0,03mm", "Max 0,05mm", "Max 0,07mm"],
      correctAnswer: 2,
      explanation: "De acordo com a posição 09, o empeno máximo (Run-Out) do cubo de acoplamento deve ser de Max 0,05mm."
    },
    {
      id: 10,
      category: "Perpendicularidade",
      question: "Qual o valor máximo de perpendicularidade do encoste da caixa de Selagem?",
      options: ["0,01mm", "0,02mm", "0,03mm", "0,05mm"],
      correctAnswer: 2,
      explanation: "De acordo com a posição 10, a perpendicularidade do encoste da caixa de Selagem deve ser de -0,03mm."
    },
    {
      id: 11,
      category: "Perpendicularidade",
      question: "Qual a perpendicularidade máxima do encoste da carcaça?",
      options: ["0,01mm", "0,02mm", "0,03mm", "0,05mm"],
      correctAnswer: 2,
      explanation: "De acordo com a posição 11, a perpendicularidade do encoste da carcaça deve ser de -0,03mm."
    },
    {
      id: 12,
      category: "Perpendicularidade",
      question: "Qual o valor de perpendicularidade do encoste da Sobreposta?",
      options: ["0,01mm", "0,03mm", "0,05mm", "0,07mm"],
      correctAnswer: 2,
      explanation: "De acordo com a posição 12, a perpendicularidade do encoste da Sobreposta deve ser de -0,05mm."
    },
    {
      id: 13,
      category: "Perpendicularidade",
      question: "Qual a perpendicularidade máxima do encoste do cubo de acoplamento?",
      options: ["0,01mm", "0,03mm", "0,05mm", "0,07mm"],
      correctAnswer: 1,
      explanation: "De acordo com a posição 13, a perpendicularidade do encoste do cubo de acoplamento deve ser de -0,03mm."
    },
    {
      id: 14,
      category: "Folga Axial",
      question: "O que deve ser medido na categoria de Folga Axial?",
      options: ["A folga da caixa de mancais", "O jogo axial", "A excentricidade do rotor", "O empeno do acoplamento"],
      correctAnswer: 1,
      explanation: "De acordo com a posição 15, na categoria de Folga Axial deve ser medido o jogo axial."
    }
  ];

  // Resetar o jogo
  const resetGame = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowExplanation(false);
    setSelectedAnswer(null);
    setAnswered(false);
    setTimeLeft(30);
    setIsTimerRunning(false);
    setCompletedSteps([]);
    setShowConfetti(false);
    setLives(3);
    setGameOver(false);
    setCurrentScreen('game');
  };

  // Verificar a resposta
  const checkAnswer = (index) => {
    if (answered) return;
    
    const correct = index === questions[currentQuestion].correctAnswer;
    setSelectedAnswer(index);
    setAnswered(true);
    setIsTimerRunning(false);
    
    if (correct) {
      setScore(score + 100);
      setShowCorrect(true);
      setTimeout(() => {
        setShowCorrect(false);
      }, 1000);
    } else {
      setLives(lives - 1);
      setShowIncorrect(true);
      setTimeout(() => {
        setShowIncorrect(false);
      }, 1000);
      
      if (lives - 1 <= 0) {
        setGameOver(true);
      }
    }
  };

  // Ir para a próxima questão
  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1 && !gameOver) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setAnswered(false);
      setShowExplanation(false);
      setTimeLeft(30);
      setIsTimerRunning(true);
      setCompletedSteps([...completedSteps, currentQuestion]);
    } else if (!gameOver) {
      setCompletedSteps([...completedSteps, currentQuestion]);
      setCurrentScreen('result');
      setShowConfetti(true);
    } else {
      setCurrentScreen('gameOver');
    }
  };

  // Timer
  useEffect(() => {
    let timer;
    if (isTimerRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0 && isTimerRunning) {
      setAnswered(true);
      setIsTimerRunning(false);
      setLives(lives - 1);
      setShowTimeUp(true); // Mostra o feedback de tempo esgotado
      
      // Esconde o feedback após 2 segundos
      setTimeout(() => {
        setShowTimeUp(false);
        // Se ainda tiver vidas, continua o jogo
        if (lives - 1 > 0) {
          nextQuestion();
        } else {
          setGameOver(true);
        }
      }, 2000);
    }

    return () => clearInterval(timer);
  }, [isTimerRunning, timeLeft, lives]);

  // Iniciar o timer quando o jogo começa
  useEffect(() => {
    if (currentScreen === 'game') {
      setIsTimerRunning(true);
    }
  }, [currentScreen]);

  // Componente de tela inicial
  const StartScreen = () => (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl"
      >
        <h1 className="text-5xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
          Quiz de Manutenção
        </h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Card principal */}
          <motion.div 
            className="bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-xl"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Teste seus conhecimentos
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Desafie-se neste quiz sobre procedimentos de manutenção e prove sua expertise técnica!
            </p>
            <button 
              onClick={() => setCurrentScreen('game')}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-8 rounded-2xl font-medium 
              shadow-lg hover:shadow-xl transform transition duration-300 hover:scale-[1.02] hover:from-blue-600 hover:to-purple-700"
            >
              Iniciar Desafio
            </button>
          </motion.div>

          {/* Card de features */}
          <motion.div 
            className="bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-xl"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              O que você vai encontrar
            </h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-2xl">
                  <ChevronRight className="text-blue-600 w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">14 Questões Técnicas</h3>
                  <p className="text-gray-600">Abordando excentricidade, empeno e perpendicularidade</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-green-100 p-3 rounded-2xl">
                  <Award className="text-green-600 w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Sistema de Pontuação</h3>
                  <p className="text-gray-600">Ganhe pontos e acompanhe seu progresso</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-purple-100 p-3 rounded-2xl">
                  <BarChart2 className="text-purple-600 w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">3 Chances</h3>
                  <p className="text-gray-600">Use suas vidas com sabedoria para completar o desafio</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );

  // Componente de tela de jogo
  const GameScreen = () => {
    const question = questions[currentQuestion];
    
    return (
      <div className="flex flex-col h-full">
        {/* Cabeçalho com progresso */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-b-2xl shadow-md">
          <div className="flex justify-between items-center text-white mb-2">
            <div className="flex items-center gap-2">
              <span className="font-bold">Vidas:</span>
              {[...Array(3)].map((_, i) => (
                <span key={i} className={`text-2xl ${i < lives ? 'opacity-100' : 'opacity-30'}`}>❤️</span>
              ))}
            </div>
            <div className="font-bold text-xl">{score} pts</div>
          </div>
          
          {/* Barra de progresso */}
          <div className="w-full bg-white/30 rounded-full h-2.5">
            <div 
              className="bg-white h-2.5 rounded-full transition-all duration-500" 
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
          
          <div className="flex justify-between text-white/80 text-sm mt-1">
            <span>Questão {currentQuestion + 1}/{questions.length}</span>
            <span>{timeLeft} segundos</span>
          </div>
        </div>
        
        {/* Conteúdo da questão */}
        <div className="flex-1 p-4 overflow-auto">
          <div className="bg-white rounded-xl shadow-md p-5 mb-4">
            <div className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mb-3">
              {question.category}
            </div>
            <h2 className="text-xl font-bold mb-6">{question.question}</h2>
            
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => checkAnswer(index)}
                  disabled={answered}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    selectedAnswer === index 
                      ? index === question.correctAnswer
                        ? 'border-green-500 bg-green-50'
                        : 'border-red-500 bg-red-50'
                      : answered && index === question.correctAnswer
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-6 h-6 rounded-full mr-3 flex items-center justify-center ${
                      selectedAnswer === index 
                        ? index === question.correctAnswer
                          ? 'bg-green-500 text-white'
                          : 'bg-red-500 text-white'
                        : answered && index === question.correctAnswer
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-200'
                    }`}>
                      {selectedAnswer === index ? (
                        index === question.correctAnswer ? <Check size={16} /> : <X size={16} />
                      ) : answered && index === question.correctAnswer ? (
                        <Check size={16} />
                      ) : (
                        String.fromCharCode(65 + index)
                      )}
                    </div>
                    {option}
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          {/* Explicação */}
          {answered && (
            <div className={`bg-white rounded-xl shadow-md p-5 mb-4 ${
              showExplanation ? 'opacity-100' : 'opacity-0 h-0 p-0 overflow-hidden'
            } transition-all duration-500`}>
              <h3 className="font-bold mb-2">Explicação:</h3>
              <p>{question.explanation}</p>
            </div>
          )}
          
          {/* Botões de ação */}
          <div className="flex justify-between mt-4">
            {answered && (
              <button
                onClick={() => setShowExplanation(!showExplanation)}
                className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300"
              >
                {showExplanation ? 'Ocultar Explicação' : 'Ver Explicação'}
              </button>
            )}
            
            {answered && (
              <button
                onClick={nextQuestion}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-6 rounded-lg font-medium shadow-md hover:shadow-lg transform transition hover:scale-105 ml-auto"
              >
                {currentQuestion < questions.length - 1 ? 'Próxima pergunta' : 'Ver Resultado'}
              </button>
            )}
          </div>
        </div>
        
        {/* Animações de feedback */}
        {showCorrect && (
          <div className="fixed inset-0 flex items-center justify-center bg-green-500/20 z-50">
            <div className="bg-white rounded-xl shadow-lg p-8 animate-bounce">
              <div className="text-green-500 text-5xl mb-2">✓</div>
              <div className="text-2xl font-bold">Correto!</div>
            </div>
          </div>
        )}
        
        {showIncorrect && (
          <div className="fixed inset-0 flex items-center justify-center bg-red-500/20 z-50">
            <div className="bg-white rounded-xl shadow-lg p-8 animate-bounce">
              <div className="text-red-500 text-5xl mb-2">✗</div>
              <div className="text-2xl font-bold">Incorreto!</div>
            </div>
          </div>
        )}

        {showTimeUp && (
          <div className="fixed inset-0 flex items-center justify-center bg-yellow-500/20 z-50">
            <div className="bg-white rounded-xl shadow-lg p-8 animate-bounce">
              <div className="text-yellow-500 text-5xl mb-2">⏰</div>
              <div className="text-2xl font-bold">Tempo Esgotado!</div>
              <div className="text-gray-600 mt-2">Você perdeu uma vida</div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Componente de tela de resultado
  const ResultScreen = () => {
    const percentage = Math.round((score / (questions.length * 100)) * 100);
    let message = '';
    
    if (percentage >= 90) {
      message = 'Excelente! Você é um especialista em manutenção!';
    } else if (percentage >= 70) {
      message = 'Muito bom! Você tem um ótimo conhecimento sobre manutenção.';
    } else if (percentage >= 50) {
      message = 'Bom trabalho! Continue estudando para melhorar ainda mais.';
    } else {
      message = 'Continue praticando. A manutenção exige atenção aos detalhes!';
    }
    
    return (
      <div className="flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-lg">
          <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">Quiz Concluído!</h1>
          
          <div className="mb-8">
            <div className="relative inline-flex items-center justify-center mb-4">
              <div className="w-48 h-48 rounded-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
                <div className="w-40 h-40 bg-white rounded-full flex items-center justify-center">
                  <div className="text-4xl font-bold text-blue-600">{percentage}%</div>
                </div>
              </div>
              {showConfetti && percentage >= 70 && (
                <>
                  <div className="absolute -top-4 -right-4 text-3xl animate-bounce">🎉</div>
                  <div className="absolute -bottom-4 -left-4 text-3xl animate-bounce" style={{ animationDelay: '0.5s' }}>🎉</div>
                </>
              )}
            </div>
            
            <h2 className="text-xl font-bold mb-2">Sua pontuação: {score} pontos</h2>
            <p className="text-gray-600">{message}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{questions.length}</div>
              <div className="text-sm">Perguntas</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{Math.round(score / 100)}</div>
              <div className="text-sm">Acertos</div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setCurrentScreen('start')}
              className="flex-1 bg-gray-200 text-gray-800 py-3 px-6 rounded-lg font-medium hover:bg-gray-300"
            >
              Menu Principal
            </button>
            <button
              onClick={resetGame}
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg font-medium shadow-md hover:shadow-lg transform transition hover:scale-105 flex items-center justify-center"
            >
              <RefreshCw size={18} className="mr-2" />
              Jogar Novamente
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Componente de tela de Game Over
  const GameOverScreen = () => {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-lg">
          <h1 className="text-3xl font-bold mb-6 text-red-600">Game Over!</h1>
          
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto mb-4 flex items-center justify-center">
              <span className="text-6xl">💔</span>
            </div>
            
            <h2 className="text-xl font-bold mb-2">Pontuação final: {score} pontos</h2>
            <p className="text-gray-600">Continue estudando os procedimentos de manutenção e tente novamente!</p>
          </div>
          
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{currentQuestion + 1}</div>
              <div className="text-sm">Pergunta alcançada</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{Math.round(score / 100)}</div>
              <div className="text-sm">Acertos</div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setCurrentScreen('start')}
              className="flex-1 bg-gray-200 text-gray-800 py-3 px-6 rounded-lg font-medium hover:bg-gray-300"
            >
              Menu Principal
            </button>
            <button
              onClick={resetGame}
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg font-medium shadow-md hover:shadow-lg transform transition hover:scale-105 flex items-center justify-center"
            >
              <RefreshCw size={18} className="mr-2" />
              Jogar Novamente
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Renderização condicional baseada na tela atual
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScreen}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="w-full h-full"
        >
          {currentScreen === 'start' && <StartScreen />}
          {currentScreen === 'game' && <GameScreen />}
          {currentScreen === 'result' && <ResultScreen />}
          {currentScreen === 'gameOver' && <GameOverScreen />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}