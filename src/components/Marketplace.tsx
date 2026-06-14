import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Sparkles, 
  Zap, 
  Gift, 
  Users, 
  ChevronRight,
  TrendingUp,
  Award
} from 'lucide-react';
import { Campaign, Platform } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface MarketplaceProps {
  campaigns: Campaign[];
  onSelectCampaign: (camp: Campaign) => void;
}

export default function Marketplace({ campaigns, onSelectCampaign }: MarketplaceProps) {
  const { t, language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>('all');
  const [sortBy, setSortBy] = useState<'popularity' | 'latest'>('popularity');

  const filteredCampaigns = campaigns
    .filter((camp) => {
      const matchSearch = camp.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          camp.rewardTitle.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          camp.creatorName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchPlatform = selectedPlatform === 'all' || camp.platform === selectedPlatform;
      return matchSearch && matchPlatform;
    })
    .sort((a, b) => {
      if (sortBy === 'popularity') {
        return b.participantsCount - a.participantsCount;
      } else {
        return b.createdAt.localeCompare(a.createdAt);
      }
    });

  const getPlatformLabel = (plat: string) => {
    switch (plat) {
      case 'tiktok': return 'TikTok';
      case 'youtube': return 'YouTube';
      case 'instagram': return 'Instagram';
      case 'telegram': return 'Telegram';
      case 'twitter': return 'X (Twitter)';
      case 'facebook': return 'Facebook';
      case 'linkedin': return 'LinkedIn';
      default: return 'Plateforme';
    }
  };

  const getPlatformBadgeColor = (plat: string) => {
    switch (plat) {
      case 'tiktok': return 'bg-zinc-900 border-zinc-800 text-white';
      case 'youtube': return 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/20 dark:text-rose-300 dark:border-rose-900';
      case 'instagram': return 'bg-pink-50 text-pink-700 border-pink-200 dark:bg-pink-950/20 dark:text-pink-300 dark:border-pink-905';
      case 'telegram': return 'bg-sky-50 text-sky-700 border-sky-150 dark:bg-sky-950/20 dark:text-sky-305 dark:border-sky-900';
      case 'twitter': return 'bg-zinc-100 text-zinc-90 w-auto border-zinc-200 dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-800';
      default: return 'bg-gray-50 text-gray-700 border-gray-150 dark:bg-zinc-950 dark:text-zinc-400';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-8 animate-fade-in text-gray-900 dark:text-zinc-150">
      
      {/* Visual Marketplace Top Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1 bg-gradient-to-r from-blue-105 to-violet-100 px-3 py-1 rounded-full text-blue-700 dark:from-blue-950/20 dark:to-violet-950/20 dark:text-blue-300 text-xs font-bold font-sans">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{language === 'en' ? 'Support content creators & unlock resources' : language === 'es' ? 'Apoye a creadores de contenido y desbloquee recursos' : 'Soutenez des créateurs de contenu & débloquez des ressources'}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          {language === 'en' ? 'SocialBoost Marketplace' : language === 'es' ? 'Mercado de SocialBoost' : 'La Marketplace SocialBoost'}
        </h1>
        <p className="text-sm text-slate-500 dark:text-zinc-400 max-w-xl mx-auto">
          {language === 'en' ? 'Discover high-value certified digital gifts. Follow, share, or engage to gain instant access.' : language === 'es' ? 'Descubra regalos digitales certificados de alto valor. Siga, comparta o participe para acceder al instante.' : 'Découvrez des cadeaux digitaux certifiés à forte valeur ajoutée. Suivez, partagez ou réagissez pour y accéder instantanément.'}
        </p>
      </div>

      {/* Structured search filter block */}
      <div className="bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-slate-100 dark:border-zinc-805 shadow-sm space-y-4">
        
        <div className="flex flex-col md:flex-row gap-4">
          {/* Input Search */}
          <div className="flex-1 flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg border bg-slate-50 text-slate-400 dark:bg-zinc-950 dark:border-zinc-850">
            <Search className="w-4 h-4" />
            <input
              type="text"
              placeholder={language === 'en' ? 'Search by gift, creator, or title...' : language === 'es' ? 'Buscar por regalo, creador o título...' : 'Rechercher par cadeau, créateur ou titre...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-xs bg-transparent border-0 outline-none text-slate-800 dark:text-zinc-100 focus:ring-0"
            />
          </div>

          <div className="flex gap-3">
            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 text-xs border rounded-lg bg-slate-50 text-slate-600 dark:bg-zinc-950 dark:border-zinc-850 dark:text-zinc-300"
            >
              <option value="popularity">{language === 'en' ? 'Sort: Popularity 🔥' : language === 'es' ? 'Ordenar: Popularidad 🔥' : 'Trier: Les plus supportés 🔥'}</option>
              <option value="latest">{language === 'en' ? 'Sort: Latest 🕒' : language === 'es' ? 'Ordenar: Más recientes 🕒' : 'Trier: Les plus récents 🕒'}</option>
            </select>
          </div>
        </div>

        {/* Quick Horizontal Platform filters */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-50 dark:border-zinc-850">
          <span className="text-[10px] font-mono tracking-widest text-slate-405 dark:text-zinc-550 uppercase mr-2">{language === 'en' ? 'Platform filter:' : language === 'es' ? 'Filtro de plataforma:' : 'Filtre plateforme :'}</span>
          
          <button
            onClick={() => setSelectedPlatform('all')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
              selectedPlatform === 'all' 
                ? 'bg-blue-600 text-white shadow-sm' 
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100 dark:bg-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-850'
            }`}
          >
            {language === 'en' ? 'All Networks' : language === 'es' ? 'Todas las redes' : 'Tous les réseaux'}
          </button>
          
          {(['tiktok', 'youtube', 'instagram', 'telegram', 'twitter', 'facebook', 'linkedin'] as Platform[]).map((plat) => (
            <button
              key={plat}
              onClick={() => setSelectedPlatform(plat)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                selectedPlatform === plat 
                  ? 'bg-blue-600 text-white shadow-sm' 
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 dark:bg-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-850'
              }`}
            >
              {getPlatformLabel(plat)}
            </button>
          ))}
        </div>

      </div>

      {/* Marketplace grid of items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCampaigns.length === 0 ? (
          <div className="md:col-span-3 text-center py-20 bg-white dark:bg-zinc-900 rounded-2xl border border-slate-100 dark:border-zinc-800 space-y-4">
            <Gift className="w-12 h-12 text-slate-300 mx-auto animate-bounce" />
            <h3 className="font-bold text-slate-700 dark:text-zinc-300">{language === 'en' ? 'No resources available' : language === 'es' ? 'No hay recursos disponibles' : 'Aucune ressource disponible'}</h3>
            <p className="text-xs text-slate-400">{language === 'en' ? 'Modify your search criteria or filters to explore more.' : language === 'es' ? 'Modifique sus criterios de búsqueda o filtros para explorar.' : 'Modifiez vos critères de recherche ou de filtre pour explorer de nouvelles requêtes.'}</p>
          </div>
        ) : (
          filteredCampaigns.map((camp) => (
            <div 
              key={camp.id} 
              className="bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-3xl overflow-hidden flex flex-col justify-between group hover:shadow-md transition-all duration-200"
            >
              
              <div>
                {/* Visual Cover */}
                <div className="relative h-44 bg-slate-100 dark:bg-zinc-950">
                  <img src={camp.coverImage} alt={camp.title} className="w-full h-full object-cover transition-transform group-hover:scale-101" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className={`text-[9px] font-extrabold uppercase px-2 py-0.5 border rounded tracking-widest ${getPlatformBadgeColor(camp.platform)}`}>
                      {getPlatformLabel(camp.platform)}
                    </span>
                    <span className="text-[9px] font-bold bg-white text-gray-800 px-2 py-0.5 rounded shadow">
                      {camp.rewardType.toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Content details public */}
                <div className="p-5 space-y-4">
                  <div className="flex items-center gap-2">
                    <img src={camp.creatorAvatar} alt={camp.creatorName} className="w-6 h-6 rounded-full object-cover border" />
                    <span className="text-[10px] text-gray-400 font-medium">{camp.creatorName}</span>
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="font-extrabold text-sm sm:text-base tracking-tight leading-snug text-slate-850 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {camp.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-zinc-400 line-clamp-2">
                      {camp.description}
                    </p>
                  </div>

                  {/* Tasks visual display requirements preview */}
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-100 dark:border-zinc-850 space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-400 text-[10px]">{language === 'en' ? 'Gift to claim:' : language === 'es' ? 'Regalo a ganar:' : 'Cadeau à gagner :'}</span>
                      <strong className="font-bold text-gray-700 dark:text-zinc-300 truncate max-w-[150px]">{camp.rewardTitle}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400 text-[10px]">{language === 'en' ? 'Required Action:' : language === 'es' ? 'Acción requerida:' : 'Contrepartie :'}</span>
                      <strong className="font-semibold text-indigo-600 dark:text-indigo-400">
                        {camp.actionType === 'follow' ? (language === 'en' ? 'Follow' : language === 'es' ? 'Seguir' : t.dashTableActionAbonnement) : camp.actionType === 'subscribe' ? (language === 'en' ? 'Subscribe' : language === 'es' ? 'Suscribirse' : t.dashTableActionAbonner) : (language === 'en' ? 'Join' : language === 'es' ? 'Unirse' : t.dashTableActionPartager)} ({camp.targetHandle})
                      </strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer interaction click link */}
              <div className="p-5 border-t border-slate-50/50 dark:border-zinc-850 flex items-center justify-between">
                <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold text-slate-500">
                  <Users className="w-3.5 h-3.5 text-slate-400" />
                  <span>{camp.participantsCount} {language === 'en' ? 'redeemed' : language === 'es' ? 'reclamados' : 'rachetés'}</span>
                </div>
                
                <button
                  id={`mkt-unlock-btn-${camp.id}`}
                  onClick={() => onSelectCampaign(camp)}
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-650 text-white rounded-lg text-xs font-bold hover:opacity-95 shadow-sm inline-flex items-center gap-1 cursor-pointer transition-all"
                >
                  {language === 'en' ? 'Support & Claim' : language === 'es' ? 'Apoyar y Recibir' : 'Soutenir & Recevoir'} <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))
        )}
      </div>

    </div>
  );
}
