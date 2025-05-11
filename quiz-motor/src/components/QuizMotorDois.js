// BombaGame.js
import React, { useState } from 'react';
import { Stage, Layer, Image as KonvaImage, Circle, Text, Group } from 'react-konva';
import useImage from 'use-image';

const QuizMotorDois = () => {
  const [image] = useImage('/images/M-01.png');
  const [inputs, setInputs] = useState({});
  const [feedback, setFeedback] = useState({});
  const [showNext, setShowNext] = useState(false);

  const areas = [
    { id: '01', x: 110, y: 200, resposta: '12.5' },
    { id: '02', x: 310, y: 180, resposta: '8.0' },
    { id: '03', x: 200, y: 300, resposta: '5.5' },
  ];

  const handleClick = (area) => {
    const resposta = prompt(`Digite a medida (mm) para o ponto ${area.id}:`);
    const correta = resposta === area.resposta;

    const newInputs = { ...inputs, [area.id]: resposta };
    const newFeedback = { ...feedback, [area.id]: correta ? 'green' : 'red' };

    setInputs(newInputs);
    setFeedback(newFeedback);

    // Verifica se todas estão corretas
    const allCorrect = areas.every(a => newFeedback[a.id] === 'green' || (a.id === area.id && correta));
    setShowNext(allCorrect);
  };

  return (
    <div>
      <Stage width={800} height={600}>
        <Layer>
          <KonvaImage image={image} width={600} height={600} />

          {areas.map((area) => (
            <Group key={area.id} onClick={() => handleClick(area)}>
              <Circle
                x={area.x}
                y={area.y}
                radius={15}
                fill={feedback[area.id] || 'rgba(0,0,0,0.3)'}
                stroke="black"
                strokeWidth={2}
              />
              <Text
                x={area.x - 8}
                y={area.y - 8}
                text={area.id}
                fontSize={14}
                fill="white"
              />
            </Group>
          ))}
        </Layer>
      </Stage>

      {showNext && (
        <button style={{ marginTop: '20px', padding: '10px 20px', fontSize: '16px' }}>
          Avançar
        </button>
      )}
    </div>
  );
};

export default QuizMotorDois;
