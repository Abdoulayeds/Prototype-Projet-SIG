import React from 'react';
import { UserPlus, Shield, MoreVertical, Search } from 'lucide-react';

const Admin: React.FC = () => {
  return (
    <div className="h-full overflow-y-auto p-4 lg:p-8 bg-gray-50/50">
      <div className="max-w-6xl mx-auto">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
           <div>
              <h2 className="text-2xl font-bold text-slate-800">Administration</h2>
              <p className="text-slate-500 text-sm mt-1">Gérez les utilisateurs et les permissions d'accès.</p>
           </div>
           <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 shadow-lg shadow-emerald-500/20">
             <UserPlus size={18} />
             Nouvel Utilisateur
           </button>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Toolbar */}
          <div className="p-4 border-b border-slate-100 flex gap-4 bg-slate-50/50">
             <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                  type="text" 
                  placeholder="Rechercher un utilisateur..." 
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 text-sm focus:border-emerald-500 focus:ring-emerald-500"
                />
             </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500 uppercase text-xs font-semibold">
                <tr>
                  <th className="px-6 py-4">Utilisateur</th>
                  <th className="px-6 py-4">Rôle</th>
                  <th className="px-6 py-4">Statut</th>
                  <th className="px-6 py-4">Dernière Connexion</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { name: 'Amadou Diallo', email: 'a.diallo@fier2.ml', role: 'Admin', status: 'Actif', last: 'À l\'instant', img: 'https://picsum.photos/200' },
                  { name: 'Fatoumata Koné', email: 'f.kone@fier2.ml', role: 'Consultant S&E', status: 'Actif', last: 'Hier, 14:20', img: 'https://picsum.photos/201' },
                  { name: 'Jean Pierre', email: 'jp.worldbank@wb.org', role: 'Visiteur', status: 'Inactif', last: '20 Oct 2023', img: 'https://picsum.photos/202' },
                  { name: 'Moussa Traoré', email: 'm.traore@gov.ml', role: 'Consultant S&E', status: 'Actif', last: '24 Oct 2023', img: 'https://picsum.photos/203' },
                ].map((user, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={user.img} alt="" className="w-8 h-8 rounded-full border border-slate-200" />
                        <div>
                          <div className="font-medium text-slate-900">{user.name}</div>
                          <div className="text-slate-500 text-xs">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border
                        ${user.role === 'Admin' ? 'bg-purple-50 text-purple-700 border-purple-100' : 
                          user.role === 'Visiteur' ? 'bg-gray-100 text-gray-700 border-gray-200' : 
                          'bg-blue-50 text-blue-700 border-blue-100'}`}>
                        <Shield size={10} /> {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                       <span className={`inline-block w-2 h-2 rounded-full mr-2 ${user.status === 'Actif' ? 'bg-emerald-500' : 'bg-slate-300'}`}></span>
                       <span className="text-slate-600">{user.status}</span>
                    </td>
                    <td className="px-6 py-4 text-slate-500">{user.last}</td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-slate-400 hover:text-slate-600 p-1 hover:bg-slate-100 rounded">
                        <MoreVertical size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
