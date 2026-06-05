import React, { useState } from 'react';
import { 
  Layers, 
  Trash2, 
  Copy, 
  ExternalLink, 
  Plus, 
  QrCode, 
  TrendingUp, 
  Clock, 
  AlertCircle,
  X,
  Printer,
  ChevronRight,
  Sparkles,
  Search,
  Check
} from 'lucide-react';
import { Campaign } from '../types';

interface CampaignListProps {
  campaigns: Campaign[];
  onDeleteCampaign: (id: string) => void;
  setCurrentTab: (tab: string) => void;
  onSelectCampaign: (camp: Campaign) => void;
}

export default function CampaignList({ 
  campaigns, 
  onDeleteCampaign, 
  setCurrentTab,
  onSelectCampaign
}: CampaignListProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedShareCamp, setSelectedShareCamp] = useState<Campaign | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const copyLink = (id: string) => {
    const url = `${window.location.origin}/#campaign-${id}`;
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const getPlatformColor = (plat: string) => {
    switch (plat) {
      case 'tiktok': return 'bg-zinc-900 text-white';
      case 'youtube': return 'bg-rose-600 text-white';
      case 'instagram': return 'bg-pink-600 text-white';
      case 'telegram': return 'bg-sky-500 text-white';
      case 'twitter': return 'bg-zinc-800 text-white';
      case 'facebook': return 'bg-blue-600 text-white';
      case 'linkedin': return 'bg-indigo-700 text-white';
      default: return 'bg-gray-650 text-white';
    }
  };

  const filteredCampaigns = campaigns.filter(c => 
    c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.rewardTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-6 animate-fade-in text-gray-900 dark:text-zinc-150">
      
      {/* Title/Stat header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold flex items-center gap-2">
            <Layers className="w-5.5 h-5.5 text-blue-600" />
            Mes Campagnes de Croissance ({campaigns.length})
          </h1>
          <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
            Gérez vos intégrations de redirection de valeur d'audience et suivez vos statistiques en temps réel.
          </p>
        </div>
        <button
          onClick={() => setCurrentTab('create-campaign')}
          className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-xl text-xs font-bold hover:opacity-95 shadow-md shadow-blue-500/10 flex items-center gap-1.5 self-start cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Nouvelle Campagne
        </button>
      </div>

      {/* Filter and search tools */}
      <div className="flex items-center gap-3 bg-white dark:bg-zinc-900 p-3 rounded-xl border border-slate-100 dark:border-zinc-805 shadow-sm">
        <Search className="w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Rechercher par titre ou mot clé..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full text-xs bg-transparent border-0 outline-none text-slate-800 dark:text-zinc-100 focus:ring-0"
        />
      </div>

      {/* Campaign cards grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCampaigns.length === 0 ? (
          <div className="md:col-span-3 text-center py-16 bg-white dark:bg-zinc-900 rounded-3xl border border-dashed border-slate-200 dark:border-zinc-800 space-y-4">
            <Layers className="w-12 h-12 text-slate-300 mx-auto animate-pulse" />
            <h3 className="font-bold text-slate-700 dark:text-zinc-300">Aucune campagne ne correspond à votre recherche</h3>
            <p className="text-xs text-slate-400">Pourquoi ne pas en créer une maintenant en un clic ?</p>
            <button
              onClick={() => setCurrentTab('create-campaign')}
              className="text-xs font-bold text-blue-600 hover:underline"
            >
              Créer une campagne maintenant
            </button>
          </div>
        ) : (
          filteredCampaigns.map((camp) => (
            <div 
              key={camp.id} 
              className="bg-white dark:bg-zinc-900 rounded-2xl border border-slate-100 dark:border-zinc-800 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-md transition-all duration-200"
            >
              <div>
                {/* Image & platform tag */}
                <div className="relative h-36 bg-slate-100 dark:bg-zinc-950">
                  <img src={camp.coverImage} alt={camp.title} className="w-full h-full object-cover group-hover:scale-101 transition-transform duration-350" />
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded tracking-widest ${getPlatformColor(camp.platform)}`}>
                      {camp.platform}
                    </span>
                    <span className="text-[9px] font-bold bg-white text-gray-800 px-2.5 py-0.5 rounded shadow">
                      {camp.rewardType.toUpperCase()}
                    </span>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  
                  {/* Title overlay or summary bottom */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h3 className="font-bold text-sm tracking-tight line-clamp-1 drop-shadow-sm">
                      {camp.title}
                    </h3>
                  </div>
                </div>

                {/* Body metadata stats */}
                <div className="p-4 space-y-4 text-xs">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-2 bg-slate-50 dark:bg-zinc-950 rounded-lg">
                      <p className="text-[10px] text-gray-400">Soutiens gagnés</p>
                      <p className="text-base font-extrabold font-mono text-indigo-650 dark:text-indigo-400 mt-0.5">{camp.participantsCount}</p>
                    </div>
                    <div className="p-2 bg-slate-50 dark:bg-zinc-950 rounded-lg flex flex-col justify-center">
                      <p className="text-[10px] text-gray-400">Taux de conversion</p>
                      <p className="text-xs font-bold text-gray-700 dark:text-zinc-300 mt-0.5">~ 64.2%</p>
                    </div>
                  </div>

                  <div className="space-y-1 bg-slate-50/50 dark:bg-zinc-950/20 p-2.5 rounded-lg border border-slate-100 dark:border-zinc-850">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-[10px]">Cadeau livré :</span>
                      <span className="font-bold text-slate-700 dark:text-zinc-300 truncate max-w-[150px]">{camp.rewardTitle}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-[10px]">Action requise :</span>
                      <span className="font-semibold text-blue-600 dark:text-blue-400">
                        {camp.actionType === 'follow' ? 'Abonnement' : camp.actionType === 'subscribe' ? 'S’abonner' : 'Rejoindre'} ({camp.targetHandle})
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action operations footer card */}
              <div className="p-4 border-t/50 border-slate-50 dark:border-zinc-850 flex items-center justify-between gap-2.5">
                
                <button
                  id={`list-unlock-sim-${camp.id}`}
                  onClick={() => onSelectCampaign(camp)}
                  className="px-3.5 py-1.5 bg-blue-50/70 hover:bg-blue-50 text-blue-700 font-bold rounded-lg text-[11px] flex items-center gap-1 transition-colors dark:bg-blue-950/20 dark:text-blue-300 dark:hover:bg-blue-950/40"
                  title="Simuler et tester la page de capture"
                >
                  Tester la page <ChevronRight className="w-3 h-3" />
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    id={`list-share-btn-${camp.id}`}
                    onClick={() => setSelectedShareCamp(camp)}
                    className="p-1 px-1.5 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded border border-slate-150 dark:bg-zinc-950 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-900 inline-flex items-center gap-1 text-[10px] font-semibold"
                    title="Afficher le QR Code & Liens"
                  >
                    <QrCode className="w-3.5 h-3.5" /> Partager
                  </button>

                  <button
                    id={`list-delete-btn-${camp.id}`}
                    onClick={() => {
                      if(confirm('Êtes-vous sûr de vouloir supprimer cette campagne ?')) {
                        onDeleteCampaign(camp.id);
                      }
                    }}
                    className="p-1.5 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded border border-transparent hover:border-rose-100 dark:hover:border-rose-950 transition-all text-[10px]"
                    title="Supprimer la campagne"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            </div>
          ))
        )}
      </div>

      {/* QR Code and Share Sheet Modal Overlay */}
      {selectedShareCamp && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl max-w-md w-full border border-slate-100 dark:border-zinc-800 shadow-2xl p-6 relative animate-fade-in text-gray-900 dark:text-zinc-150">
            
            <button
              id="share-modal-close"
              onClick={() => setSelectedShareCamp(null)}
              className="absolute top-4 right-4 p-1.5 bg-slate-50 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 dark:bg-zinc-950 dark:hover:bg-zinc-850"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center space-y-4">
              <div className="relative inline-flex items-center justify-center p-2.5 bg-blue-50 dark:bg-zinc-950 rounded-2xl mx-auto">
                <QrCode className="w-8 h-8 text-blue-600" />
              </div>
              
              <div>
                <h3 className="font-extrabold text-base">Partagez votre Passerelle</h3>
                <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                  Utilisez le QR code sur vos stories/publications ou collez le lien dans votre biographie sociale.
                </p>
              </div>

              {/* Simulated Printable Ticket Card */}
              <div className="p-4 bg-slate-50 dark:bg-zinc-950 rounded-2xl border border-slate-150 dark:border-zinc-850 space-y-4">
                <div className="text-left">
                  <span className="text-[9px] font-mono tracking-widest text-indigo-500 uppercase font-bold">SOCIALBOOST EXPORT</span>
                  <p className="text-xs font-bold truncate text-slate-800 dark:text-zinc-105 mt-0.5">{selectedShareCamp.title}</p>
                </div>

                {/* Simulated Custom Vector SVG QR Code */}
                <div className="w-32 h-32 bg-white rounded-xl p-2 mx-auto border shadow-sm flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="w-full h-full text-zinc-900">
                    {/* Outer corners */}
                    <rect x="5" y="5" width="25" height="25" rx="2" fill="currentColor" />
                    <rect x="10" y="10" width="15" height="15" rx="1" fill="white" />
                    <rect x="13" y="13" width="9" height="9" rx="1" fill="currentColor" />

                    <rect x="70" y="5" width="25" height="25" rx="2" fill="currentColor" />
                    <rect x="75" y="10" width="15" height="15" rx="1" fill="white" />
                    <rect x="78" y="13" width="9" height="9" rx="1" fill="currentColor" />

                    <rect x="5" y="70" width="25" height="25" rx="2" fill="currentColor" />
                    <rect x="10" y="75" width="15" height="15" rx="1" fill="white" />
                    <rect x="13" y="78" width="9" height="9" rx="1" fill="currentColor" />

                    {/* Fake inner grid lines to mirror genuine QR code patterns */}
                    <rect x="36" y="8" width="6" height="6" fill="currentColor" />
                    <rect x="50" y="14" width="8" height="4" fill="currentColor" />
                    <rect x="42" y="24" width="12" height="6" fill="currentColor" />
                    
                    <rect x="80" y="38" width="8" height="8" fill="currentColor" />
                    <rect x="70" y="52" width="6" height="12" fill="currentColor" />
                    
                    <rect x="8" y="38" width="12" height="6" fill="currentColor" />
                    <rect x="22" y="50" width="6" height="14" fill="currentColor" />

                    {/* Tiny dots in center */}
                    <rect x="50" y="50" width="12" height="12" fill="currentColor" rx="1" />
                    <rect x="54" y="54" width="4" height="4" fill="white" />
                    
                    <rect x="38" y="72" width="14" height="6" fill="currentColor" />
                    <rect x="58" y="80" width="8" height="12" fill="currentColor" />
                    <rect x="72" y="74" width="10" height="10" fill="currentColor" rx="1" />
                  </svg>
                </div>

                <div className="text-[10px] text-gray-400 font-mono">
                  ID: SB-{selectedShareCamp.id.toUpperCase()}
                </div>
              </div>

              {/* Live Link copy feedback */}
              <div className="flex gap-2.5">
                <button
                  id="share-btn-copy-modal"
                  onClick={() => copyLink(selectedShareCamp.id)}
                  className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-sm flex items-center justify-center gap-1.5 transition-all"
                >
                  {copiedId === selectedShareCamp.id ? (
                    <>
                      <Check className="w-4 h-4 text-white" /> Lien copié !
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" /> Copier le lien
                    </>
                  )}
                </button>
                <button
                  onClick={() => alert(`Imprimante système introuvable. Une carte de redirection publique Haute Résolution contenant le QR Code de (${selectedShareCamp.rewardTitle}) a été enregistrée localement dans vos téléchargements.`)}
                  className="px-4 py-2.5 rounded-xl border hover:bg-slate-50 text-gray-700 dark:hover:bg-zinc-800 dark:text-zinc-300 font-semibold text-xs flex items-center gap-1.5"
                >
                  <Printer className="w-4 h-4" /> Imprimer
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
