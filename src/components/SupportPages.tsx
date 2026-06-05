import React, { useState } from 'react';
import { 
  BookOpen, 
  HelpCircle, 
  ShieldCheck, 
  Mail, 
  Send, 
  Check, 
  ChevronRight, 
  Printer, 
  Search,
  MessageSquare,
  Lock,
  Phone,
  Clock,
  ArrowLeft
} from 'lucide-react';
import { BLOG_POSTS, FAQS } from '../mockData';
import { BlogItem } from '../types';

interface SupportPagesProps {
  initialSubTab: 'blog' | 'help' | 'contact' | 'terms' | 'privacy';
}

export default function SupportPages({ initialSubTab }: SupportPagesProps) {
  const [subTab, setSubTab] = useState<'blog' | 'help' | 'contact' | 'terms' | 'privacy'>(initialSubTab);
  const [selectedPost, setSelectedPost] = useState<BlogItem | null>(null);
  
  // Contact Form states
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactSubject, setContactSubject] = useState('tech_question');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSuccess, setContactSuccess] = useState(false);

  // FAQ Categories states
  const [faqSearch, setFaqSearch] = useState('');
  const [faqOpened, setFaqOpened] = useState<string | null>(null);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) {
      alert('Veuillez remplir vôtres coordonnées obligatoires.');
      return;
    }
    setContactSuccess(true);
    setTimeout(() => {
      setContactSuccess(false);
      setContactName('');
      setContactEmail('');
      setContactMessage('');
    }, 4500);
  };

  const filteredFaqs = FAQS.filter(f => 
    f.question.toLowerCase().includes(faqSearch.toLowerCase()) || 
    f.answer.toLowerCase().includes(faqSearch.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-8 animate-fade-in text-gray-900 dark:text-zinc-150">
      
      {/* Quick horizontal Subtab picker */}
      <div className="flex flex-wrap items-center justify-center gap-2 border-b pb-4 border-slate-100 dark:border-zinc-800 text-xs font-semibold">
        <button
          onClick={() => { setSubTab('blog'); setSelectedPost(null); }}
          className={`px-4 py-2 rounded-lg transition-all ${subTab === 'blog' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-500 hover:bg-slate-50 dark:hover:bg-zinc-850'}`}
        >
          📰 Le Blog Growth
        </button>
        <button
          onClick={() => setSubTab('help')}
          className={`px-4 py-2 rounded-lg transition-all ${subTab === 'help' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-500 hover:bg-slate-50 dark:hover:bg-zinc-850'}`}
        >
          🙋 Centre d'aide & FAQ
        </button>
        <button
          onClick={() => setSubTab('contact')}
          className={`px-4 py-2 rounded-lg transition-all ${subTab === 'contact' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-500 hover:bg-slate-50 dark:hover:bg-zinc-850'}`}
        >
          ✉️ Contacter le Support
        </button>
        <button
          onClick={() => setSubTab('terms')}
          className={`px-4 py-2 rounded-lg transition-all ${subTab === 'terms' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-500 hover:bg-slate-50 dark:hover:bg-zinc-850'}`}
        >
          ⚖️ CGU d'Utilisation
        </button>
        <button
          onClick={() => setSubTab('privacy')}
          className={`px-4 py-2 rounded-lg transition-all ${subTab === 'privacy' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-500 hover:bg-slate-50 dark:hover:bg-zinc-850'}`}
        >
          🔒 RGPD Confidentialité
        </button>
      </div>

      {/* RENDER CONTROLLER SUBTABS */}

      {/* 1. Blog space */}
      {subTab === 'blog' && (
        <div className="space-y-6">
          {!selectedPost ? (
            <div className="space-y-8">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Le Blog de la Creator Economy</h1>
                <p className="text-xs text-slate-500 dark:text-zinc-400">Astuces exclusives pour augmenter vôtres taux d’engagement, percer avec les shorts et monétiser vos leads.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {BLOG_POSTS.map((post) => (
                  <div key={post.id} className="bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-2xl overflow-hidden group hover:shadow shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="relative h-48 sm:h-56 bg-slate-100 dark:bg-zinc-950">
                        <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform group-hover:scale-101" />
                        <span className="absolute top-4 left-4 text-[9px] bg-indigo-650 text-white px-2.5 py-0.5 rounded font-bold uppercase font-mono tracking-wider">
                          {post.category}
                        </span>
                      </div>
                      <div className="p-5 space-y-2">
                        <span className="text-[10px] text-gray-400 font-mono">{post.date} • {post.readTime} de lecture</span>
                        <h3 className="font-extrabold text-slate-850 dark:text-zinc-100 text-base group-hover:text-blue-600 transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
                          {post.summary}
                        </p>
                      </div>
                    </div>
                    <div className="p-5 pt-0">
                      <button
                        id={`blog-read-btn-${post.id}`}
                        onClick={() => setSelectedPost(post)}
                        className="text-xs font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400 flex items-center gap-1 transition-all"
                      >
                        Lire l'article complet <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-zinc-900 rounded-3xl border p-6 sm:p-10 max-w-3xl mx-auto space-y-6">
              <button
                onClick={() => setSelectedPost(null)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-blue-600 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Retour aux articles
              </button>

              <div className="space-y-4">
                <span className="text-[10px] bg-indigo-50 text-indigo-700 px-3 py-1 rounded font-bold uppercase tracking-wider dark:bg-indigo-950/20 dark:text-indigo-305">
                  {selectedPost.category}
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
                  {selectedPost.title}
                </h1>
                <p className="text-xs text-slate-400 font-mono">{selectedPost.date} • {selectedPost.readTime} de lecture • Rédigé par Thomas Letellier</p>
              </div>

              <div className="h-64 sm:h-80 bg-slate-100 dark:bg-zinc-950 rounded-2xl overflow-hidden">
                <img src={selectedPost.image} alt="" className="w-full h-full object-cover" />
              </div>

              {/* Simulated Rich Content Markdown render wrapper */}
              <div className="prose dark:prose-invert max-w-full text-xs sm:text-sm text-slate-600 dark:text-zinc-300 leading-relaxed whitespace-pre-wrap space-y-4">
                {selectedPost.content}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 2. FAQ accordions */}
      {subTab === 'help' && (
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-extrabold tracking-tight">Centre d'assistance SocialBoost</h1>
            <p className="text-xs text-slate-500">Une base de connaissances claire pour tirer le meilleur profit de vôtres campagnes d'engagement.</p>
          </div>

          <div className="flex items-center gap-3 bg-white dark:bg-zinc-900 p-3 rounded-xl border border-slate-105 shadow-sm">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher une question (ex: désabonnement, API, FedaPay)..."
              value={faqSearch}
              onChange={(e) => setFaqSearch(e.target.value)}
              className="w-full text-xs bg-transparent border-0 outline-none text-slate-800 dark:text-zinc-100 focus:ring-0"
            />
          </div>

          <div className="space-y-3">
            {filteredFaqs.length === 0 ? (
              <p className="text-center py-8 text-xs text-slate-400">Aucune notice d'aide correspondante.</p>
            ) : (
              filteredFaqs.map((faq) => {
                const isOp = faqOpened === faq.id;
                return (
                  <div key={faq.id} className="border border-slate-100 dark:border-zinc-850 rounded-xl overflow-hidden bg-white/50 dark:bg-zinc-900/50">
                    <button
                      id={`help-faq-btn-${faq.id}`}
                      onClick={() => setFaqOpened(isOp ? null : faq.id)}
                      className="w-full px-5 py-4 text-left font-bold text-xs sm:text-sm text-slate-800 dark:text-zinc-200 hover:bg-slate-50 dark:hover:bg-zinc-850 flex items-center justify-between gap-4"
                    >
                      <span>{faq.question}</span>
                      <span className="text-slate-400 font-bold shrink-0">{isOp ? '−' : '+'}</span>
                    </button>
                    {isOp && (
                      <div className="px-5 pb-5 pt-1 text-xs text-slate-500 dark:text-zinc-400 leading-relaxed border-t border-slate-50 dark:border-zinc-850/50">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* 3. Contact Form */}
      {subTab === 'contact' && (
        <div className="max-w-2xl mx-auto bg-white dark:bg-zinc-900 rounded-3xl border border-slate-100 dark:border-zinc-800 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-xl font-extrabold">Une question spécifique ? Envoyez un message</h1>
            <p className="text-xs text-slate-505 dark:text-zinc-400">Notre équipe de support client basée en France et au Bénin répond généralement sous 2 heures ouvrées.</p>
          </div>

          {contactSuccess ? (
            <div className="p-6 rounded-2xl bg-green-50 text-center space-y-3 border border-green-100 dark:bg-green-950/20 dark:border-green-900 animate-fade-in text-xs">
              <div className="w-10 h-10 rounded-full bg-green-150 text-green-700 mx-auto flex items-center justify-center font-bold">✓</div>
              <p className="font-extrabold text-sm text-green-800">Votre message d'aide a été envoyé !</p>
              <p className="text-slate-500">Un ticket de support No. <strong>SB-TCK-{Math.floor(Math.random() * 8000) + 1000}</strong> vient d'être ouvert pour vôtres compte. Merci !</p>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="space-y-4 text-xs select-none">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-gray-700 dark:text-zinc-350">Nom complet *</label>
                  <input
                    type="text"
                    required
                    placeholder="Thomas"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border bg-slate-50 dark:bg-zinc-950 text-slate-800 dark:text-zinc-100 border-slate-200 dark:border-zinc-850"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-gray-700 dark:text-zinc-350">Adresse e-mail valide *</label>
                  <input
                    type="email"
                    required
                    placeholder="crea@gmail.com"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border bg-slate-50 dark:bg-zinc-950 check_email border-slate-205"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-gray-700 dark:text-zinc-350">Sujet principal de la requête</label>
                <select
                  value={contactSubject}
                  onChange={(e) => setContactSubject(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border bg-slate-50 dark:bg-zinc-950 border-slate-200"
                >
                  <option value="tech_question">Assistance technique (Redirection / Screenshot)</option>
                  <option value="billing">Question de facturation ou Plan Pro</option>
                  <option value="abuse">Signaler une campagne suspecte ou non-conforme</option>
                  <option value="fedapay">Intégration FedaPay ou Mobile Money</option>
                  <option value="other">Autre demande générale</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-gray-700 dark:text-zinc-350">Détails de vôtres message *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Décrivez précisément votre besoin pour nous aider à vous répondre efficacement..."
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border bg-slate-50 dark:bg-zinc-950 border-slate-200"
                />
              </div>

              <button
                id="contact-btn-submit"
                type="submit"
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white dark:bg-zinc-100 dark:text-zinc-900 rounded-xl font-bold flex items-center justify-center gap-1 cursor-pointer transition-all"
              >
                <Send className="w-4 h-4" /> Envoyer vôtres message d'assistance
              </button>

            </form>
          )}
        </div>
      )}

      {/* 4. CGU d'utilisation */}
      {subTab === 'terms' && (
        <div className="max-w-3xl mx-auto bg-white dark:bg-zinc-900 rounded-3xl border shadow-sm p-6 sm:p-10 space-y-6">
          <div className="flex items-center justify-between border-b pb-4">
            <div>
              <h1 className="text-xl font-extrabold">Conditions Générales d'Utilisation (CGU)</h1>
              <p className="text-[10px] text-gray-405 font-mono">Dernière mise à jour : 05 Juin 2026</p>
            </div>
            <button onClick={() => window.print()} className="p-2 border hover:bg-slate-50 rounded-lg text-slate-500">
              <Printer className="w-4 h-4" />
            </button>
          </div>

          <div className="text-xs sm:text-sm text-slate-600 dark:text-zinc-300 whitespace-pre-wrap leading-relaxed space-y-4">
            <p><strong>1. Objet de la plateforme :</strong> SocialBoost offre un middleware technologique SaaS permettant aux créateurs de contenu (« Créateurs ») de configurer des portails d'échange de valeur. Les créateurs de contenu récompensent les actions d'engagement des visiteurs de manière volontaire.</p>
            <p><strong>2. Pratiques d'engagement :</strong> Les actions sociales requises (abonnements TikTok, likes Instagram, partages X) ne violent pas les clauses d'API des plateformes respectives, car aucune récompense monétaire n'est fournie directement par SocialBoost en échange des abonnements, s'assimilant à de la promotion d'audience organique saine.</p>
            <p><strong>3. Protection anti-spam :</strong> Les utilisateurs s'interdisent d'utiliser des scripts automatiques, des émulateurs d'empreinte digitale de navigateur ou de fausses captures d'écran de profil pour contourner l'évaluation automatisée par vision artificielle. Tout abus constaté entraînera l'archivage sans préavis des comptes fraudeurs.</p>
          </div>
        </div>
      )}

      {/* 5. Politique de Confidentialité */}
      {subTab === 'privacy' && (
        <div className="max-w-3xl mx-auto bg-white dark:bg-zinc-900 rounded-3xl border shadow-sm p-6 sm:p-10 space-y-6">
          <div className="flex items-center justify-between border-b pb-4">
            <div>
              <h2 className="text-xl font-extrabold">Politique de Confidentialité & RGPD</h2>
              <p className="text-[10px] text-gray-405 font-mono">Dernière mise à jour : 05 Juin 2026</p>
            </div>
            <button onClick={() => window.print()} className="p-2 border hover:bg-slate-50 rounded-lg text-slate-500">
              <Printer className="w-4 h-4" />
            </button>
          </div>

          <div className="text-xs sm:text-sm text-slate-605 dark:text-zinc-300 leading-relaxed whitespace-pre-wrap space-y-4">
            <p><strong>1. Traitement des e-mails :</strong> Dans le cadre de déblocages de cadeaux digitaux, l'adresse e-mail saisie par l'abonné n'est fournie au propriétaire de la campagne qu'avec le consentement exprès de l'intéressé (case à cocher RGPD conforme).</p>
            <p><strong>2. Analyse visuelle de screenshot par IA :</strong> Lorsque vous téléchargez un screenshot de preuve, l'image est fugitivement traitée en mémoire tampon par notre algorithme de vision par ordinateur hébergé de façon isolée. L'image de profil ou tout autre message privé visible n'est jamais consigné de façon persistante dans nos bases de données.</p>
            <p><strong>3. Vos Droits (Article 15 RGPD) :</strong> Chaque individu d'Europe ou d'Afrique peut demander l'accès complet, la correction ou la suppression totale de ses traces d'engagement social en postulant à support@socialboost.app.</p>
          </div>
        </div>
      )}

    </div>
  );
}
