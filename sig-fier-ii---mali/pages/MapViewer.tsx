import React, { useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap, ZoomControl } from 'react-leaflet';
import { Layers, Filter, CheckCircle2, ChevronRight, Info, Search, Download, Map as MapIcon, Maximize } from 'lucide-react';
import { VILLAGES_DATA, MAP_CENTER, MAP_ZOOM } from '../constants';
import { Village } from '../types';

// Helper for map control
function FlyToLocation({ target }: { target: [number, number] | null }) {
  const map = useMap();
  React.useEffect(() => {
    if (target) {
      map.flyTo(target, 12, { duration: 2 });
    }
  }, [target, map]);
  return null;
}

const MapViewer: React.FC = () => {
  const [activeLayers, setActiveLayers] = useState({
    villages: true,
    infrastructures: true,
    boundaries: true,
  });
  
  const [filters, setFilters] = useState({
    region: 'all',
    filiere: 'all',
  });

  const [selectedVillage, setSelectedVillage] = useState<Village | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Filter Logic
  const filteredVillages = VILLAGES_DATA.filter(v => {
    if (filters.region !== 'all' && v.region !== filters.region) return false;
    if (filters.filiere !== 'all' && v.cropType !== filters.filiere) return false;
    return true;
  });

  // Calculate stats for filtered view
  const totalPop = filteredVillages.reduce((acc, curr) => acc + curr.population, 0);
  const totalBen = filteredVillages.reduce((acc, curr) => acc + curr.beneficiaries, 0);

  return (
    <div className="relative h-full w-full flex overflow-hidden">
      
      {/* Sidebar Controls (Left Panel) */}
      <div className={`
        absolute z-[1000] top-0 left-0 h-full bg-white shadow-2xl transition-all duration-300 ease-in-out flex flex-col
        ${sidebarOpen ? 'w-80 translate-x-0' : 'w-80 -translate-x-full'}
      `}>
        {/* Header */}
        <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <Filter size={18} />
            Contrôle & Filtres
          </h3>
          <button className="text-slate-400 hover:text-slate-600" title="Réinitialiser">
             <span className="text-xs font-medium underline">Reset</span>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          
          {/* Layer Control */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Layers size={14} /> Couches SIG
            </h4>
            <div className="space-y-2">
              <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors">
                <input 
                  type="checkbox" 
                  checked={activeLayers.boundaries}
                  onChange={e => setActiveLayers(p => ({...p, boundaries: e.target.checked}))}
                  className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500 border-gray-300" 
                />
                <span className="text-sm font-medium text-slate-700">Limites Administratives</span>
              </label>
              <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors">
                <input 
                  type="checkbox" 
                  checked={activeLayers.villages}
                  onChange={e => setActiveLayers(p => ({...p, villages: e.target.checked}))}
                  className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500 border-gray-300" 
                />
                <span className="text-sm font-medium text-slate-700">Villages FIER II</span>
              </label>
              <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors">
                <input 
                  type="checkbox" 
                  checked={activeLayers.infrastructures}
                  onChange={e => setActiveLayers(p => ({...p, infrastructures: e.target.checked}))}
                  className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500 border-gray-300" 
                />
                <span className="text-sm font-medium text-slate-700">Infrastructures</span>
              </label>
            </div>
          </div>

          {/* Filters */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Search size={14} /> Filtrage
            </h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Région</label>
                <select 
                  className="w-full rounded-lg border-slate-200 text-sm focus:border-emerald-500 focus:ring-emerald-500"
                  value={filters.region}
                  onChange={(e) => setFilters(p => ({...p, region: e.target.value}))}
                >
                  <option value="all">Toutes les régions</option>
                  <option value="Sikasso">Sikasso</option>
                  <option value="Koulikoro">Koulikoro</option>
                  <option value="Ségou">Ségou</option>
                  <option value="Kayes">Kayes</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Filière</label>
                <select 
                  className="w-full rounded-lg border-slate-200 text-sm focus:border-emerald-500 focus:ring-emerald-500"
                  value={filters.filiere}
                  onChange={(e) => setFilters(p => ({...p, filiere: e.target.value}))}
                >
                  <option value="all">Toutes les filières</option>
                  <option value="Riz">Riz</option>
                  <option value="Maïs">Maïs</option>
                  <option value="Maraîchage">Maraîchage</option>
                  <option value="Karité">Karité</option>
                </select>
              </div>
            </div>
          </div>

          {/* Quick Stats Summary */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <h4 className="text-blue-800 font-bold text-sm mb-2">Sélection Actuelle</h4>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="text-xs text-blue-600">Villages</p>
                <p className="text-lg font-bold text-blue-900">{filteredVillages.length}</p>
              </div>
              <div>
                <p className="text-xs text-blue-600">Bénéficiaires</p>
                <p className="text-lg font-bold text-blue-900">{(totalBen / 1000).toFixed(1)}k</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-100 bg-white space-y-2">
            <button className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">
                <Download size={16} /> Exporter Carte (PNG)
            </button>
        </div>
      </div>

      {/* Toggle Button for Sidebar */}
      <button 
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className={`absolute top-4 z-[1000] bg-white p-2 rounded-r-lg shadow-md border-y border-r border-slate-200 text-slate-600 hover:text-emerald-600 transition-all duration-300 ${sidebarOpen ? 'left-80' : 'left-0'}`}
      >
        <ChevronRight size={20} className={`transition-transform duration-300 ${sidebarOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Map Container */}
      <div className="flex-1 h-full relative z-0">
        <MapContainer 
          center={MAP_CENTER} 
          zoom={MAP_ZOOM} 
          scrollWheelZoom={true} 
          className="h-full w-full outline-none"
          zoomControl={false}
        >
          {/* Controls */}
          <ZoomControl position="bottomright" />
          
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <FlyToLocation target={selectedVillage ? [selectedVillage.lat, selectedVillage.lng] : null} />

          {/* Village Markers */}
          {activeLayers.villages && filteredVillages.map(village => (
            <CircleMarker 
              key={village.id}
              center={[village.lat, village.lng]}
              radius={8}
              pathOptions={{
                color: selectedVillage?.id === village.id ? '#f59e0b' : '#10b981', // Amber if selected, Green default
                fillColor: selectedVillage?.id === village.id ? '#f59e0b' : '#10b981',
                fillOpacity: 0.7,
                weight: 2
              }}
              eventHandlers={{
                click: () => setSelectedVillage(village)
              }}
            >
              <Popup className="custom-popup">
                <div className="p-1 min-w-[200px]">
                  <div className="flex items-center justify-between mb-2 border-b border-slate-100 pb-2">
                    <h3 className="font-bold text-slate-800">{village.name}</h3>
                    <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{village.region}</span>
                  </div>
                  
                  <div className="space-y-2 text-sm text-slate-600">
                    <div className="flex justify-between">
                      <span>Population:</span>
                      <span className="font-semibold text-slate-900">{village.population}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Bénéficiaires:</span>
                      <span className="font-semibold text-emerald-600">{village.beneficiaries}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Filière:</span>
                      <span className="font-semibold text-slate-900">{village.cropType}</span>
                    </div>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-100">
                    <p className="text-xs font-semibold text-slate-400 mb-2">INFRASTRUCTURES</p>
                    <div className="flex gap-2">
                       {village.hasWaterPoint && (
                         <div title="Point d'eau" className="w-8 h-8 rounded bg-blue-100 text-blue-600 flex items-center justify-center">
                           <div className="w-3 h-3 bg-current rounded-full"></div>
                         </div>
                       )}
                       {village.hasSchool && (
                         <div title="École" className="w-8 h-8 rounded bg-yellow-100 text-yellow-600 flex items-center justify-center">
                            <div className="w-3 h-3 bg-current rotate-45"></div>
                         </div>
                       )}
                       {village.hasStorage && (
                         <div title="Magasin" className="w-8 h-8 rounded bg-purple-100 text-purple-600 flex items-center justify-center">
                            <div className="w-3 h-3 bg-current"></div>
                         </div>
                       )}
                       {!village.hasWaterPoint && !village.hasSchool && !village.hasStorage && (
                         <span className="text-xs text-slate-400 italic">Aucune infrastructure</span>
                       )}
                    </div>
                  </div>
                  
                  <button className="mt-3 w-full py-1.5 text-xs font-medium bg-slate-800 text-white rounded hover:bg-slate-700 transition-colors">
                    Voir Fiche Détaillée
                  </button>
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
        
        {/* Legend Overlay */}
        <div className="absolute bottom-6 left-6 bg-white p-3 rounded-lg shadow-lg border border-slate-200 z-[400] max-w-xs">
          <h5 className="text-xs font-bold text-slate-800 mb-2">Légende</h5>
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2">
               <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
               <span>Village d'intervention</span>
            </div>
            <div className="flex items-center gap-2">
               <span className="w-3 h-3 rounded-full bg-amber-500"></span>
               <span>Sélectionné</span>
            </div>
            <div className="mt-2 pt-2 border-t border-slate-100 text-slate-500 italic text-[10px]">
              Source: Données FIER II 2023
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default MapViewer;
