import React, { useState } from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import MapViewer from './pages/MapViewer';
import DataManager from './pages/DataManager';
import Admin from './pages/Admin';
import Sidebar from './components/Sidebar';
import { ViewState } from './types';
import { Menu } from 'lucide-react';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentView('login');
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  // Define view components map
  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'map':
        return <MapViewer />;
      case 'data':
        return <DataManager />;
      case 'admin':
        return <Admin />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden font-sans">
      <Sidebar 
        currentView={currentView} 
        onChangeView={setCurrentView} 
        onLogout={handleLogout}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />
      
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Mobile Header Trigger */}
        <div className="lg:hidden h-14 bg-white border-b border-slate-200 flex items-center px-4 shrink-0 justify-between">
           <div className="font-bold text-slate-800">SIG FIER II</div>
           <button onClick={() => setIsMobileOpen(true)} className="p-2 text-slate-600">
             <Menu size={24} />
           </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden relative">
          {renderView()}
        </div>
      </main>
    </div>
  );
};

export default App;
