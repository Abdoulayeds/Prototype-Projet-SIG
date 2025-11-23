import React from 'react';
import { LayoutDashboard, Map, Database, Users, Settings, LogOut, ChevronRight, Menu } from 'lucide-react';
import { ViewState } from '../types';

interface SidebarProps {
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
  onLogout: () => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onChangeView, onLogout, isMobileOpen, setIsMobileOpen }) => {
  
  const menuItems = [
    { id: 'dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
    { id: 'map', label: 'Carte Interactive', icon: Map },
    { id: 'data', label: 'Gestion Données', icon: Database },
    { id: 'admin', label: 'Administration', icon: Users },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-30
        w-64 bg-slate-900 text-white transition-transform duration-300 ease-in-out
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        flex flex-col h-full shadow-xl
      `}>
        {/* Brand */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center font-bold text-xl shadow-lg shadow-emerald-500/30">
              F
            </div>
            <div>
              <h1 className="font-bold text-lg tracking-wide">SIG FIER II</h1>
              <p className="text-xs text-slate-400 uppercase tracking-wider">Mali</p>
            </div>
          </div>
          <button onClick={() => setIsMobileOpen(false)} className="lg:hidden text-slate-400">
            <ChevronRight className="rotate-180" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onChangeView(item.id as ViewState);
                  setIsMobileOpen(false);
                }}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
                  ${isActive 
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/20' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'}
                `}
              >
                <Icon size={20} />
                <span>{item.label}</span>
                {isActive && <ChevronRight size={16} className="ml-auto" />}
              </button>
            );
          })}
        </nav>

        {/* User & Logout */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/30">
          <div className="flex items-center gap-3 mb-4 px-2">
            <img 
              src="https://picsum.photos/200" 
              alt="User" 
              className="w-10 h-10 rounded-full border-2 border-slate-700" 
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">Amadou Diallo</p>
              <p className="text-xs text-slate-500 truncate">Consultant S&E</p>
            </div>
          </div>
          <button 
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-red-900/20 hover:text-red-300 rounded-lg transition-colors"
          >
            <LogOut size={16} />
            Déconnexion
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
