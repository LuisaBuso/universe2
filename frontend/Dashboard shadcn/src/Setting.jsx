import React, { useState } from 'react';
import { Button } from '../@/components/ui/button';
import { Input } from '../@/components/ui/input';
import { Switch } from '../@/components/ui/switch';
import { Card, CardHeader, CardTitle, CardContent } from '../@/components/ui/card';

export default function Settings() {
  const [email, setEmail] = useState('user@example.com');
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleSave = () => {
    // Aquí normalmente guardarías la configuración en tu backend
    alert('¡Configuraciones guardadas!');
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Configuraciones</h2> {/* Título */}
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-gray-800">Preferencias del Usuario</CardTitle> {/* Título del card */}
        </CardHeader>
        <CardContent>
          <div className="space-y-4"> {/* Espacio entre cada sección */}
            <div>
              <label className="block text-sm font-medium text-gray-800">Email</label> {/* Etiqueta */}
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 text-gray-800" // Texto visible en el input
                placeholder="user@example.com" // Placeholder para indicar el formato
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-800">Habilitar Notificaciones</span> {/* Texto de notificaciones */}
              <Switch
                checked={notifications}
                onCheckedChange={setNotifications}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-800">Modo Oscuro</span> {/* Texto de modo oscuro */}
              <Switch
                checked={darkMode}
                onCheckedChange={setDarkMode}
              />
            </div>
            <Button className="w-full bg-gray-800 text-white hover:bg-gray-700 mt-4" onClick={handleSave}>Guardar Configuraciones</Button> {/* Botón con estilos mejorados */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}