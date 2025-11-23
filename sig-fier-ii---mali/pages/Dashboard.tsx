import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  PieChart, Pie, Cell, LineChart, Line 
} from 'recharts';
import { Users, TrendingUp, MapPin, Building2, Calendar, ArrowUpRight } from 'lucide-react';
import { CHART_DATA_BENEFICIARIES, CHART_DATA_SECTORS, COLORS } from '../constants';

const Dashboard: React.FC = () => {
  return (
    <div className="h-full overflow-y-auto p-4 lg:p-8 bg-gray-50/50">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Tableau de Bord S&E</h2>
          <p className="text-slate-500 text-sm mt-1">Dernière mise à jour : 24 Oct 2023</p>
        </div>
        <div className="flex gap-2">
           <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50 shadow-sm">
             <Calendar size={16} />
             Cette année
           </button>
           <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 shadow-lg shadow-emerald-500/20">
             <ArrowUpRight size={16} />
             Générer rapport
           </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Bénéficiaires Totaux', value: '24,593', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50', trend: '+12%' },
          { label: 'Infrastructures', value: '142', icon: Building2, color: 'text-emerald-600', bg: 'bg-emerald-50', trend: '+5' },
          { label: 'Villages Couverts', value: '89', icon: MapPin, color: 'text-purple-600', bg: 'bg-purple-50', trend: '+3' },
          { label: 'Taux Exécution', value: '78%', icon: TrendingUp, color: 'text-orange-600', bg: 'bg-orange-50', trend: '+2.4%' },
        ].map((kpi, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-lg ${kpi.bg} ${kpi.color}`}>
                <kpi.icon size={24} />
              </div>
              <span className="flex items-center text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                {kpi.trend}
              </span>
            </div>
            <h3 className="text-3xl font-bold text-slate-800 mb-1">{kpi.value}</h3>
            <p className="text-slate-500 text-sm font-medium">{kpi.label}</p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        
        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Users size={20} className="text-slate-400" />
            Répartition par Région et Sexe
          </h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CHART_DATA_BENEFICIARIES} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <Tooltip 
                  cursor={{fill: '#f1f5f9'}}
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                />
                <Legend iconType="circle" />
                <Bar dataKey="hommes" name="Hommes" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={32} />
                <Bar dataKey="femmes" name="Femmes" fill="#10b981" radius={[4, 4, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <TrendingUp size={20} className="text-slate-400" />
            Investissements par Filière
          </h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={CHART_DATA_SECTORS}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={110}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {CHART_DATA_SECTORS.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="middle" align="right" layout="vertical" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity Table (Mini) */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100">
           <h3 className="text-lg font-bold text-slate-800">Activités Récentes</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50">
              <tr>
                <th className="px-6 py-4 font-semibold">Date</th>
                <th className="px-6 py-4 font-semibold">Village</th>
                <th className="px-6 py-4 font-semibold">Action</th>
                <th className="px-6 py-4 font-semibold">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { date: '24 Oct 2023', village: 'Sikasso Centre', action: 'Validation Infrastructure', status: 'Complété' },
                { date: '23 Oct 2023', village: 'Koutiala', action: 'Enregistrement Bénéficiaires', status: 'En cours' },
                { date: '21 Oct 2023', village: 'Bougouni', action: 'Rapport S&E Trimestriel', status: 'En attente' },
              ].map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-slate-600">{row.date}</td>
                  <td className="px-6 py-4 font-medium text-slate-800">{row.village}</td>
                  <td className="px-6 py-4 text-slate-600">{row.action}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium 
                      ${row.status === 'Complété' ? 'bg-emerald-100 text-emerald-700' : 
                        row.status === 'En cours' ? 'bg-blue-100 text-blue-700' : 
                        'bg-orange-100 text-orange-700'}`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
