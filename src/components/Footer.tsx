import React from 'react';
import { Sparkles, HeartHandshake, ShieldCheck, Mail, HelpCircle } from 'lucide-react';

interface FooterProps {
  setCurrentTab: (tab: string) => void;
}

export default function Footer({ setCurrentTab }: FooterProps) {
  return (
    <footer className="border-t bg-white dark:bg-zinc-950 text-gray-600 dark:text-zinc-400 border-gray-100 dark:border-zinc-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Logo Brand column */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => setCurrentTab('home')}>
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-violet-600 text-white">
                <Sparkles className="w-4.5 h-4.5" />
              </div>
              <span className="font-sans font-bold text-lg bg-gradient-to-r from-blue-600 to-violet-500 bg-clip-text text-transparent">
                SocialBoost
              </span>
            </div>
            <p className="text-xs leading-relaxed text-gray-500 dark:text-zinc-500">
              « Développez votre audience grâce à la valeur que vous offrez. »
            </p>
            <p className="text-xs text-gray-400 dark:text-zinc-650 font-mono">
              La passerelle SaaS ultime entre influenceurs francophones et abonnés engagés.
            </p>
          </div>

          {/* SaaS Navigation */}
          <div>
            <h4 className="text-xs font-bold text-gray-900 dark:text-zinc-200 uppercase tracking-wider mb-4">
              Plateforme
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setCurrentTab('marketplace')} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Marketplace de Récompenses
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('pricing')} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Plans d'Abonnement
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('blog')} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Le Blog Growth
                </button>
              </li>
            </ul>
          </div>

          {/* Pro Resources */}
          <div>
            <h4 className="text-xs font-bold text-gray-900 dark:text-zinc-200 uppercase tracking-wider mb-4">
              Ressources & Support
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setCurrentTab('help')} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Foire aux questions (FAQ)
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('help')} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Centre d'aide intégrale
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('contact')} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Contacter le support client
                </button>
              </li>
            </ul>
          </div>

          {/* Legal columns */}
          <div>
            <h4 className="text-xs font-bold text-gray-900 dark:text-zinc-200 uppercase tracking-wider mb-4">
              Mentions Légales
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setCurrentTab('terms')} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Conditions Générales d'Utilisation
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('privacy')} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Politique de Confidentialité RGPD
                </button>
              </li>
              <li className="flex items-center gap-1.5 text-[10px] text-emerald-500 font-semibold bg-emerald-50 dark:bg-emerald-950/20 px-2 py-1 rounded inline-flex mt-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Conformité 100% RGPD
              </li>
            </ul>
          </div>

        </div>

        {/* Legal Stripe footer bottom */}
        <div className="border-t pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-gray-100 dark:border-zinc-800">
          <p className="text-[11px] text-gray-400 dark:text-zinc-650">
            &copy; {new Date().getFullYear()} SocialBoost Corp. Tous droits réservés. Développé en conformité avec les conditions d'utilisation des plateformes sociales.
          </p>
          <div className="flex items-center gap-4 text-[10px] text-gray-400 dark:text-zinc-600">
            <span className="flex items-center gap-1">
              <Mail className="w-3 h-3 text-violet-500" /> support@socialboost.app
            </span>
            <span className="flex items-center gap-1">
              <HeartHandshake className="w-3 h-3 text-red-500" /> Fait avec amour pour les Créateurs
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
