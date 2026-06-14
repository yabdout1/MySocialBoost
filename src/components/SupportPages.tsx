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
  ArrowLeft,
  Gift,
  ChevronDown,
  AlertTriangle
} from 'lucide-react';
import { BLOG_POSTS, FAQS } from '../mockData';
import { BlogItem } from '../types';
import { useLanguage } from '../context/LanguageContext';

const REDEMPTION_FAQS = [
  {
    id: 'red-faq-1',
    question: {
      fr: "Qu'est-ce que le rachat par récompense (reward redemption) ?",
      en: "What is reward redemption via social actions?",
      es: "¿Qué es el canje de recompensas mediante acciones sociales?",
    },
    answer: {
      fr: "Le rachat par récompense est le processus par lequel un participant (visiteur) accomplit une action d'engagement social définie (comme s'abonner à un compte TikTok, s'abonner à une chaîne YouTube, relayer un post X/Twitter) pour débloquer de manière sécurisée et gratuite l'accès à un fichier premium, un pack de ressources ou une invitation VIP.",
      en: "Reward redemption is the security-validated process where a visitor completes a specific social engagement action (like subscribing to YouTube, following on Instagram, or reposting on X) to unlock a digital asset, premium template, or community invitation for free.",
      es: "El canje por recompensa es el proceso seguro mediante el cual un visitante realiza una acción social obligatoria (como suscribirse a un canal o seguir un perfil) para desbloquear gratis un recurso premium, plantilla o código exclusivo.",
    }
  },
  {
    id: 'red-faq-2',
    question: {
      fr: "Pourquoi mon screenshot de preuve de rachat a-t-il été rejeté ?",
      en: "Why was my proof screenshot rejected during redemption?",
      es: "¿Por qué se rechazó mi captura de pantalla de comprobante de canje?",
    },
    answer: {
      fr: "Notre système d'analyse visuelle IA rejette les captures d'écran si : (1) l'image est recadrée de sorte que le bouton 'Abonné/Suivi' n'est pas lisible, (2) l'image de profil ne correspond pas aux éléments recherchés, ou (3) la preuve a déjà été soumise par un autre utilisateur. Pour valider votre rachat, importez un screenshot brut, non édité, avec l'application de média social en langue d'origine.",
      en: "Our vision AI algorithm rejects proof screenshots if: (1) the image is excessively cropped and the 'Subscribed' or 'Following' state isn't identifiable, (2) the background detail is missing, or (3) the screenshot has already been used. Please upload raw, unedited mobile or desktop screenshots.",
      es: "La IA rechaza capturas si: (1) están recortadas y no muestran el estado 'Suscrito' o 'Siguiendo', (2) faltan detalles de cuenta, o (3) la imagen ya se usó anteriormente. Sube una captura limpia y sin marcas de edición.",
    }
  },
  {
    id: 'red-faq-3',
    question: {
      fr: "Existe-t-il un quota ou une limite de rachat quotidienne ?",
      en: "Are there any daily quotas or limits on rewards redemption?",
      es: "¿Existe un límite diario en la cantidad de canjes disponibles?",
    },
    answer: {
      fr: "Oui. Pour prémunir les créateurs contre le piratage industriel, chaque utilisateur est limité à 5 rachats de récompenses réussis toutes les 24 heures. De plus, chaque campagne dispose d'un stock limite défini par le créateur. Ne tardez pas à réclamer vos cadeaux d'engagement avant l'épuisement des stocks !",
      en: "Yes. To protect creators from multi-account farming, users are limited to 5 successful reward redemptions per 24 hours. Additionally, individual campaigns have a maximum stock set by the creator. Claim your bonuses early!",
      es: "Sí. Para limitar el spam, los usuarios pueden reclamar hasta 5 recompensas al día. Además, cada campaña cuenta con un stock finito configurado por el creador.",
    }
  },
  {
    id: 'red-faq-4',
    question: {
      fr: "Que se passe-t-il si je me désabonne du créateur après le rachat ?",
      en: "What happens if I unfollow the creator after claiming my reward?",
      es: "¿Qué pasa si me desescribo o dejo de seguir al creador après le canje?",
    },
    answer: {
      fr: "SocialBoost effectue des vérifications d'intégrité aléatoires en arrière-plan. Si notre système détecte que vous vous désabonnez systématiquement des créateurs immédiatement après avoir récupéré leurs cadeaux, votre score de confiance s'effondre et vous serez banni définitivement de toutes les campagnes de l'écosystème.",
      en: "SocialBoost performs periodic background integrity audits. If our system detects rapid, systematic unfollowing behavior shortly after redeeming files, your profile Trust Score drops and you will be permanently blacklisted from all future campaigns.",
      es: "Realizamos auditorías de integridad periódicas. Dejar de seguir sistemáticamente a los creadores después de recibir sus regalos dañará tu puntaje interno de confianza, lo que restringirá permanentemente tu acceso a la plataforma.",
    }
  },
  {
    id: 'red-faq-5',
    question: {
      fr: "Le fichier de rachat est-il sécurisé et d'où provient-il ?",
      en: "Is the redeemed file safe and where is it hosted?",
      es: "¿Es seguro el archivo descargado y de dónde proviene?",
    },
    answer: {
      fr: "Tous les fichiers téléchargés sont hébergés et scannés par notre passerelle cloud pour vérifier l'absence totale de virus ou de scripts malveillants. Les liens partagés (Notion, Google Drive, Canva) proviennent directement des créateurs partenaires de confiance et font l'objet d'un audit de conformité strict par nos modérateurs avant publication.",
      en: "All file assets provided as rewards are scanned for malware and hosted behind our isolated proxy. Redirection platforms (Notion, Canva, Telegram paths) are authenticated and reviewed by physical moderators before being authorized for public viewing.",
      es: "Todos los archivos de recompensa se analizan contra malware en nuestro servidor proxy seguro. Los enlaces externos de confianza (Notion, Drive, Canva, etc.) han sido moderados y certificados por nuestro equipo antes de publicarse.",
    }
  }
];

