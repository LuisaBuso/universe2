import React, { useState } from 'react';
import { Button } from '../@/components/ui/button';
import { Input } from '../@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '../@/components/ui/card';

export default function Login({ onLogin, onSwitchToRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí normalmente harías una llamada a la API para autenticar
    onLogin(email, password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-gray-800">Iniciar Sesión</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 border border-gray-300 rounded-md"
              />
            </div>
            <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700">
              Iniciar Sesión
            </Button>
          </form>
          <p className="mt-4 text-center text-sm text-gray-600">
            ¿No tienes una cuenta?{' '}
            <button
              onClick={onSwitchToRegister}
              className="text-blue-600 hover:underline focus:outline-none"
            >
              Regístrate
            </button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
