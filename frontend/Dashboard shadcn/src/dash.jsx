import React, { useState } from 'react';
import { X, Home, BarChart2, FileText, Users, Settings } from 'lucide-react';
import { Button } from '../@/components/ui/button';

export default function Dashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [activeItem, setActiveItem] = useState('Dashboard Overview');

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    const sidebarItems = [
        { name: 'Dashboard Overview', icon: Home },
        { name: 'Analytics', icon: BarChart2 },
        { name: 'Reports', icon: FileText },
        { name: 'User Management', icon: Users },
        { name: 'Settings', icon: Settings },
    ];

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className={`bg-gray-800 text-white w-64 py-4 px-6 fixed inset-y-0 left-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition duration-200 ease-in-out z-30`}>
                <div className="flex justify-between items-center mb-8">
                    <X className="h-6 w-6 cursor-pointer" onClick={toggleSidebar} />
                    <span className="font-semibold">Close Menu</span>
                </div>
                <nav className="space-y-4">
                    {sidebarItems.map((item, index) => (
                        <Button
                            key={index}
                            variant="ghost"
                            className={`w-full flex items-center space-x-4 justify-start text-white hover:bg-gray-700 transition-colors duration-200 ${activeItem === item.name ? 'bg-gray-700' : ''}`}
                            onClick={() => setActiveItem(item.name)}
                        >
                            <item.icon className="h-5 w-5" />
                            <span>{item.name}</span>
                        </Button>
                    ))}
                </nav>
            </aside>
            {/* Main Content */}
            <div className={`flex-1 flex flex-col overflow-hidden ${sidebarOpen ? 'ml-64' : ''} transition-all duration-200`}>
                {/* Header */}
                <header className="bg-white shadow-md p-4 flex justify-between items-center">
                    <div className="flex items-center">
                        <Button variant="ghost" onClick={toggleSidebar} className="mr-2">
                            <Menu className="h-6 w-6" />
                        </Button>
                        <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Input type="text" placeholder="Search..." className="pl-8 pr-2 py-1" />
                        <Button variant="ghost" className="relative">
                            <Bell className="h-6 w-6" />
                            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                        </Button>
                        <Button variant="ghost" className="flex items-center space-x-2">
                            <User className="h-6 w-6" />
                        </Button>
                    </div>
                </header>

                {/* Main content */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
                    <h3 className="text-gray-700 text-3xl font-medium mb-4">{activeItem}</h3>
                    <div className="bg-white shadow rounded-lg overflow-hidden">
                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    {['USER', 'ROLE', 'CREATED AT', 'STATUS'].map((header, index) => (
                                        <th key={index} className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {/* Add table rows here */}
                            </tbody>
                        </table>
                    </div>
                </main>
                <div className={`flex-1 flex flex-col overflow-hidden ${sidebarOpen ? 'ml-64' : ''} transition-all duration-200`}>
                    {/* Footer */}
                    <footer className="bg-white shadow-md mt-auto py-4 px-6">
                        <div className="flex justify-between items-center">
                            <div className="text-sm text-gray-500">
                                © 2023 Your Company. All rights reserved.
                            </div>
                            <div className="flex space-x-6">
                                {['Privacy Policy', 'Terms of Service', 'Support'].map((item, index) => (
                                    <a key={index} href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors duration-200">{item}</a>
                                ))}
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
            );
}