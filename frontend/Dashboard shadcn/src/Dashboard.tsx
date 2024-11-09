import React, { useState } from 'react';
import { Menu, Search, Bell, User, X, Home, BarChart2, FileText, Users, Settings, ChevronDown } from 'lucide-react';
import { Button } from '../@/components/ui/button';
import { Input } from '../@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../@/components/ui/dropdown-menu';
import Analytics from './Analytics';
import Reports from './Reports';
import SettingsPage from './Setting';

export default function Dashboard({ onLogout }) {  // Recibe la función onLogout como prop
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('Dashboard Overview');

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const sidebarItems = [
    { name: 'Dashboard Overview', icon: Home },
    { name: 'Analytics', icon: BarChart2 },
    { name: 'Reports', icon: FileText },
    { name: 'User Management', icon: Users },
    { name: 'Settings', icon: Settings },
  ];

  const metrics = [
    { title: 'Total Revenue', value: '$54,321', subtext: 'Compared to last month' },
    { title: 'User Growth', value: '+12.5%', subtext: 'Compared to last month' },
    { title: 'Conversion Rate', value: '8.7%', subtext: 'Compared to last month' },
  ];

  const users = [
    { name: 'John Doe', role: 'Admin', createdAt: '2023-01-15', status: 'Active' },
    { name: 'Jane Smith', role: 'User', createdAt: '2023-02-20', status: 'Inactive' },
    { name: 'Bob Johnson', role: 'User', createdAt: '2023-03-10', status: 'Active' },
  ];

  const renderContent = () => {
    switch (activeItem) {
      case 'Analytics':
        return <Analytics />;
      case 'Reports':
        return <Reports />;
      case 'Settings':
        return <SettingsPage />;
      default:
        return (
          <>
            <h2 className="text-gray-700 text-2xl font-semibold mb-4">{activeItem}</h2>

            {/* Metrics Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {metrics.map((metric, index) => (
                <Card key={index} className="bg-white border border-gray-200">
                  <CardHeader className="flex flex-col space-y-1.5 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">
                      {metric.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
                    <p className="text-xs text-gray-500 mt-1">
                      {metric.subtext}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
            {/* User Table */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    {['USER', 'ROLE', 'CREATED AT', 'STATUS'].map((header, index) => (
                      <th key={index} className="px-5 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={index}>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div className="flex items-center">
                          <div className="ml-3">
                            <p className="text-gray-900 whitespace-no-wrap">{user.name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">{user.role}</p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">{user.createdAt}</p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <span className={`relative inline-block px-3 py-1 font-semibold ${user.status === 'Active' ? 'text-green-900' : 'text-red-900'} leading-tight`}>
                          <span aria-hidden className={`absolute inset-0 ${user.status === 'Active' ? 'bg-green-200' : 'bg-red-200'} opacity-50 rounded-full`}></span>
                          <span className="relative">{user.status}</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className={`bg-gray-800 text-white w-64 fixed inset-y-0 left-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition duration-200 ease-in-out z-30`}>
        <div className="flex justify-between items-center p-4">
          <span className="font-semibold text-xl">Dashboard</span>
          <X className="h-6 w-6 cursor-pointer" onClick={toggleSidebar} />
        </div>
        <nav className="mt-5">
          {sidebarItems.map((item, index) => (
            <Button
              key={index}
              variant="ghost"
              className={`w-full flex items-center space-x-2 px-4 py-2 text-left text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200 ${activeItem === item.name ? 'bg-gray-700 text-white' : ''}`}
              onClick={() => setActiveItem(item.name)}
            >
              <item.icon className="h-5 w-5 min-w-[1.25rem]" />
              <span className="flex-grow">{item.name}</span>
            </Button>
          ))}
        </nav>
      </aside>
      {/* Main Content */}
      <div className={`flex-1 flex flex-col overflow-hidden ${sidebarOpen ? 'ml-64' : ''} transition-all duration-200`}>
        {/* Header */}
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <div className="flex items-center">
            <Button variant="ghost" onClick={toggleSidebar} className="mr-4">
              <Menu className="h-6 w-6 text-gray-600" />
            </Button>
            <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            {/* Campo de Búsqueda */}
            <div className="relative">
              <Input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
            {/* Botón de Notificaciones */}
            <Button variant="ghost" className="relative">
              <Bell className="h-6 w-6 text-gray-600" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            </Button>
            {/* Menú Desplegable */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center space-x-2 bg-white text-gray-800 hover:bg-blue-500 transition duration-150 ease-in-out rounded-md px-4 py-2">
                  <User className="h-6 w-6 text-gray-600" />
                  <span className="font-semibold">User</span>
                  <ChevronDown className="h-4 w-4 text-gray-600" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white shadow-none rounded-md p-1">
                <DropdownMenuItem className="text-gray-800 hover:bg-blue-500 hover:text-white transition duration-150 ease-in-out rounded-md px-4 py-2">My Account</DropdownMenuItem>
                <DropdownMenuItem className="text-gray-800 hover:bg-blue-500 hover:text-white transition duration-150 ease-in-out rounded-md px-4 py-2">Profile</DropdownMenuItem>
                <DropdownMenuItem className="text-gray-800 hover:bg-blue-500 hover:text-white transition duration-150 ease-in-out rounded-md px-4 py-2">Settings</DropdownMenuItem>
                <DropdownMenuItem
                  className="text-gray-800 hover:bg-blue-500 hover:text-white transition duration-150 ease-in-out rounded-md px-4 py-2"
                  onClick={onLogout}  // Llama a la función de cierre de sesión
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        {/* Main content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          {renderContent()}
        </main>
        {/* Footer */}
        <footer className="bg-white shadow-md mt-auto py-4 px-6">
          <div className="flex justify-between items-center">
            <div className="text-gray-600">© 2024 Your Company. All rights reserved.</div>
          </div>
        </footer>
      </div>
    </div>
  );
}
