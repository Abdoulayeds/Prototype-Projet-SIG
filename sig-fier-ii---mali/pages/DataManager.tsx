import React, { useState } from 'react';
import { Upload, FileSpreadsheet, FileJson, CheckCircle2, History, AlertTriangle, Download } from 'lucide-react';

const DataManager: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'import' | 'export'>('import');
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    // Mock upload logic
    alert("Simulation: Fichier reçu !");
  };

  return (
    <div className="h-full overflow-y-auto p-4 lg:p-8 bg-gray-50/50">
      
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
             <h2 className="text-2xl font-bold text-slate-800">Gestion des Données</h2>
             <p className="text-slate-500 text-sm mt-1">Importez des nouvelles données terrain ou exportez des rapports.</p>
          </div>
          
          <div className="bg-white p-1 rounded-lg border border-slate-200 inline-flex shadow-sm">
            <button 
              onClick={() => setActiveTab('import')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'import' ? 'bg-emerald-100 text-emerald-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Importer
            </button>
            <button 
              onClick={() => setActiveTab('export')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'export' ? 'bg-emerald-100 text-emerald-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Exporter
            </button>
          </div>
        </div>

        {activeTab === 'import' ? (
          <div className="space-y-8">
            {/* Upload Zone */}
            <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-lg text-slate-800 mb-2">Import de Données Terrain</h3>
              <p className="text-slate-500 text-sm mb-6">Formats acceptés : CSV, Excel (.xlsx), GeoJSON, Shapefile (.zip)</p>
              
              <div 
                className={`
                  border-2 border-dashed rounded-xl p-12 text-center transition-all cursor-pointer
                  ${dragActive ? 'border-emerald-500 bg-emerald-50' : 'border-slate-300 hover:border-emerald-400 hover:bg-slate-50'}
                `}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Upload size={32} />
                </div>
                <h4 className="text-lg font-semibold text-slate-700 mb-1">Glissez vos fichiers ici</h4>
                <p className="text-slate-400 text-sm mb-4">ou cliquez pour parcourir</p>
                <button className="px-6 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors">
                  Sélectionner un fichier
                </button>
              </div>

              <div className="mt-6 flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
                  <FileSpreadsheet size={14} /> Modèle_Collecte_Villages.xlsx
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
                  <FileJson size={14} /> Zones_Limites.geojson
                </div>
              </div>
            </div>

            {/* History */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
               <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                 <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                   <History size={20} className="text-slate-400" />
                   Historique des imports
                 </h3>
               </div>
               <table className="w-full text-sm text-left">
                 <thead className="bg-slate-50 text-slate-500 uppercase text-xs">
                   <tr>
                     <th className="px-6 py-3">Fichier</th>
                     <th className="px-6 py-3">Utilisateur</th>
                     <th className="px-6 py-3">Date</th>
                     <th className="px-6 py-3">Statut</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100">
                   <tr>
                     <td className="px-6 py-4 font-medium text-slate-800">donnees_sikasso_nov.xlsx</td>
                     <td className="px-6 py-4 text-slate-600">Amadou Diallo</td>
                     <td className="px-6 py-4 text-slate-600">24 Oct 2023, 10:30</td>
                     <td className="px-6 py-4"><span className="inline-flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2 py-1 rounded text-xs font-medium"><CheckCircle2 size={12} /> Succès</span></td>
                   </tr>
                   <tr>
                     <td className="px-6 py-4 font-medium text-slate-800">new_pistes_rurales.geojson</td>
                     <td className="px-6 py-4 text-slate-600">Jean Keita</td>
                     <td className="px-6 py-4 text-slate-600">22 Oct 2023, 14:15</td>
                     <td className="px-6 py-4"><span className="inline-flex items-center gap-1 text-amber-600 bg-amber-50 px-2 py-1 rounded text-xs font-medium"><AlertTriangle size={12} /> Avertissement</span></td>
                   </tr>
                 </tbody>
               </table>
            </div>
          </div>
        ) : (
          /* Export Tab Content */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center mb-4">
                <FileSpreadsheet size={24} />
              </div>
              <h3 className="font-bold text-lg text-slate-800 mb-2">Export CSV / Excel</h3>
              <p className="text-slate-500 text-sm mb-6">Télécharger les données tabulaires complètes des indicateurs S&E et des bénéficiaires.</p>
              <button className="w-full flex items-center justify-center gap-2 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium text-slate-700">
                <Download size={16} /> Configurer l'export
              </button>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4">
                <FileJson size={24} />
              </div>
              <h3 className="font-bold text-lg text-slate-800 mb-2">Export SIG (GeoJSON)</h3>
              <p className="text-slate-500 text-sm mb-6">Extraire les couches géographiques (villages, infrastructures) pour usage dans QGIS/ArcGIS.</p>
              <button className="w-full flex items-center justify-center gap-2 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium text-slate-700">
                <Download size={16} /> Configurer l'export
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataManager;