interface SupportPagesProps {
  initialSubTab: 'blog' | 'help' | 'contact' | 'terms' | 'privacy';
}

export default function SupportPages({ initialSubTab }: SupportPagesProps) {
  const { t, language } = useLanguage();
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
  const [redemptionOpened, setRedemptionOpened] = useState<string | null>(null);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) {
      alert(t.supportSubmit);
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
          📰 {t.navBlogShort}
        </button>
        <button
          onClick={() => setSubTab('help')}
          className={`px-4 py-2 rounded-lg transition-all ${subTab === 'help' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-500 hover:bg-slate-50 dark:hover:bg-zinc-850'}`}
        >
          🙋 {t.faqShort}
        </button>
        <button
          onClick={() => setSubTab('contact')}
          className={`px-4 py-2 rounded-lg transition-all ${subTab === 'contact' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-500 hover:bg-slate-50 dark:hover:bg-zinc-850'}`}
        >
          ✉️ {language === 'en' ? 'Contact Support' : language === 'es' ? 'Contactar Soporte' : 'Contacter le Support'}
        </button>
        <button
          onClick={() => setSubTab('terms')}
          className={`px-4 py-2 rounded-lg transition-all ${subTab === 'terms' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-500 hover:bg-slate-50 dark:hover:bg-zinc-850'}`}
        >
          ⚖️ {t.cgu}
        </button>
        <button
          onClick={() => setSubTab('privacy')}
          className={`px-4 py-2 rounded-lg transition-all ${subTab === 'privacy' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-500 hover:bg-slate-50 dark:hover:bg-zinc-850'}`}
        >
          🔒 {t.privacyPolicy}
        </button>
      </div>

      {/* RENDER CONTROLLER SUBTABS */}

      {/* 1. Blog space */}
      {subTab === 'blog' && (
        <div className="space-y-6">
          {!selectedPost ? (
            <div className="space-y-8">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">{t.supportBlogTitle}</h1>
                <p className="text-xs text-slate-500 dark:text-zinc-400">{t.supportBlogSub}</p>
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
                        <span className="text-[10px] text-gray-400 font-mono">{post.date} • {post.readTime} {language === 'en' ? 'read' : language === 'es' ? 'de lectura' : 'de lecture'}</span>
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
                        {t.supportReadMore} <ChevronRight className="w-3.5 h-3.5" />
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
                <ArrowLeft className="w-3.5 h-3.5" /> {t.supportBack}
              </button>

              <div className="space-y-4">
                <span className="text-[10px] bg-indigo-50 text-indigo-700 px-3 py-1 rounded font-bold uppercase tracking-wider dark:bg-indigo-950/20 dark:text-indigo-305">
                  {selectedPost.category}
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
                  {selectedPost.title}
                </h1>
                <p className="text-xs text-slate-400 font-mono">{selectedPost.date} • {selectedPost.readTime} {language === 'en' ? 'read' : language === 'es' ? 'de lectura' : 'de lecture'} • {language === 'en' ? 'Written by Thomas Letellier' : language === 'es' ? 'Escrito por Thomas Letellier' : 'Rédigé par Thomas Letellier'}</p>
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
      {subTab === 'help' && (() => {
        const filteredRedemptionFaqs = REDEMPTION_FAQS.filter(faq => {
          const qText = (faq.question as any)[language] || faq.question.fr;
          const aText = (faq.answer as any)[language] || faq.answer.fr;
          return qText.toLowerCase().includes(faqSearch.toLowerCase()) || 
                 aText.toLowerCase().includes(faqSearch.toLowerCase());
        });

        return (
          <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-extrabold tracking-tight">{t.supportFaqTitle}</h1>
              <p className="text-xs text-slate-505 dark:text-zinc-400">{t.supportFaqSub}</p>
            </div>

            <div className="flex items-center gap-3 bg-white dark:bg-zinc-900 p-3 rounded-xl border border-slate-105 dark:border-zinc-800 shadow-sm">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder={t.supportFaqSearch}
                value={faqSearch}
                onChange={(e) => setFaqSearch(e.target.value)}
                className="w-full text-xs bg-transparent border-0 outline-none text-slate-800 dark:text-zinc-100 focus:ring-0"
              />
            </div>

            {/* Premium Highlighted Section for Reward Redemption & Claiming FAQ */}
            <div className="space-y-4">
              <div className="flex items-center gap-2.5 border-b pb-2.5 border-slate-100 dark:border-zinc-800">
                <div className="p-1.5 bg-blue-50 dark:bg-blue-950/40 rounded-lg text-blue-600 dark:text-blue-400">
                  <Gift className="w-4 h-4 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                    {language === 'en' ? "Reward Redemption Guide" : language === 'es' ? "Guía de Canje de Premios" : "Guide de Rachat par Récompense"}
                  </h3>
                  <p className="text-[10px] text-gray-450 dark:text-zinc-400 mt-0.5">
                    {language === 'en' ? "Essential answers on how to claim and troubleshoot your digital assets." : language === 'es' ? "Respuestas clave sobre cómo canjear y resolver problemas con tus premios." : "Réponses indispensables pour réclamer et configurer vos cadeaux d'engagement."}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-3.5">
                {filteredRedemptionFaqs.length === 0 ? (
                  faqSearch && (
                    <p className="text-xs text-gray-400 italic py-2">
                      {language === 'en' ? "No matching redemption support articles." : language === 'es' ? "No se encontraron artículos de canje." : "Aucune entrée de rachat correspondante à votre recherche."}
                    </p>
                  )
                ) : (
                  filteredRedemptionFaqs.map((faq) => {
                    const isOp = redemptionOpened === faq.id;
                    const qText = (faq.question as any)[language] || faq.question.fr;
                    const aText = (faq.answer as any)[language] || faq.answer.fr;
                    
                    return (
                      <div 
                        key={faq.id} 
                        id={`redemption-faq-card-${faq.id}`}
                        className="border border-blue-105 dark:border-blue-900/30 rounded-2xl overflow-hidden bg-gradient-to-r from-blue-50/15 to-indigo-50/10 dark:from-blue-950/5 dark:to-indigo-950/5 hover:border-blue-200 dark:hover:border-blue-900/60 transition-all duration-300"
                      >
                        <button
                          id={`redemption-faq-btn-${faq.id}`}
                          onClick={() => setRedemptionOpened(isOp ? null : faq.id)}
                          className="w-full px-5 py-4 text-left font-bold text-xs sm:text-sm text-slate-805 dark:text-zinc-250 hover:bg-blue-50/20 dark:hover:bg-blue-950/10 flex items-center justify-between gap-4 cursor-pointer"
                        >
                          <span className="flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                            <span className="leading-snug">{qText}</span>
                          </span>
                          <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-305 ${isOp ? 'rotate-180 text-blue-600' : ''}`} />
                        </button>
                        
                        {isOp && (
                          <div className="px-5 pb-5 pt-1 text-xs text-slate-600 dark:text-zinc-350 leading-relaxed border-t border-blue-50/50 dark:border-blue-950/10 animate-fade-in space-y-3">
                            <p className="whitespace-pre-line">{aText}</p>
                            {faq.id === 'red-faq-2' && (
                              <div className="p-3 bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/40 dark:border-amber-900/30 rounded-xl flex items-start gap-2.5 text-[10.5px] text-amber-800 dark:text-amber-200 mt-2">
                                <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                                <span>
                                  <strong>{language === 'en' ? "Actionable Tip:" : language === 'es' ? "Consejo práctico:" : "Conseil utile :"}</strong> {language === 'en' ? "Be sure to upload PNG or JPG screenshots. Private or restricted profiles might delay automatic AI verification. If in doubt, contact our support team below." : language === 'es' ? "Asegúrate de subir capturas en formato PNG o JPG. Perfiles restringidos pueden demorar la verificación de la IA." : "Assurez-vous de soumettre vos screenshots au format brut PNG ou JPG. Les profils entièrement privés ou restreints peuvent ralentir l'IA de reconnaissance de preuve d'abonnement."}
                                </span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* General FAQs Subsection */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-2 border-b pb-2.5 border-slate-100 dark:border-zinc-850">
                <HelpCircle className="w-4 h-4 text-slate-500" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {language === 'en' ? "General Help Articles" : language === 'es' ? "Artículos de Ayuda General" : "FAQ & Fonctionnement Général"}
                </h3>
              </div>

              <div className="space-y-3">
                {filteredFaqs.length === 0 ? (
                  <p className="text-center py-6 text-xs text-slate-400">
                    {language === 'en' ? "No matching help articles found." : language === 'es' ? "No se encontraron artículos de ayuda." : "Aucune notice d'aide correspondante."}
                  </p>
                ) : (
                  filteredFaqs.map((faq) => {
                    const isOp = faqOpened === faq.id;
                    return (
                      <div key={faq.id} className="border border-slate-100 dark:border-zinc-850 rounded-xl overflow-hidden bg-white/50 dark:bg-zinc-900/50">
                        <button
                          id={`help-faq-btn-${faq.id}`}
                          onClick={() => setFaqOpened(isOp ? null : faq.id)}
                          className="w-full px-5 py-4 text-left font-bold text-xs sm:text-sm text-slate-800 dark:text-zinc-200 hover:bg-slate-50 dark:hover:bg-zinc-850 flex items-center justify-between gap-4 cursor-pointer"
                        >
                          <span className="leading-snug">{faq.question}</span>
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

            {/* Contact Support CTA if no answers fit */}
            <div className="mt-8 p-6 bg-slate-50 dark:bg-zinc-950/30 border border-slate-100 dark:border-zinc-850 rounded-2xl text-center space-y-3">
              <p className="text-xs text-slate-500 dark:text-zinc-400">
                {language === 'en' 
                  ? "Didn't find what you were looking for?" 
                  : language === 'es' 
                    ? "¿No encontraste lo que buscabas?" 
                    : "Vous ne trouvez pas la réponse à votre question ?"}
              </p>
              <button
                id="contact-support-faq-btn"
                onClick={() => setSubTab('contact')}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm hover:shadow active:scale-95 cursor-pointer inline-flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                {language === 'en' 
                  ? "Contact Support" 
                  : language === 'es' 
                    ? "Contactar al soporte" 
                    : "Contacter le support"}
              </button>
            </div>
          </div>
        );
      })()}

      {/* 3. Contact Form */}
      {subTab === 'contact' && (
        <div className="max-w-2xl mx-auto bg-white dark:bg-zinc-900 rounded-3xl border border-slate-100 dark:border-zinc-800 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-xl font-extrabold">
              {language === 'en' ? "Specific question? Send a message" : language === 'es' ? "¿Preguntas específicas? Envía un mensaje" : "Une question spécifique ? Envoyez un message"}
            </h1>
            <p className="text-xs text-slate-405 dark:text-zinc-400">
              {language === 'en' ? "Our support team answers within 2 hours during business hours." : language === 'es' ? "Nuestro equipo de soporte suele responder en menos de 2 horas hábiles." : "Notre équipe de support client basée en France et au Bénin répond généralement sous 2 heures ouvrées."}
            </p>
          </div>

          {contactSuccess ? (
            <div className="p-6 rounded-2xl bg-green-50 text-center space-y-3 border border-green-100 dark:bg-green-950/20 dark:border-green-900 animate-fade-in text-xs text-gray-900 dark:text-zinc-200">
              <div className="w-10 h-10 rounded-full bg-green-150 text-green-700 mx-auto flex items-center justify-center font-bold">✓</div>
              <p className="font-extrabold text-sm text-green-800">
                {language === 'en' ? "Your help message has been sent!" : language === 'es' ? "¡Su mensaje de ayuda ha sido enviado!" : "Votre message d'aide a été envoyé !"}
              </p>
              <p className="text-slate-500">
                {language === 'en' ? "A support ticket No. " : language === 'es' ? "Un ticket de soporte No. " : "Un ticket de support No. "}
                <strong>SB-TCK-{Math.floor(Math.random() * 8000) + 1000}</strong>
                {language === 'en' ? " was just opened for your account. Thank you!" : language === 'es' ? " se acaba de abrir para su cuenta. ¡Gracias!" : " vient d'être ouvert pour votre compte. Merci !"}
              </p>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="space-y-4 text-xs select-none">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-gray-700 dark:text-zinc-300">
                    {language === 'en' ? "Full name *" : language === 'es' ? "Nombre completo *" : "Nom complet *"}
                  </label>
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
                  <label className="font-bold text-gray-700 dark:text-zinc-300">
                    {language === 'en' ? "Valid email address *" : language === 'es' ? "Correo electrónico válido *" : "Adresse e-mail valide *"}
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="crea@gmail.com"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border bg-slate-50 dark:bg-zinc-950 text-slate-800 dark:text-zinc-100 border-slate-200 dark:border-zinc-850"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-gray-700 dark:text-zinc-300">
                  {language === 'en' ? "Primary subject of the request" : language === 'es' ? "Asunto principal de la solicitud" : "Sujet principal de la requête"}
                </label>
                <select
                  value={contactSubject}
                  onChange={(e) => setContactSubject(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border bg-slate-50 dark:bg-zinc-950 text-slate-800 dark:text-zinc-100 border-slate-200 dark:border-zinc-850"
                >
                  <option value="tech_question">
                    {language === 'en' ? "Technical support (Redirection / Screenshot)" : language === 'es' ? "Soporte técnico (Redirección / Captura)" : "Assistance technique (Redirection / Screenshot)"}
                  </option>
                  <option value="billing">
                    {language === 'en' ? "Billing issue or Pro Plan" : language === 'es' ? "Facturación o Plan Pro" : "Question de facturation ou Plan Pro"}
                  </option>
                  <option value="abuse">
                    {language === 'en' ? "Report abuse or non-compliant campaign" : language === 'es' ? "Reportar abuso o campaña no conforme" : "Signaler une campagne suspecte ou non-conforme"}
                  </option>
                  <option value="fedapay">
                    {language === 'en' ? "FedaPay or Mobile Money integration" : language === 'es' ? "Integración de FedaPay o Mobile Money" : "Intégration FedaPay ou Mobile Money"}
                  </option>
                  <option value="other">
                    {language === 'en' ? "Other general request" : language === 'es' ? "Otra solicitud general" : "Autre demande générale"}
                  </option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-gray-700 dark:text-zinc-300">
                  {language === 'en' ? "Details of your message *" : language === 'es' ? "Detalles de su message *" : "Détails de votre message *"}
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder={language === 'en' ? "Describe your needs precisely so we can respond effectively..." : language === 'es' ? "Describa detalladamente para ayudarnos a responder de manera efectiva..." : "Décrivez précisément votre besoin pour nous aider à vous répondre efficacement..."}
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border bg-slate-50 dark:bg-zinc-950 text-slate-805 dark:text-zinc-100 border-slate-200 dark:border-zinc-850"
                />
              </div>

              <button
                id="contact-btn-submit"
                type="submit"
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white dark:bg-zinc-100 dark:text-zinc-900 rounded-xl font-bold flex items-center justify-center gap-1 cursor-pointer transition-all"
              >
                <Send className="w-4 h-4" /> {t.supportContactButton}
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
              <h1 className="text-xl font-extrabold">{t.supportTermsTitle}</h1>
              <p className="text-[10px] text-gray-405 font-mono">
                {language === 'en' ? "Last updated: June 5, 2026" : language === 'es' ? "Última actualización: 5 de junio de 2026" : "Dernière mise à jour : 05 Juin 2026"}
              </p>
            </div>
            <button onClick={() => window.print()} className="p-2 border hover:bg-slate-50 rounded-lg text-slate-500">
              <Printer className="w-4 h-4" />
            </button>
          </div>

          <div className="text-xs sm:text-sm text-slate-600 dark:text-zinc-300 whitespace-pre-wrap leading-relaxed space-y-4 text-justify select-text">
            {language === 'en' ? (
              <>
                <p><strong>1. Purpose of the Platform:</strong> SocialBoost offers a SaaS middleware allowing content creators ("Creators") to set up value exchange gateways. Creators reward user support actions voluntarily with premium files, tips or access codes.</p>
                <p><strong>2. Engagement Guidelines:</strong> Required social support activities (following, subscribing) are completely voluntary and do not violate social platform terms, as premium gifts are organic assets provided directly by the Creator without monetary transactions.</p>
                <p><strong>3. Anti-Spam Protections:</strong> Users are prohibited from using automatic bots, browser fingerprint modifiers, or fake/reused proof screenshots. Any fraudulent attempt will result in immediate service suspension.</p>
              </>
            ) : language === 'es' ? (
              <>
                <p><strong>1. Objeto de la plataforma:</strong> SocialBoost ofrece una solución de software tecnológico intermedio SaaS que permite a los creadores de contenido ("Creadores") configurar puertas de enlace de intercambio de valor.</p>
                <p><strong>2. Prácticas de participación:</strong> Las acciones sociales requeridas no infringen los términos del servicio de las redes sociales correspondientes, ya que los regalos digitales o códigos son suministrados directamente por el creador.</p>
                <p><strong>3. Protección anti-spam:</strong> Los usuarios tienen prohibido utilizar bots automatizados o imágenes falsas reutilizadas. Nos reservamos el derecho de suspender las cuentas que intenten fraudar el sistema.</p>
              </>
            ) : (
              <>
                <p><strong>1. Objet de la plateforme :</strong> SocialBoost offre un middleware technologique SaaS permettant aux créateurs de contenu (« Créateurs ») de configurer des portails d'échange de valeur. Les créateurs de contenu récompensent les actions d'engagement des visiteurs de manière volontaire.</p>
                <p><strong>2. Pratiques d'engagement :</strong> Les actions sociales requises (abonnements TikTok, likes Instagram, partages X) ne violent pas les clauses d'API des plateformes respectives, car aucune récompense monétaire n'est fournie directement par SocialBoost en échange des abonnements, s'assimilant à de la promotion d'audience organique saine.</p>
                <p><strong>3. Protection anti-spam :</strong> Les utilisateurs s'interdisent d'utiliser des scripts automatiques, des émulateurs d'empreinte digitale de navigateur ou de fausses captures d'écran de profil pour contourner l'évaluation automatisée par vision artificielle. Tout abus constaté entraînera l'archivage sans préavis des comptes fraudeurs.</p>
              </>
            )}
          </div>
        </div>
      )}

      {/* 5. Politique de Confidentialité */}
      {subTab === 'privacy' && (
        <div className="max-w-3xl mx-auto bg-white dark:bg-zinc-900 rounded-3xl border shadow-sm p-6 sm:p-10 space-y-6">
          <div className="flex items-center justify-between border-b pb-4">
            <div>
              <h2 className="text-xl font-extrabold">{t.supportPrivacyTitle}</h2>
              <p className="text-[10px] text-gray-405 font-mono">
                {language === 'en' ? "Last updated: June 5, 2026" : language === 'es' ? "Última actualización: 5 de junio de 2026" : "Dernière mise à jour : 05 Juin 2026"}
              </p>
            </div>
            <button onClick={() => window.print()} className="p-2 border hover:bg-slate-50 rounded-lg text-slate-500">
              <Printer className="w-4 h-4" />
            </button>
          </div>

          <div className="text-xs sm:text-sm text-slate-605 dark:text-zinc-300 leading-relaxed whitespace-pre-wrap space-y-4 text-justify select-text">
            {language === 'en' ? (
              <>
                <p><strong>1. Email Processing:</strong> For delivery of digital gifts, the email address filled (and optioned) is shared with the campaign creator with raw user express consent under GDPR standards.</p>
                <p><strong>2. Screen AI Processing:</strong> Uploaded verification proof is fugitive-only inspected in secure volatile cache memory. User profiles or private conversations are never logged or sold commercially.</p>
                <p><strong>3. User Rights:</strong> European or worldwide users can request full deletion of their engagement history or open support requests on support@socialboost.app.</p>
              </>
            ) : language === 'es' ? (
              <>
                <p><strong>1. Datos de correo electrónico:</strong> En el marco de la entrega de regalos, el correo electrónico del participante se comparte exclusivamente con el creador bajo su consentimiento expreso de acuerdo con las normativas RGPD.</p>
                <p><strong>2. Procesamiento de IA Visual:</strong> La captura de pantalla cargada se procesa efímeramente en memoria caché temporal. Los datos de perfil correspondientes nunca se graban permanentemente en base de datos.</p>
                <p><strong>3. Derechos del usuario:</strong> Cualquier participante puede solicitar la eliminación total de sus trazas de interacción social contactando a support@socialboost.app.</p>
              </>
            ) : (
              <>
                <p><strong>1. Traitement des e-mails :</strong> Dans le cadre de déblocages de cadeaux digitaux, l'adresse e-mail saisie par l'abonné n'est fournie au propriétaire de la campagne qu'avec le consentement exprès de l'intéressé (case à cocher RGPD conforme).</p>
                <p><strong>2. Analyse visuelle de screenshot par IA :</strong> Lorsque vous téléchargez un screenshot de preuve, l'image est fugitivement traitée en mémoire tampon par notre algorithme de vision par ordinateur hébergé de façon isolée. L'image de profil ou tout autre message privé visible n'est jamais consigné de façon persistante dans nos bases de données.</p>
                <p><strong>3. Vos Droits (Article 15 RGPD) :</strong> Chaque individu d'Europe ou d'Afrique peut demander l'accès complet, la correction ou la suppression totale de ses traces d'engagement social en postulant à support@socialboost.app.</p>
              </>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
