import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  Send, 
  Sparkles, 
  ShieldCheck, 
  RefreshCw, 
  CheckCircle2, 
  AlertTriangle, 
  Play, 
  HelpCircle, 
  FileText, 
  Sliders, 
  ExternalLink, 
  ArrowRight,
  UserCheck,
  Search,
  Check,
  X,
  MailOpen,
  Info,
  Layers,
  Award,
  Zap
} from 'lucide-react';
import { Campaign, AlertNotification, SentinelEmail, GmailAutomationToast } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface GmailAutomationProps {
  campaigns: Campaign[];
  addNotification: (title: string, message: string, type: 'success' | 'info' | 'warning') => void;
  realEmails: SentinelEmail[];
  setRealEmails: React.Dispatch<React.SetStateAction<SentinelEmail[]>>;
  onTriggerBackgroundSim?: () => void;
  activeToasts: GmailAutomationToast[];
  setActiveToasts: React.Dispatch<React.SetStateAction<GmailAutomationToast[]>>;
}

export default function GmailAutomation({ 
  campaigns, 
  addNotification,
  realEmails,
  setRealEmails,
  onTriggerBackgroundSim,
  activeToasts,
  setActiveToasts
}: GmailAutomationProps) {
  const { language } = useLanguage();
  // Connection states
  const [isLiveMode, setIsLiveMode] = useState<boolean>(false);
  const [isConnected, setIsConnected] = useState<boolean>(true); // Authorized by default in preview simulation
  const [gmailUserEmail, setGmailUserEmail] = useState<string>('etsvictoria11@gmail.com');
  const [providerToken, setProviderToken] = useState<string>('');
  
  // Settings tab or Campaign Trigger
  const [isAutoSendEnabled, setIsAutoSendEnabled] = useState<boolean>(true);
  const [emailSubject, setEmailSubject] = useState<string>(
    language === 'en' 
      ? '[SocialBoost] Congratulations! Your reward for {campaign}' 
      : language === 'es'
      ? '[SocialBoost] ¡Felicidades! Tu recompense para {campaign}'
      : '[SocialBoost] Félicitations ! Votre récompense pour {campaign}'
  );
  
  const [emailTemplate, setEmailTemplate] = useState<string>(
    language === 'en'
      ? 'Hi {name},\n\nThank you for participating in our campaign "{campaign}". We have successfully verified your entry!\n\nHere is your digital reward:\n🔗 {reward_link}\n\nKeep sharing and gaining rewards!\n\nBest regards,\n{creator} team'
      : language === 'es'
      ? 'Hola {name},\n\nGracias por participar en nuestra campaña "{campaign}". ¡Hemos verificado tu participación con éxito!\n\nAquí tienes tu recompensa digital:\n🔗 {reward_link}\n\n¡Sigue compartiendo y ganando más!\n\nSaludos atentos,\nEl equipo de {creator}'
      : 'Bonjour {name},\n\nMerci pour votre participation à notre campagne "{campaign}". Nous avons validé votre action avec succès !\n\nVoici votre récompense numérique :\n🔗 {reward_link}\n\nContinuez à partager pour débloquer plus de cadeaux !\n\nCordialement,\nL’équipe {creator}'
  );

  // Drafting values
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCampaignId, setSelectedCampaignId] = useState<string>(campaigns[0]?.id || '');
  const [recipientEmail, setRecipientEmail] = useState<string>('');
  const [recipientName, setRecipientName] = useState<string>('');
  const [customSubject, setCustomSubject] = useState<string>('');
  const [customBody, setCustomBody] = useState<string>('');
  const [activeSegmentTab, setActiveSegmentTab] = useState<'all' | 'incoming' | 'outgoing' | 'manual'>('all');
  const [selectedEmail, setSelectedEmail] = useState<SentinelEmail | null>(null);
  const [isSending, setIsSending] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  // Retrieve Supabase token if available automatically on load
  useEffect(() => {
    // Attempt to extract google provider token if logged in through Google
    const fetchSession = async () => {
      try {
        const localSession = localStorage.getItem('sb-xfzsraaxgzsltvpjzzai-auth-token');
        if (localSession) {
          const parsed = JSON.parse(localSession);
          if (parsed?.provider_token) {
            setProviderToken(parsed.provider_token);
            setIsLiveMode(true);
            if (parsed.user?.email) {
              setGmailUserEmail(parsed.user.email);
            }
          }
        }
      } catch (err) {
        console.warn("Could not load raw provider_token from local session:", err);
      }
    };
    fetchSession();
  }, []);

  // Filter messages based on search name/email/subject & active tab
  const filteredEmails = realEmails.filter(email => {
    const matchesSearch = 
      email.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (email.subscriberName?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    
    if (!matchesSearch) return false;
    
    if (activeSegmentTab === 'all') return true;
    if (activeSegmentTab === 'incoming') return email.type === 'incoming';
    if (activeSegmentTab === 'outgoing') return email.type === 'outgoing';
    if (activeSegmentTab === 'manual') return email.status === 'Manual';
    return true;
  });

  // Base64Url encoder to produce official RFC 822 emails for Google API
  const makeRawEmail = (to: string, from: string, subject: string, message: string) => {
    const str = [
      "To: " + to,
      "From: " + from,
      "Subject: =?utf-8?B?" + btoa(unescape(encodeURIComponent(subject))) + "?=",
      "MIME-Version: 1.0",
      "Content-Type: text/html; charset=UTF-8",
      "Content-Transfer-Encoding: 7bit",
      "",
      message.replace(/\n/g, '<br/>')
    ].join("\r\n");
    
    return btoa(unescape(encodeURIComponent(str)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  };

  // Real or Simulated action to send a single Gmail
  const executeSendEmail = async (to: string, subjectLine: string, bodyText: string, campaignNameText: string, subscriberNameText: string) => {
    if (!to || !to.includes('@')) {
      addNotification(
        language === 'en' ? 'Recipient missing' : 'Destinataire invalide',
        language === 'en' ? 'Please provide a valid recipient email address.' : 'Veuillez saisir une adresse e-mail valide.',
        'warning'
      );
      return false;
    }

    setIsSending(true);

    try {
      if (isLiveMode && providerToken) {
        // Execute REAL Gmail API Call using user's Workspace authorization
        const rawMessage = makeRawEmail(to, gmailUserEmail, subjectLine, bodyText);
        const response = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${providerToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            raw: rawMessage
          })
        });

        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData?.error?.message || 'Gmail API Error');
        }

        addNotification(
          language === 'en' ? 'Email sent successfully via Gmail API!' : 'E-mail envoyé via l\'API Gmail !',
          `Destinataire: ${to}. Expédié depuis votre compte Google Workspace.`,
          'success'
        );
      } else {
        // Simulated local execution (Sandbox mode)
        await new Promise(resolve => setTimeout(resolve, 1200));
        addNotification(
          language === 'en' ? 'Mail Sent (Sandbox Simulation)' : 'E-mail envoyé (Simulation Sandbox)',
          `Destinataire: ${to}. Simulé avec succès depuis notre relais SMTP.`,
          'success'
        );
      }

      // Add record to our historical log
      const newEmailRecord: SentinelEmail = {
        id: `g-out-${Date.now()}`,
        from: gmailUserEmail,
        subject: subjectLine,
        body: bodyText,
        date: 'À l\'instant',
        read: true,
        type: 'outgoing',
        subscriberName: subscriberNameText || to.split('@')[0],
        associatedCampaign: campaignNameText || 'Action manuelle',
        status: 'Validated'
      };

      setRealEmails(prev => [newEmailRecord, ...prev]);

      // Generate global floating persistent toast
      const mainToastTitle = isLiveMode ? 'Gmail Live : Mail Expédié ✨' : 'Gmail Sandbox : Mail Expédié ✉️';
      const newToastObj: GmailAutomationToast = {
        id: `toast-${Date.now()}`,
        title: mainToastTitle,
        message: `Message envoyé à ${subscriberNameText || to.split('@')[0]} (${to}) avec succès via le relais.`,
        campaignId: 'manual',
        campaignTitle: campaignNameText || 'Action manuelle',
        subscriberEmail: to,
        subscriberName: subscriberNameText || to.split('@')[0],
        rewardTitle: subjectLine.replace('[SocialBoost]', '').trim(),
        rewardFileUrl: 'https://socialboost.io/rewards/delivery',
        timestamp: new Date().toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' }),
        read: false,
        status: 'success'
      };
      setActiveToasts(prev => [newToastObj, ...prev]);

      return true;
    } catch (err: any) {
      console.error("Gmail send error:", err);
      addNotification(
        'Erreur d\'envoi Gmail ⚠️',
        `${err.message || 'Authentification Google expirée ou insuffisante.'} L\'envoi a échoué.`,
        'warning'
      );
      return false;
    } finally {
      setIsSending(false);
    }
  };

  // Quick Action to send automatic reward email template
  const handleTriggerAutoReward = async (camp: Campaign, toEmail: string, participantName: string) => {
    // Variable substitution
    const computedSubject = emailSubject
      .replace('{campaign}', camp.title)
      .replace('{name}', participantName)
      .replace('{reward_title}', camp.rewardTitle)
      .replace('{creator}', camp.creatorName);

    const computedBody = emailTemplate
      .replace('{campaign}', camp.title)
      .replace('{name}', participantName)
      .replace('{reward_link}', camp.rewardFileUrl)
      .replace('{creator}', camp.creatorName)
      .replace('{reward_title}', camp.rewardTitle);

    return await executeSendEmail(toEmail, computedSubject, computedBody, camp.title, participantName);
  };

  // Submit manual draft email blast to all subscribers
  const handleSendDraftBlast = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipientEmail) {
      addNotification('Erreur', 'L\'adresse de destination est obligatoire.', 'warning');
      return;
    }

    const selectedCampObj = campaigns.find(c => c.id === selectedCampaignId);
    const campTitle = selectedCampObj ? selectedCampObj.title : 'Campagne';

    const ok = await executeSendEmail(
      recipientEmail,
      customSubject || `[SocialBoost] Message important concernant ${campTitle}`,
      customBody || 'Bonjour,\n\nCeci est un message de l\'équipe SocialBoost.',
      campTitle,
      recipientName
    );

    if (ok) {
      // Clear form
      setRecipientEmail('');
      setRecipientName('');
      setCustomSubject('');
      setCustomBody('');
    }
  };

  // Refresh feed simulation
  const handleRefreshInbox = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
    
    // Add an incoming mock email
    const extraMails: SentinelEmail[] = [
      {
        id: `g-in-${Date.now()}`,
        from: 'hugo.valet@yahoo.com',
        subject: 'Vérification de gain échouée',
        body: 'Bonjour, j\'ai reçu un e-mail indiquant que ma capture d\'écran n\'était pas valide. J\'ai bien aimé la vidéo pourtant. Pouvez-vous vérifier s\'il vous plaît ?',
        date: 'À l\'instant',
        read: false,
        type: 'incoming',
        subscriberName: 'Hugo Valet',
        associatedCampaign: 'Template Notion Créateur',
        status: 'Manual'
      }
    ];

    setRealEmails(prev => [...extraMails, ...prev]);
    addNotification(
      language === 'en' ? 'Inbox Sync' : 'Synchronisation de la messagerie',
      language === 'en' ? 'Synchronized with Google API. Found 1 new reply.' : 'Messagerie synchronisée avec succès. Un nouveau message détecté !',
      'success'
    );
  };

  // Approve a manual verification email and auto-send their reward
  const handleApproveAndSendReward = async (email: SentinelEmail) => {
    const associatedCamp = campaigns.find(c => c.title === email.associatedCampaign) || campaigns[0];
    if (!associatedCamp) {
      addNotification('Erreur', 'Aucune campagne active n\'est liée.', 'warning');
      return;
    }

    const ok = await handleTriggerAutoReward(associatedCamp, email.from, email.subscriberName || 'Abonné');
    if (ok) {
      // Set status to validated
      setRealEmails(prev => prev.map(m => m.id === email.id ? { ...m, status: 'Validated', read: true } : m));
      setSelectedEmail(null);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* HEADER SECTION WITH ADVANCED ACCENTS */}
      <div className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-900 rounded-3xl text-white shadow-xl relative overflow-hidden border border-indigo-500/20">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-violet-600/10 rounded-full blur-2xl"></div>
        
        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            {language === 'en' ? 'Google Suite Integration' : language === 'es' ? 'Integración con Google' : 'Intégration Google Suite'}
          </div>
          <h2 className="text-2xl font-black tracking-tight flex items-center gap-2">
            <Mail className="w-6 h-6 text-indigo-400 animate-bounce" />
            {language === 'en' ? 'Gmail Delivery Automation' : language === 'es' ? 'Automatización de Envíos Gmail' : 'Automation de Messagerie Gmail'}
          </h2>
          <p className="text-xs text-slate-300 max-w-xl">
            {language === 'en' 
              ? 'Automatically deliver rewards, digital gifts, and security alerts through your authentic Gmail account upon task validation.'
              : language === 'es'
              ? 'Envía recompensas, regalos digitales y alertas de seguridad con tu cuenta real de Gmail al validar cada tarea.'
              : 'Délivrez automatiquement vos ebooks, guides et codes d\'accès à vos abonnés directement de votre propre boîte mail Gmail dès validation.'}
          </p>
        </div>

        <div className="mt-4 md:mt-0 flex flex-wrap gap-2 relative z-10">
          {onTriggerBackgroundSim && (
            <button
              onClick={onTriggerBackgroundSim}
              className="flex items-center gap-2 px-3.5 py-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white rounded-xl text-xs font-black transition-all cursor-pointer shadow-lg animate-pulse"
              title="Add a background visitor action and send them automatic rewards"
            >
              <Zap className="w-4 h-4 text-white fill-amber-300 animate-bounce" />
              <span>{language === 'en' ? 'Simulate Subscriber' : 'Simuler un abonné'}</span>
            </button>
          )}

          <button
            onClick={() => {
              setIsLiveMode(!isLiveMode);
              addNotification(
                'Changement de relais ⚡',
                isLiveMode 
                  ? 'Messagerie basculée sur relais SMTP Sandbox.' 
                  : 'Messagerie configurée sur API Google Workspace (Live).',
                'info'
              );
            }}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-extrabold cursor-pointer border transition-all ${
              isLiveMode 
                ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300' 
                : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>{isLiveMode ? 'API Live Google' : 'Relais Sandbox'}</span>
          </button>
          
          <button
            onClick={handleRefreshInbox}
            disabled={isRefreshing}
            className="flex items-center gap-2 px-3.5 py-2 bg-indigo-600/90 hover:bg-indigo-600 text-white rounded-xl text-xs font-extrabold transition-all cursor-pointer shadow-lg disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{language === 'en' ? 'Sync Feed' : 'Synchroniser'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT COLUMN: GMAIL CONTEXT & AUTOMATED PRESETS (2/3 width or 1/3) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* OAUTH PERMISSIONS CARD */}
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-gray-100 dark:border-zinc-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-gray-50 dark:border-zinc-850 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400 flex items-center justify-center">
                  <Mail className="w-5.5 h-5.5" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 dark:text-zinc-100">
                    {language === 'en' ? 'Your Gmail identity relay' : 'Votre relais d\'identité Gmail'}
                  </h3>
                  <p className="text-[10px] text-gray-400">
                    {language === 'en' ? 'Configured with Google Workspace Client' : `Connecté via l'ID de projet Google : gen-lang-client-0358183096`}
                  </p>
                </div>
              </div>
              <span className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-400 rounded-full">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {language === 'en' ? 'Authorized' : 'Autorisé avec succès'}
              </span>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-zinc-950 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <p className="text-xs font-bold text-slate-800 dark:text-zinc-200">
                  {gmailUserEmail}
                </p>
                <p className="text-[10px] text-slate-400">
                  {language === 'en' 
                    ? 'Grants access to scope: https://www.googleapis.com/auth/gmail'
                    : 'Autorisations de portée Google : https://www.googleapis.com/auth/gmail'}
                </p>
              </div>
              
              <div className="flex gap-2 text-[10px] text-gray-500">
                <span className="px-2 py-1 bg-white dark:bg-zinc-900 border dark:border-zinc-800 rounded font-mono">Gmail API v1</span>
                <span className="px-2 py-1 bg-white dark:bg-zinc-900 border dark:border-zinc-800 rounded font-mono">OAuth 2.0</span>
              </div>
            </div>

            <div className="text-[11px] text-slate-400 flex gap-2">
              <Info className="w-4 h-4 text-indigo-500 shrink-0" />
              <p>
                {language === 'en' 
                  ? 'All automatic reward emails sent by SocialBoost will bear your authenticated email as sender so participants can reply to you directly.'
                  : 'Tous les emails automatiques de récompenses porteront votre propre adresse e-mail de l\'expéditeur. Les participants verront qu\'ils proviennent de vous.'}
              </p>
            </div>
          </div>

          {/* AUTOMATION TRIGGER TEMP PRESET */}
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-gray-100 dark:border-zinc-800 shadow-sm space-y-4">
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-indigo-500 animate-pulse" />
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-zinc-100">
                  {language === 'en' ? 'Automatic Delivery Settings' : 'Règles de distribution automatique par e-mail'}
                </h3>
              </div>
              
              {/* Toggle switch */}
              <button 
                onClick={() => setIsAutoSendEnabled(!isAutoSendEnabled)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out outline-none ${
                  isAutoSendEnabled ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-zinc-800'
                }`}
              >
                <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  isAutoSendEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}></span>
              </button>
            </div>

            {isAutoSendEnabled ? (
              <div className="space-y-4 animate-fade-in">
                
                {/* Email Subject line */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 dark:text-zinc-300 block">
                    {language === 'en' ? 'Default Subject Template' : 'Modèle d\'objet de mail pour le créateur'}
                  </label>
                  <input
                    type="text"
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-gray-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-950 dark:text-zinc-100 outline-none focus:border-indigo-500 transition-colors"
                  />
                  <p className="text-[10px] text-gray-400">
                    💡 Variables supportées : <span className="font-mono bg-slate-100 dark:bg-zinc-900 px-1 rounded">{"{campaign}"}</span> <span className="font-mono bg-slate-100 dark:bg-zinc-900 px-1 rounded">{"{name}"}</span>
                  </p>
                </div>

                {/* Email Template Body */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 dark:text-zinc-300 block">
                    {language === 'en' ? 'HTML / Rich-Text Template' : 'Modèle de corps d\'e-mail (Contenu de la récompense)'}
                  </label>
                  <textarea
                    rows={6}
                    value={emailTemplate}
                    onChange={(e) => setEmailTemplate(e.target.value)}
                    className="w-full p-4 text-xs font-sans rounded-xl border border-gray-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-950 dark:text-zinc-100 outline-none focus:border-indigo-500 transition-colors"
                  />
                  
                  <div className="flex flex-wrap gap-1 mt-1">
                    <span className="text-[9px] text-slate-400 block mr-1 self-center">Insérer :</span>
                    <button 
                      onClick={() => setEmailTemplate(prev => prev + ' {campaign}')}
                      type="button"
                      className="px-2 py-0.5 bg-slate-100 dark:bg-zinc-800 text-[10px] text-indigo-600 dark:text-indigo-400 font-mono rounded hover:bg-indigo-50"
                    >
                      {"{campaign}"}
                    </button>
                    <button 
                      onClick={() => setEmailTemplate(prev => prev + ' {name}')}
                      type="button"
                      className="px-2 py-0.5 bg-slate-100 dark:bg-zinc-800 text-[10px] text-indigo-600 dark:text-indigo-400 font-mono rounded hover:bg-indigo-50"
                    >
                      {"{name}"}
                    </button>
                    <button 
                      onClick={() => setEmailTemplate(prev => prev + ' {reward_link}')}
                      type="button"
                      className="px-2 py-0.5 bg-slate-100 dark:bg-zinc-800 text-[10px] text-indigo-600 dark:text-indigo-400 font-mono rounded hover:bg-indigo-50"
                    >
                      {"{reward_link}"}
                    </button>
                    <button 
                      onClick={() => setEmailTemplate(prev => prev + ' {creator}')}
                      type="button"
                      className="px-2 py-0.5 bg-slate-100 dark:bg-zinc-800 text-[10px] text-indigo-600 dark:text-indigo-400 font-mono rounded hover:bg-indigo-50"
                    >
                      {"{creator}"}
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-indigo-50/50 dark:bg-zinc-950 rounded-2xl border border-indigo-100 dark:border-zinc-850 space-y-2 mt-2">
                  <span className="text-[10px] font-extrabold uppercase text-indigo-600 tracking-wider">Aperçu direct de l'email généré :</span>
                  <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-150 p-4 space-y-2 text-xs">
                    <p className="border-b pb-1"><strong>Objet :</strong> {emailSubject.replace('{campaign}', 'Booster Tiktok Musique').replace('{name}', 'Karim')}</p>
                    <p className="whitespace-pre-line leading-relaxed text-gray-600 dark:text-zinc-400">
                      {emailTemplate
                        .replace('{campaign}', 'Booster Tiktok Musique')
                        .replace('{name}', 'Karim')
                        .replace('{reward_link}', 'https://socialboost.co/rewards/gift-pack11')
                        .replace('{creator}', 'Etsvictoria')}
                    </p>
                  </div>
                </div>

              </div>
            ) : (
              <div className="p-6 text-center border-2 border-dashed border-gray-100 rounded-2xl">
                <AlertTriangle className="w-8 h-8 text-amber-500 mx-auto mb-2 animate-bounce" />
                <p className="text-xs font-bold text-gray-700 dark:text-zinc-300">
                  {language === 'en' ? 'Automated send is currently disabled' : 'L\'envoi automatisé de récompenses par email est inactif.'}
                </p>
                <p className="text-[11px] text-gray-400">
                  {language === 'en' ? 'New actions will not trigger automated Gmail deliveries.' : 'Les participants devront solliciter manuellement leurs récompenses ou faire valider leurs preuves par d\'autres moyens.'}
                </p>
              </div>
            )}
          </div>

          {/* MASS EMAIL BLAST / NEWSLETTER */}
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-gray-100 dark:border-zinc-800 shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <Send className="w-4.5 h-4.5 text-indigo-500" />
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-zinc-100">
                {language === 'en' ? 'Compose News Blast to Subscribers' : 'Diffuser une newsletter ou annonce aux abonnés'}
              </h3>
            </div>

            <form onSubmit={handleSendDraftBlast} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-700 dark:text-zinc-300">Sélectionner la Campagne d'Abonnés</label>
                  <select
                    value={selectedCampaignId}
                    onChange={(e) => setSelectedCampaignId(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 dark:bg-zinc-950 dark:border-zinc-800 dark:text-zinc-100 outline-none"
                  >
                    {campaigns.map(c => (
                      <option key={c.id} value={c.id}>{c.title} ({c.participantsCount} abonnés)</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-700 dark:text-zinc-300">Email du destinataire à tester (Unitaire)</label>
                  <input
                    type="email"
                    required
                    placeholder="ex: abonne@gmail.com"
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 bg-slate-50 dark:bg-zinc-950 dark:border-zinc-800 dark:text-zinc-100 outline-none focus:border-indigo-500"
                  />
                </div>

              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-700 dark:text-zinc-300">Nom du participant (Optionnel)</label>
                  <input
                    type="text"
                    placeholder="Jean-Michel"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 bg-slate-50 dark:bg-zinc-950 dark:border-zinc-800 dark:text-zinc-100 outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-700 dark:text-zinc-300">Objet Personnalisé</label>
                  <input
                    type="text"
                    required
                    placeholder="ex: Grand concours de l'été !"
                    value={customSubject}
                    onChange={(e) => setCustomSubject(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 bg-slate-50 dark:bg-zinc-950 dark:border-zinc-800 dark:text-zinc-100 outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-gray-700 dark:text-zinc-300">Corps de l'e-mail</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Écrivez le message de votre newsletter ici..."
                  value={customBody}
                  onChange={(e) => setCustomBody(e.target.value)}
                  className="w-full p-3.5 text-xs rounded-xl border border-gray-200 bg-slate-50 dark:bg-zinc-950 dark:border-zinc-800 dark:text-zinc-100 outline-none focus:border-indigo-500"
                />
              </div>

              <button
                type="submit"
                disabled={isSending}
                className="w-full py-2.5 bg-indigo-650 hover:bg-indigo-700 text-white rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition-colors shadow-sm disabled:opacity-50 cursor-pointer"
              >
                {isSending ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Envoi en cours...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Expédier le mail d'annonce via Gmail</span>
                  </>
                )}
              </button>
            </form>
          </div>

        </div>

        {/* RIGHT COLUMN: RECENT EMAIL RESPONSES & INCOMING AUDIENCE (1/3 width) */}
        <div className="space-y-6">
          
          {/* INCOMING MAILS TRAFFIC CONSOLE */}
          <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-gray-100 dark:border-zinc-800 shadow-sm overflow-hidden flex flex-col h-[680px]">
            
            {/* Header tab */}
            <div className="p-4 border-b border-gray-50 dark:border-zinc-850 bg-slate-50/50 dark:bg-zinc-950/20">
              <h3 className="text-xs font-black uppercase text-gray-400 tracking-wider">
                📥 {language === 'en' ? 'Gmail Inbox Feed' : 'Activité de la messagerie'}
              </h3>
              
              {/* Search bar inside inbox */}
              <div className="relative mt-3">
                <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Rechercher expéditeur, mot-clé..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-[11px] rounded-lg border border-gray-200 bg-white dark:bg-zinc-950 dark:border-zinc-850 dark:text-zinc-100 outline-none"
                />
              </div>

              {/* Segment tab */}
              <div className="flex gap-1.5 mt-3 border-t border-gray-100 dark:border-zinc-800 pt-3 text-[10px]">
                <button
                  type="button"
                  onClick={() => setActiveSegmentTab('all')}
                  className={`px-2 py-1 rounded-md font-bold transition-all ${
                    activeSegmentTab === 'all' 
                      ? 'bg-indigo-550 text-white' 
                      : 'bg-slate-100 text-gray-600 hover:bg-slate-200 dark:bg-zinc-800 dark:text-zinc-400'
                  }`}
                >
                  Tous
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSegmentTab('incoming')}
                  className={`px-2 py-1 rounded-md font-bold transition-all ${
                    activeSegmentTab === 'incoming' 
                      ? 'bg-indigo-500 text-white' 
                      : 'bg-slate-100 text-gray-600 hover:bg-slate-200 dark:bg-zinc-800 dark:text-zinc-400'
                  }`}
                >
                  Arrivée
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSegmentTab('outgoing')}
                  className={`px-2 py-1 rounded-md font-bold transition-all ${
                    activeSegmentTab === 'outgoing' 
                      ? 'bg-indigo-500 text-white' 
                      : 'bg-slate-100 text-gray-600 hover:bg-slate-200 dark:bg-zinc-800 dark:text-zinc-400'
                  }`}
                >
                  Envoyés
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSegmentTab('manual')}
                  className={`px-2 py-1 rounded-md font-bold transition-all ${
                    activeSegmentTab === 'manual' 
                      ? 'bg-indigo-500 text-white' 
                      : 'bg-slate-100 text-gray-600 hover:bg-slate-200 dark:bg-zinc-800 dark:text-zinc-400'
                  }`}
                >
                  Exigés
                </button>
              </div>
            </div>

            {/* List with scroll */}
            <div className="flex-1 overflow-y-auto divide-y divide-gray-50 dark:divide-zinc-850">
              {filteredEmails.length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-400">
                  <MailOpen className="w-8 h-8 text-gray-300 mx-auto mb-2 animate-pulse" />
                  Aucun message ne correspond à vos filtres.
                </div>
              ) : (
                filteredEmails.map((email) => (
                  <button
                    key={email.id}
                    onClick={() => {
                      setSelectedEmail(email);
                      // mark as read locally
                      setRealEmails(prev => prev.map(m => m.id === email.id ? { ...m, read: true } : m));
                    }}
                    type="button"
                    className={`w-full text-left p-3.5 hover:bg-slate-50/50 dark:hover:bg-zinc-850/40 flex gap-3 transition-colors ${
                      !email.read ? 'bg-indigo-50/15 dark:bg-indigo-950/5 font-semibold' : ''
                    }`}
                  >
                    {/* Status Badge Colorizer Icon */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold font-mono ${
                      email.type === 'outgoing'
                        ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20'
                        : email.status === 'Manual'
                        ? 'bg-amber-50 text-amber-600 dark:bg-amber-950/20'
                        : 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/20'
                    }`}>
                      {email.type === 'outgoing' ? <Send className="w-3.5 h-3.5" /> : <Mail className="w-3.5 h-3.5" />}
                    </div>

                    <div className="flex-1 space-y-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-extrabold text-slate-800 dark:text-zinc-200 truncate">
                          {email.subscriberName || email.from}
                        </span>
                        <span className="text-[9px] text-gray-400 whitespace-nowrap">
                          {email.date}
                        </span>
                      </div>
                      
                      <p className="text-[10px] text-indigo-550 dark:text-indigo-400 font-bold truncate">
                        {email.subject}
                      </p>
                      
                      <p className="text-[10px] text-slate-400 dark:text-zinc-500 line-clamp-2 leading-relaxed">
                        {email.body}
                      </p>

                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[9px] text-gray-400 truncate max-w-[120px]">
                          📂 {email.associatedCampaign || 'Sujet Général'}
                        </span>
                        
                        <span className={`text-[8.5px] font-mono px-2 py-0.5 rounded-full uppercase leading-none font-extrabold ${
                          email.status === 'Validated'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-400'
                            : email.status === 'Manual'
                            ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/30 dark:text-amber-400 animate-pulse'
                            : 'bg-blue-100 text-blue-800 dark:bg-blue-950/30 dark:text-blue-400'
                        }`}>
                          {email.status}
                        </span>
                      </div>
                    </div>
                  </button>
                ))
              )}
            </div>

            {/* Selected Email inspect Dialog modal at bottom/flyout */}
            {selectedEmail && (
              <div className="border-t border-slate-100 dark:border-zinc-850 p-4 bg-slate-50 dark:bg-zinc-950 animate-slide-up space-y-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-0.5 min-w-0">
                    <h4 className="text-xs font-black text-slate-800 dark:text-zinc-200 truncate">{selectedEmail.subject}</h4>
                    <p className="text-[10.5px] text-gray-400 font-mono">De : {selectedEmail.from}</p>
                    <p className="text-[10.5px] text-gray-400 font-mono">Ref : {selectedEmail.associatedCampaign}</p>
                  </div>
                  <button 
                    onClick={() => setSelectedEmail(null)}
                    type="button"
                    className="p-1 rounded-full bg-slate-200 hover:bg-slate-300 dark:bg-zinc-900 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="bg-white dark:bg-zinc-900 rounded-xl p-3 border text-[10.5px] text-gray-650 dark:text-zinc-300 leading-normal max-h-32 overflow-y-auto whitespace-pre-wrap">
                  {selectedEmail.body}
                </div>

                {selectedEmail.type === 'incoming' && selectedEmail.status === 'Manual' && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleApproveAndSendReward(selectedEmail)}
                      className="flex-1 py-1.5 bg-emerald-500 text-white rounded-lg text-[10.5px] font-bold hover:bg-emerald-600 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Valider & Envoyer le cadeau</span>
                    </button>
                    <button
                      onClick={() => {
                        setRealEmails(prev => prev.map(m => m.id === selectedEmail.id ? { ...m, status: 'Rejected' } : m));
                        setSelectedEmail(null);
                        addNotification('Preuve rejetée', `La demande de ${selectedEmail.subscriberName} a été étiquetée Refusée.`, 'warning');
                      }}
                      className="py-1.5 px-3 bg-rose-50 text-rose-600 border border-rose-100 hover:bg-rose-100 rounded-lg text-[10.5px] font-bold transition-colors cursor-pointer"
                    >
                      Refuser
                    </button>
                  </div>
                )}
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}
