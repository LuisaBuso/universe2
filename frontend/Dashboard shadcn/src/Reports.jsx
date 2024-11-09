import React, { useState } from 'react';
import { Button } from '../@/components/ui/button';
import { Input } from '../@/components/ui/input';
import { Card, CardContent } from '../@/components/ui/card';

export default function Reports() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleQuestionSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/api/ask', {  // Llama al backend
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),  // Envía la pregunta al backend
      });

      if (!response.ok) {
        throw new Error(`Error de respuesta: ${response.status}`);
      }

      const data = await response.json();
      setAnswer(data.answer);  // Muestra la respuesta del backend
    } catch (error) {
      setAnswer(`Error al obtener la respuesta: ${error.message}`);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h2 className="text-3xl font-semibold mb-8 text-gray-800">Análisis de Informes con IA</h2>

      <Card className="bg-white shadow-lg">
        <CardContent className="p-6">
          <form onSubmit={handleQuestionSubmit} className="space-y-6">
            <Input
              type="text"
              placeholder="Haz una pregunta sobre tus informes..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full text-gray-800 text-lg"
            />
            <Button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 text-lg"
            >
              Obtener respuesta de IA
            </Button>
          </form>
        </CardContent>
      </Card>

      {answer && (
        <Card className="mt-8 bg-gray-50">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Respuesta de IA</h3>
            <p className="text-gray-700 text-lg">{answer}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}