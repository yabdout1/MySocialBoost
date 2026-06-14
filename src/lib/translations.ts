export type Language = 'fr' | 'en' | 'es';

export interface TranslationDict {
  // Navigation
  navHome: string;
  navMarketplace: string;
  navPricing: string;
  navBlog: string;
  navHelp: string;
  navDashboard: string;
  navMyCampaigns: string;
  navGiftsLibrary: string;
  navExploreCampaigns: string;
  navAffiliation: string;
  navAdminPanel: string;
  login: string;
  logout: string;
  simulate: string;
  visitor: string;
  creator: string;
  admin: string;
  ptsBadge: string;
  
  // Hero Section
  heroSlogan: string;
  heroTitleMain: string;
  heroTitleGradient: string;
  heroSub: string;
  tactic1Title: string;
  tactic1Desc: string;
  tactic2Title: string;
  tactic2Desc: string;
  tactic3Title: string;
  tactic3Desc: string;
  heroCtaStart: string;
  heroCtaBrowse: string;
  freeTrialOffer: string;
  certifiedGrowth: string;
  brandTicker: string;

  // Stats
  statCampaigns: string;
  statLive: string;
  statEngagement: string;
  statRewards: string;
  statAiAccuracy: string;

  // Demo Section
  demoPill: string;
  demoTitle: string;
  demoSub: string;
  demoPrevStep: string;
  demoNextStep: string;
  step1Title: string;
  step1Desc: string;
  step1Detail: string;
  step2Title: string;
  step2Desc: string;
  step2Detail: string;
  step3Title: string;
  step3Desc: string;
  step3Detail: string;
  step4Title: string;
  step4Desc: string;
  step4Detail: string;

  // Sandbox widget demo
  giftCreationTitle: string;
  giftFormat: string;
  giftDesc: string;
  readyToAttach: string;
  engagementRules: string;
  socialBooster: string;
  rulesAction: string;
  rulesBonus: string;
  rulesDesc: string;
  captureTitle: string;
  captureReady: string;
  captureDesc: string;
  automatedUnlock: string;
  proofCertified: string;
  proofDetail: string;
  downloadGift: string;

  // Vision AI / Campaign Execution
  stepVisitTitle: string;
  stepVisitDesc: string;
  stepVisitButton: string;
  stepUploadTitle: string;
  stepUploadDesc: string;
  stepVerifyTitle: string;
  stepVerifyDesc: string;
  verifyWithVision: string;
  rapidSimulation: string;
  opticalReport: string;
  simulationMode: string;
  directApi: string;
  evidenceApproved: string;
  evidenceRejected: string;
  confidenceScore: string;
  failedValidation: string;
  envTip: string;
  footerTagline: string;
  footerSub: string;
  platform: string;
  navMarketplaceShort: string;
  navPricingShort: string;
  navBlogShort: string;
  resourcesSupport: string;
  faqShort: string;
  helpCenter: string;
  contactSupport: string;
  legalName: string;
  cgu: string;
  privacyPolicy: string;
  rgpdCompliant: string;
  rightsReserved: string;
  madeWithLove: string;
  dashActivePlan: string;
  dashGreeting: string;
  dashSub: string;
  dashNewCampaign: string;
  dashActiveCampaigns: string;
  dashCampaignsDetail: string;
  dashUniqueVisitors: string;
  dashVisitorsDetail: string;
  dashConversions: string;
  dashConversionsDetail: string;
  dashValueGenerated: string;
  dashValueDetail: string;
  dashPerformanceTitle: string;
  dashPerformanceSub: string;
  dashPerformancePill: string;
  dashAnalyticsParticipants: string;
  dashAnalyticsVisitors: string;
  dashLoyaltyLevel: string;
  dashLevelName: string;
  dashPoints: string;
  dashTarget: string;
  dashTargetDetail: string;
  dashBooster: string;
  dashOverviewTitle: string;
  dashManageAll: string;
  dashTableCampaign: string;
  dashTableNetwork: string;
  dashTableGift: string;
  dashTableRedirects: string;
  dashTableRules: string;
  dashTableLink: string;
  dashTableEmpty: string;
  dashTableActionAbonnement: string;
  dashTableActionAbonner: string;
  dashTableActionPartager: string;
  dashTableCopied: string;
  dashLeaderboardTitle: string;
  dashLeaderboardSub: string;
  dashLeaderboardCamps: string;
  dashExploreCampsTitle: string;
  dashExploreCampsSub: string;
  dashSeeMarketplace: string;
  supportBlogTitle: string;
  supportBlogSub: string;
  supportFaqTitle: string;
  supportFaqSub: string;
  supportFaqSearch: string;
  supportContactTitle: string;
  supportContactSub: string;
  supportContactButton: string;
  supportTermsTitle: string;
  supportPrivacyTitle: string;
  supportReadMore: string;
  supportBack: string;
  supportSubmit: string;
  campListTitle: string;
  campListSub: string;
  campListSearch: string;
  campListEmpty: string;
  campListSoutiens: string;
  campListConversion: string;
  campListGift: string;
  campListAction: string;
  campListTest: string;
  campListShare: string;
  campListConfirm: string;
  campListSharePortal: string;
  campListShareDetails: string;
  campListPrint: string;
  landingTacticTitle: string;
  landingTactic1Title: string;
  landingTactic1Desc: string;
  landingTactic2Title: string;
  landingTactic2Desc: string;
  landingTactic3Title: string;
  landingTactic3Desc: string;
  landingTacticFoot1: string;
  landingTacticFoot2: string;
  landingBentoSecurity: string;
  landingBentoAudience: string;
  landingBentoAudienceSub: string;
  landingBento1Title: string;
  landingBento1Desc: string;
  landingBento2Title: string;
  landingBento2Desc: string;
  landingBento3Title: string;
  landingBento3Desc: string;
  landingTestimonialsPill: string;
  landingTestimonialsHeading: string;
  landingTestimonialsSub: string;
  landingBottomPill: string;
  landingBottomHeadingMain: string;
  landingBottomHeadingGrad: string;
  landingBottomSub: string;
  landingBottomBtn: string;
  landingBottomFooter: string;
}

export const languagesList: { code: Language; name: string; flag: string }[] = [
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Español', flag: '🇪🇸' }
];

export const translations: Record<Language, TranslationDict> = {
  fr: {
    navHome: "Accueil",
    navMarketplace: "Marketplace Sécurisée",
    navPricing: "Tarifs",
    navBlog: "Blog",
    navHelp: "Aide",
    navDashboard: "Tableau de Bord",
    navMyCampaigns: "Mes Campagnes",
    navGiftsLibrary: "Médiathèque de Cadeaux",
    navExploreCampaigns: "Explorer les Campagnes",
    navAffiliation: "Affiliation",
    navAdminPanel: "Console Modération IA",
    login: "Connexion",
    logout: "Se déconnecter",
    simulate: "Simuler",
    visitor: "Visiteur",
    creator: "Créateur SaaS",
    admin: "Admin",
    ptsBadge: "pts",

    // Hero Section
    heroSlogan: "+ Envie de booster votre trafic ? +",
    heroTitleMain: "Essayez ces ",
    heroTitleGradient: "3 tactiques rapides",
    heroSub: "Ne payez pas pour des faux robots. Libérez la force de la croissance organique en échangeant de vraies récompenses contre du bouche-à-oreille qualifié.",
    tactic1Title: "Tactique 1 : Offrez de la valeur magnétique",
    tactic1Desc: "Uploadez vos Ebooks, codes d'invitations, templates Notion, ou prompts exclusifs.",
    tactic2Title: "Tactique 2 : L’abonné s'engage sur vos réseaux",
    tactic2Desc: "Il visite le lien et s’abonne à votre compte TikTok, YouTube, Instagram, X ou Telegram.",
    tactic3Title: "Tactique 3 : Validation instantanée par IA",
    tactic3Desc: "Notre moteur de vision IA scanne sa capture d'écran de preuve pour lui livrer le fichier en 1 s.",
    heroCtaStart: "Lancer ma Campagne maintenant",
    heroCtaBrowse: "Soutenir & Gagner des cadeaux",
    freeTrialOffer: "Formule Gratuite incluse",
    certifiedGrowth: "• Croissance Certifiée",
    brandTicker: "Intégré avec les plus grands réseaux • Propulsé pour votre croissance",

    // Stats
    statCampaigns: "Campagnes Lancées",
    statLive: "Actions en Direct",
    statEngagement: "Actions d’engagement",
    statRewards: "Récompenses débloquées",
    statAiAccuracy: "Fiabilité de l’IA",

    // Demo Section
    demoPill: "SANS EFFORT MANUEL",
    demoTitle: "Comment fonctionne SocialBoost ?",
    demoSub: "Oubliez les vérifications laborieuses en DM ou e-mail. Notre algorithme AI de vision artificielle s’occupe d'auditer l’action automatiquement.",
    demoPrevStep: "Précédent",
    demoNextStep: "Suivant",
    step1Title: "1. Créez votre cadeau",
    step1Desc: "Téléchargez un ebook, intégrez un lien Notion ou donnez accès à un groupe privé. Offrez de la valeur solide.",
    step1Detail: "Vous déterminez les règles d’accès (ex: réservé aux 500 premiers).",
    step2Title: "2. Choisissez les actions",
    step2Desc: "Sélectionnez vos besoins de croissance : s’abonner sur TikTok, relayer un post X, rejoindre un canal Telegram, etc.",
    step2Detail: "Vous pouvez combiner plusieurs réseaux sociaux pour une seule récompense.",
    step3Title: "3. Partagez le lien d’accès",
    step3Desc: "SocialBoost génère une page de capture magnifique avec un QR code à partager en bio ou dans vos publications.",
    step3Detail: "Optimisé à 100% pour les smartphones de vos abonnés.",
    step4Title: "4. L’IA valide et livre le bonus",
    step4Desc: "Notre IA de vision artificielle analyse instantanément les captures des abonnés pour débloquer le téléchargement.",
    step4Detail: "Zéro travail manuel, croissance organique en pilote automatique garanti !",

    // Sandbox widget demo
    giftCreationTitle: "1. Création du Cadeau de croissance",
    giftFormat: "PDF, Notion, Canva...",
    giftDesc: "Un PDF sécurisé contenant 40 templates exclusifs d'automatisation d'écriture de blogs et marketing produit.",
    readyToAttach: "Prêt à être attaché comme incitatif de croissance.",
    engagementRules: "2. Règles d’engagement à valider",
    socialBooster: "TikTok Booster",
    rulesAction: "S’abonner à mon compte TikTok",
    rulesBonus: "+ 150 pts",
    rulesDesc: "L'abonné devra obligatoirement accomplir cette action d'abonnement avant de téléverser sa preuve.",
    captureTitle: "3. Page de Capture Intelligente",
    captureReady: "🎉 Lien court sécurisé prêt à partager :",
    captureDesc: "Ce lien élégant s'adapte à tous les écrans des abonnés et inclut un QR code optimisé pour Stories et Bio.",
    automatedUnlock: "4. Déblocage Automatisé IA",
    proofCertified: "Preuve Certifiée par Vision SocialBoost IA !",
    proofDetail: "Le bouton d’abonnement actif a bien été identifié sur l’image du profil.",
    downloadGift: "Télécharger les prompts ChatGPT (6.4 MB)",

    // Vision AI / Campaign Execution
    stepVisitTitle: "Étape 1 : Visitez le lien cible",
    stepVisitDesc: "Cliquez ci-dessous pour ouvrir le compte à soutenir.",
    stepVisitButton: "Visiter le lien cible",
    stepUploadTitle: "Étape 2 : Capture d'écran de preuve",
    stepUploadDesc: "Faites une capture prouvant votre action.",
    stepVerifyTitle: "Étape 3 : Validation Intelligente",
    stepVerifyDesc: "Notre IA analyse la capture de preuve.",
    verifyWithVision: "Vérifier avec Vision IA (OpenRouter)",
    rapidSimulation: "Simulation Rapide",
    opticalReport: "Rapport d'Analyse Optique Vision IA",
    simulationMode: "Mode Simulation",
    directApi: "Direct OpenRouter API",
    evidenceApproved: "Preuve Approuvée ✓",
    evidenceRejected: "Preuve Rejetée ✗",
    confidenceScore: "Confiance",
    failedValidation: "Échec de la validation d'image API",
    envTip: "Astuce : Mettez la clé d'environnement VITE_OPENROUTER_API_KEY.",
    footerTagline: "« Développez votre audience grâce à la valeur que vous offrez. »",
    footerSub: "La passerelle SaaS ultime entre créateurs et abonnés engagés.",
    platform: "Plateforme",
    navMarketplaceShort: "Marketplace de Récompenses",
    navPricingShort: "Plans d'Abonnement",
    navBlogShort: "Le Blog Growth",
    resourcesSupport: "Ressources & Support",
    faqShort: "Foire aux questions (FAQ)",
    helpCenter: "Centre d'aide intégrale",
    contactSupport: "Contacter le support client",
    legalName: "Mentions Légales",
    cgu: "Conditions Générales d'Utilisation",
    privacyPolicy: "Politique de Confidentialité RGPD",
    rgpdCompliant: "Conformité 100% RGPD",
    rightsReserved: "Tous droits réservés. Développé en conformité avec les conditions d'utilisation des plateformes sociales.",
    madeWithLove: "Fait avec amour pour les Créateurs",
    dashActivePlan: "ABONNÉ PRO PLAN (ACTIF)",
    dashGreeting: "Ravi de vous revoir, Créateur !",
    dashSub: "Vos campagnes de redirection ont généré +{count} abonnés qualifiés ce mois-ci.",
    dashNewCampaign: "Nouvelle Campagne",
    dashActiveCampaigns: "Campagnes Actives",
    dashCampaignsDetail: "Sur {count} disponibles dans votre bibliothèque",
    dashUniqueVisitors: "Visiteurs Uniques",
    dashVisitorsDetail: "Générés de vos bio-sociales & QR codes",
    dashConversions: "Conversions Validées IA",
    dashConversionsDetail: "Taux : {count}%",
    dashValueGenerated: "Valeur Générée",
    dashValueDetail: "Économie estimée vs publicités payantes CPC",
    dashPerformanceTitle: "Performances des 7 Derniers Jours",
    dashPerformanceSub: "Suivi en temps réel des participants de vos campagnes de redirections",
    dashPerformancePill: "Actif (7 jours)",
    dashAnalyticsParticipants: "Participants (Abonnés)",
    dashAnalyticsVisitors: "Visiteurs Uniques",
    dashLoyaltyLevel: "Votre Niveau Fidélité",
    dashLevelName: "Niveau: Partageur Fou ⚡",
    dashPoints: "{count} points",
    dashTarget: "Objectif: Génie d'Audience 🌟",
    dashTargetDetail: "Plus que {count} points pour doubler vos quotas d'exports CSV !",
    dashBooster: "Simuler une conversion (+250 points)",
    dashOverviewTitle: "Aperçu rapide de vos Campagnes Actives",
    dashManageAll: "Gérer tout ({count})",
    dashTableCampaign: "Campagne",
    dashTableNetwork: "Réseau",
    dashTableGift: "Cadeau",
    dashTableRedirects: "Redirections",
    dashTableRules: "Règles",
    dashTableLink: "Lien direct",
    dashTableEmpty: "Aucune campagne active. Cliquez sur 'Nouvelle Campagne' pour commencer.",
    dashTableActionAbonnement: "Abonnement",
    dashTableActionAbonner: "S’abonner",
    dashTableActionPartager: "Partager",
    dashTableCopied: "Copié !",
    dashLeaderboardTitle: "Classement des Créateurs",
    dashLeaderboardSub: "Palmarès communautaire de la saison 2026",
    dashLeaderboardCamps: "{count} campagne{plural}",
    dashExploreCampsTitle: "Explorer d’autres campagnes de croissance ?",
    dashExploreCampsSub: "Rejoignez-les et accumulez des points en accomplissant des actions pour débloquer de superbes ressources.",
    dashSeeMarketplace: "Voir la Marketplace",
    supportBlogTitle: "Le Blog de la Creator Economy",
    supportBlogSub: "Astuces exclusives pour augmenter votre taux d’engagement, percer avec les shorts et monétiser vos leads.",
    supportFaqTitle: "Centre d'assistance SocialBoost",
    supportFaqSub: "Une base de connaissances claire pour tirer le meilleur profit de vos campagnes d'engagement.",
    supportFaqSearch: "Rechercher une question (ex: désabonnement, API)...",
    supportContactTitle: "Contacter l'assistance technique",
    supportContactSub: "Notre équipe vous répond sous 24h. Remplissez le formulaire ci-dessous.",
    supportContactButton: "Envoyer le Message",
    supportTermsTitle: "Conditions Générales d’Utilisation",
    supportPrivacyTitle: "Politique de Confidentialité & RGPD",
    supportReadMore: "Lire l'article complet",
    supportBack: "Retour aux articles",
    supportSubmit: "Veuillez remplir vos coordonnées obligatoires.",
    campListTitle: "Mes Campagnes de Croissance ({count})",
    campListSub: "Gérez vos intégrations de redirection de valeur d'audience et suivez vos statistiques en temps réel.",
    campListSearch: "Rechercher par titre ou mot clé...",
    campListEmpty: "Aucune campagne ne correspond à votre recherche",
    campListSoutiens: "Soutiens gagnés",
    campListConversion: "Taux de conversion",
    campListGift: "Cadeau livré :",
    campListAction: "Action requise :",
    campListTest: "Tester la page",
    campListShare: "Partager",
    campListConfirm: "Êtes-vous sûr de vouloir supprimer cette campagne ?",
    campListSharePortal: "Partagez votre Passerelle",
    campListShareDetails: "Utilisez le QR code sur vos stories/publications ou collez le lien dans votre biographie sociale.",
    campListPrint: "Imprimer",
    landingTacticTitle: "Try these 3 quick tactics to explode your traffic!",
    landingTactic1Title: "Tactique 1 : Offrez de la valeur magnétique",
    landingTactic1Desc: "Uploadez vos Ebooks, codes d'invitations, templates Notion, ou prompts exclusifs.",
    landingTactic2Title: "Tactique 2 : L’abonné s'engage sur vos réseaux",
    landingTactic2Desc: "Il visite le lien et s’abonne à votre compte TikTok, YouTube, Instagram, X ou Telegram.",
    landingTactic3Title: "Tactique 3 : Validation instantanée par IA",
    landingTactic3Desc: "Notre moteur de vision IA scanne sa capture d'écran de preuve pour lui livrer le fichier en 1 s.",
    landingTacticFoot1: "Formule Gratuite incluse",
    landingTacticFoot2: "• Croissance Certifiée",
    landingBentoSecurity: "SÉCURITÉ & PERFORMANCE",
    landingBentoAudience: "Bâtissez l'audience de vos rêves",
    landingBentoAudienceSub: "Donnez vie à vos campagnes avec des fonctionnalités conçues pour l'efficacité et la protection de vos fichiers de valeur.",
    landingBento1Title: "Hébergement Fichiers Sécurisé",
    landingBento1Desc: "Uploadez vos PDF, archives, vidéos ou intégrez vos liens Notion/Canva de façon protégée. Nous ne délivrons le cadeau qu'après vérification absolue.",
    landingBento2Title: "QR Code & Liens de Bio",
    landingBento2Desc: "Toutes vos campagnes génèrent de superbes pages d'atterrissage optimisées mobile avec un code QR vectoriel instantané pour les stories et bio Instagram.",
    landingBento3Title: "Anti-Spam & Anti-Désabonnement",
    landingBento3Desc: "Algorithmes de surveillance pour détecter les fraudeurs qui suppriment l'abonnement ou téléchargent plusieurs fois via différentes adresses e-mails.",
    landingTestimonialsPill: "RÉSULTATS DE CROISSANCE PROUVÉS",
    landingTestimonialsHeading: "Ils cartonnent avec SocialBoost",
    landingTestimonialsSub: "Vos homologues créateurs et développeurs économisent des milliers d'euros en publicité en capitalisant sur leur communauté.",
    landingBottomPill: "COMMENCER GRATUITEMENT",
    landingBottomHeadingMain: "N’achetez plus de faux abonnés.",
    landingBottomHeadingGrad: "Offrez de la valeur solide !",
    landingBottomSub: "Profitez de notre formule gratuite pour faire l’expérience du pilote automatique. Rejoignez aujourd’hui plus de 14 000 créateurs de premier plan.",
    landingBottomBtn: "Lancer mon compte gratuit immédiatement",
    landingBottomFooter: "Gratuit pour toujours avec 1 campagne active • Aucun paiement requis"
  },
  en: {
    navHome: "Home",
    navMarketplace: "Secure Marketplace",
    navPricing: "Pricing",
    navBlog: "Blog",
    navHelp: "Help",
    navDashboard: "Dashboard",
    navMyCampaigns: "My Campaigns",
    navGiftsLibrary: "Gifts Mediatheque",
    navExploreCampaigns: "Explore Campaigns",
    navAffiliation: "Affiliate Link",
    navAdminPanel: "AI Moderation Console",
    login: "Log In",
    logout: "Log out",
    simulate: "Simulate",
    visitor: "Visitor",
    creator: "SaaS Creator",
    admin: "Admin",
    ptsBadge: "pts",

    // Hero Section
    heroSlogan: "+ Want more traffic? +",
    heroTitleMain: "Try these ",
    heroTitleGradient: "3 quick tactics",
    heroSub: "Stop paying for fake robot traffic. Leverage the raw momentum of organic viral growth by trading high-value digital files for genuine user advocacy.",
    tactic1Title: "Tactic 1: Offer magnetic lead magnets",
    tactic1Desc: "Upload PDFs, Notion templates, source code, cheatsheets, or hyper-specific AI prompts.",
    tactic2Title: "Tactic 2: Users support your social profiles",
    tactic2Desc: "They click the link and follow you on TikTok, YouTube, X, Instagram, or Telegram.",
    tactic3Title: "Tactic 3: Instant Vision AI verification",
    tactic3Desc: "Our advanced Vision AI model inspects the user screenshot to release the download in 1s.",
    heroCtaStart: "Launch My Campaign Now",
    heroCtaBrowse: "Support & Claim Rewards",
    freeTrialOffer: "Free Trial Included",
    certifiedGrowth: "• Certified Growth Engine",
    brandTicker: "Integrated with top-tier networks • Engineered for viral growth",

    // Stats
    statCampaigns: "Active Campaigns",
    statLive: "Live Feed",
    statEngagement: "User Engagements",
    statRewards: "Unlocked Rewards",
    statAiAccuracy: "Vision AI Accuracy",

    // Demo Section
    demoPill: "ZERO MANUAL LABOR",
    demoTitle: "How does SocialBoost work?",
    demoSub: "Forget manual checks in messy email inboxes or DM lists. Our custom Vision AI algorithm inspects proof screenshots automatically in milliseconds.",
    demoPrevStep: "Previous",
    demoNextStep: "Next",
    step1Title: "1. Upload your digital reward",
    step1Desc: "Attach any PDF, ZIP, Notion link, private community invitation, or bonus code.",
    step1Detail: "Fine-tune distribution quotas (e.g. limited to the first 500 subscribers).",
    step2Title: "2. Set the social requirements",
    step2Desc: "Pick growth goals: follow on TikTok, share on X, join a Telegram channel, etc.",
    step2Detail: "Add multiple social requirements for rare high-tier rewards.",
    step3Title: "3. Direct growth link generation",
    step3Desc: "Receive a stunning mobile-optimized landing page featuring smart QR-code generators.",
    step3Detail: "100% fine-tuned for rapid mobile conversions.",
    step4Title: "4. The AI validates and delivers",
    step4Desc: "The user submits a screenshot. Vision AI parses it and releases download instantly.",
    step4Detail: "Autonomous organic audience growth on complete autopilot!",

    // Sandbox widget demo
    giftCreationTitle: "1. Reward Incentive Setup",
    giftFormat: "PDF, Notion, Canva...",
    giftDesc: "A secure digital package containing 40 high-performing ChatGPT prompts for copywriting and marketing.",
    readyToAttach: "Active and safely encrypted inside our storage vaults.",
    engagementRules: "2. Social Media Action Rule",
    socialBooster: "TikTok Booster",
    rulesAction: "Follow my TikTok profile",
    rulesBonus: "+ 150 pts",
    rulesDesc: "The subscriber must follow this action on screen before uploading any verification screenshots.",
    captureTitle: "3. Premium Landing Page generated",
    captureReady: "🎉 Shareable short campaign URL:",
    captureDesc: "Sleek and optimized dynamic gateway, ready for Instagram bio, threads, or newsletter embeds.",
    automatedUnlock: "4. Autonomous Vision AI Check",
    proofCertified: "Screenshot Certified by SocialBoost Vision AI!",
    proofDetail: "Follow button verified in ACTIVE status on the client profile screenshot.",
    downloadGift: "Download ChatGPT Prompts PDF (6.4 MB)",

    // Vision AI / Campaign Execution
    stepVisitTitle: "Step 1: Open Target Link",
    stepVisitDesc: "Click below to open the profile page you need to support.",
    stepVisitButton: "Visit Target Page",
    stepUploadTitle: "Step 2: Take proof screenshot",
    stepUploadDesc: "Upload proof showing your active follow action.",
    stepVerifyTitle: "Step 3: Vision AI inspection",
    stepVerifyDesc: "Our custom vision model scans the proof.",
    verifyWithVision: "Verify with Vision AI (OpenRouter)",
    rapidSimulation: "Quick Simulator",
    opticalReport: "Optical Analysis Report - Vision AI",
    simulationMode: "Simulation Mode",
    directApi: "Direct OpenRouter API",
    evidenceApproved: "Proof Approved ✓",
    evidenceRejected: "Proof Rejected ✗",
    confidenceScore: "Confidence",
    failedValidation: "API Vision system failed",
    envTip: "Tip: Add VITE_OPENROUTER_API_KEY environment variable to test actual API calls.",
    footerTagline: "“Grow your audience with the value you offer.”",
    footerSub: "The ultimate SaaS bridge between creators and engaged followers.",
    platform: "Platform",
    navMarketplaceShort: "Rewards Marketplace",
    navPricingShort: "Subscription Plans",
    navBlogShort: "The Growth Blog",
    resourcesSupport: "Resources & Support",
    faqShort: "Frequently Asked Questions (FAQ)",
    helpCenter: "Comprehensive Help Center",
    contactSupport: "Contact Customer Support",
    legalName: "Legal",
    cgu: "Terms of Use",
    privacyPolicy: "GDPR Confidentiality & Privacy",
    rgpdCompliant: "100% GDPR Compliant",
    rightsReserved: "All rights reserved. Developed in compliance with social platform terms of service.",
    madeWithLove: "Made with love for Creators",
    dashActivePlan: "PRO PLAN MEMBER (ACTIVE)",
    dashGreeting: "Welcome back, Creator!",
    dashSub: "Your redirection campaigns generated +{count} qualified subscribers this month.",
    dashNewCampaign: "New Campaign",
    dashActiveCampaigns: "Active Campaigns",
    dashCampaignsDetail: "Of {count} available in your library",
    dashUniqueVisitors: "Unique Visitors",
    dashVisitorsDetail: "Generated from your social bios & QR codes",
    dashConversions: "AI Verified Conversions",
    dashConversionsDetail: "Rate: {count}%",
    dashValueGenerated: "Value Generated",
    dashValueDetail: "Estimated savings vs paid CPC advertising",
    dashPerformanceTitle: "Performance - Last 7 Days",
    dashPerformanceSub: "Real-time tracking of participants in your redirection campaigns",
    dashPerformancePill: "Active (7 days)",
    dashAnalyticsParticipants: "Participants (Subscribers)",
    dashAnalyticsVisitors: "Unique Visitors",
    dashLoyaltyLevel: "Your Loyalty Level",
    dashLevelName: "Level: Wild Sharer ⚡",
    dashPoints: "{count} points",
    dashTarget: "Objective: Audience Genius 🌟",
    dashTargetDetail: "Only {count} more points to double your CSV export quotas!",
    dashBooster: "Simulate a conversion (+250 points)",
    dashOverviewTitle: "Quick Overview of Your Active Campaigns",
    dashManageAll: "Manage all ({count})",
    dashTableCampaign: "Campaign",
    dashTableNetwork: "Network",
    dashTableGift: "Gift",
    dashTableRedirects: "Redirections",
    dashTableRules: "Rules",
    dashTableLink: "Direct link",
    dashTableEmpty: "No active campaigns. Click 'New Campaign' to start.",
    dashTableActionAbonnement: "Follow",
    dashTableActionAbonner: "Subscribe",
    dashTableActionPartager: "Share",
    dashTableCopied: "Copied!",
    dashLeaderboardTitle: "Creators Leaderboard",
    dashLeaderboardSub: "Community leaderboard for the 2026 season",
    dashLeaderboardCamps: "{count} campaign{plural}",
    dashExploreCampsTitle: "Explore other growth campaigns?",
    dashExploreCampsSub: "Join them and accumulate points by completing tasks to unlock awesome resources.",
    dashSeeMarketplace: "View Marketplace",
    supportBlogTitle: "The Creator Economy Blog",
    supportBlogSub: "Exclusive tips to increase your engagement rates, explode with Shorts, and monetize your leads.",
    supportFaqTitle: "SocialBoost Help Center",
    supportFaqSub: "A clear knowledge base to get the most out of your engagement campaigns.",
    supportFaqSearch: "Search a question (e.g., unsubscribe, API)...",
    supportContactTitle: "Contact Technical Support",
    supportContactSub: "Our team answers within 24 hours. Fill out the form below.",
    supportContactButton: "Send Message",
    supportTermsTitle: "Terms of Service",
    supportPrivacyTitle: "Privacy Policy & GDPR",
    supportReadMore: "Read full article",
    supportBack: "Back to Articles",
    supportSubmit: "Please fill in your required contact information.",
    campListTitle: "My Growth Campaigns ({count})",
    campListSub: "Manage your audience value redirection tunnels and monitor statistics in real time.",
    campListSearch: "Search by title or keyword...",
    campListEmpty: "No campaigns match your search",
    campListSoutiens: "Support gained",
    campListConversion: "Conversion rate",
    campListGift: "Delivered Gift:",
    campListAction: "Required Action:",
    campListTest: "Test Page",
    campListShare: "Share",
    campListConfirm: "Are you sure you want to delete this campaign?",
    campListSharePortal: "Share Your Gateway",
    campListShareDetails: "Use the QR code in your stories/posts or paste the link in your social bio.",
    campListPrint: "Print",
    landingTacticTitle: "Try these 3 quick tactics to explode your traffic!",
    landingTactic1Title: "Tactic 1: Offer high-value lead magnets",
    landingTactic1Desc: "Upload your Ebooks, invitation codes, Notion templates, or exclusive prompts.",
    landingTactic2Title: "Tactic 2: Subscribers engage on your accounts",
    landingTactic2Desc: "They visit the link and follow you on TikTok, YouTube, Instagram, X, or Telegram.",
    landingTactic3Title: "Tactic 3: Instant verification by AI",
    landingTactic3Desc: "Our Vision AI engine scans their proof screenshot to deliver the file in 1 second.",
    landingTacticFoot1: "Free Plan included",
    landingTacticFoot2: "• Certified Growth",
    landingBentoSecurity: "SECURITY & PERFORMANCE",
    landingBentoAudience: "Build the audience of your dreams",
    landingBentoAudienceSub: "Empower your campaigns with features built for performance and secure asset delivery.",
    landingBento1Title: "Secure File Hosting",
    landingBento1Desc: "Upload PDFs, archives, videos, or integrate Notion/Canva links in a protected environment. We only deliver once validated.",
    landingBento2Title: "QR Codes & Bio Links",
    landingBento2Desc: "All campaigns generate stunning mobile-optimized landing pages with immediate vector QR codes for Instagram bios and stories.",
    landingBento3Title: "Anti-Spam & Anti-Unfollow",
    landingBento3Desc: "Advanced fraud protection algorithms monitoring users that instantly unfollow or attempt duplicate claims with multiple emails.",
    landingTestimonialsPill: "PROVEN GROWTH RESULTS",
    landingTestimonialsHeading: "They are crushing it with SocialBoost",
    landingTestimonialsSub: "Fellow creators and developers save thousands on ads by capitalizing on organic recommendations.",
    landingBottomPill: "START FOR FREE",
    landingBottomHeadingMain: "Stop buying fake followers.",
    landingBottomHeadingGrad: "Offer solid value!",
    landingBottomSub: "Take advantage of our free plan to experience growth on autopilot. Join over 14,000 top creators today.",
    landingBottomBtn: "Launch my free account immediately",
    landingBottomFooter: "Free forever with 1 active campaign • No credit card required"
  },
  es: {
    navHome: "Inicio",
    navMarketplace: "Mercado Seguro",
    navPricing: "Precios",
    navBlog: "Blog",
    navHelp: "Ayuda",
    navDashboard: "Panel de Control",
    navMyCampaigns: "Mis Campañas",
    navGiftsLibrary: "Biblioteca de Regalos",
    navExploreCampaigns: "Explorar Campañas",
    navAffiliation: "Afiliación",
    navAdminPanel: "Consola de IA de Moderación",
    login: "Iniciar Sesión",
    logout: "Cerrar sesión",
    simulate: "Simular",
    visitor: "Visitante",
    creator: "Creador SaaS",
    admin: "Admin",
    ptsBadge: "pts",

    // Hero Section
    heroSlogan: "¡¿Quieres más visitas orgánicas?!",
    heroTitleMain: "Prueba estas ",
    heroTitleGradient: "3 tácticas rápidas",
    heroSub: "No pagues por bots de mala calidad. Libera el poder del crecimiento viral orgánico intercambiando valiosos archivos digitales por seguidores reales garantizados.",
    tactic1Title: "Táctica 1: Ofrece lead magnets magnéticos",
    tactic1Desc: "Sube PDFs, plantillas de Notion, códigos fuente, o prompts específicos de IA.",
    tactic2Title: "Táctica 2: Tu audiencia te apoya en redes",
    tactic2Desc: "Visitan tu enlace y se suscriben a tu cuenta de TikTok, YouTube, X, Instagram o Telegram.",
    tactic3Title: "Táctica 3: Validación por IA de Visión instantánea",
    tactic3Desc: "Nuestra red de IA analiza la captura de pantalla de prueba y entrega el regalo en 1 segundo.",
    heroCtaStart: "Lanzar mi Campaña Ahora",
    heroCtaBrowse: "Apoyar y Ganar Regalos",
    freeTrialOffer: "Plan Gratuito Incluido",
    certifiedGrowth: "• Crecimiento Orgánico Certificado",
    brandTicker: "Integrado con las principales redes • Diseñado para el crecimiento viral",

    // Stats
    statCampaigns: "Campañas Creadas",
    statLive: "Acciones en Vivo",
    statEngagement: "Acciones de Usuarios",
    statRewards: "Regalos Reclamados",
    statAiAccuracy: "Efectividad de la IA",

    // Demo Section
    demoPill: "SIN TRABAJO MANUAL",
    demoTitle: "¿Cómo funciona SocialBoost?",
    demoSub: "Olvídate de verificar manualmente en correos o bandejas de mensajes directos. Nuestro motor de IA evalúa las pruebas al instante.",
    demoPrevStep: "Anterior",
    demoNextStep: "Siguiente",
    step1Title: "1. Sube tu regalo digital",
    step1Desc: "Sube archivos PDF, plantillas de Notion, invitaciones a grupos o códigos de bonificación.",
    step1Detail: "Puedes limitar las descargas a un número exacto (ej: los primeros 500 seguidores).",
    step2Title: "2. Selecciona las acciones",
    step2Desc: "Define tus metas: seguir en TikTok, dar like en Instagram, unirse a un canal de Telegram, etc.",
    step2Detail: "Combina múltiples redes para reclamar recompensas ultra-exclusivas.",
    step3Title: "3. Obtén tu enlace inteligente",
    step3Desc: "SocialBoost crea una landing page optimizada con códigos QR listos para compartir en tu biografía.",
    step3Detail: "100% diseñado para una conversión móvil rápida.",
    step4Title: "4. La IA audita y entrega",
    step4Desc: "El seguidor sube su captura. Nuestra IA espacial la examina y desbloquea la descarga.",
    step4Detail: "¡Crecimiento orgánico en piloto automático 24/7!",

    // Sandbox widget demo
    giftCreationTitle: "1. Configuración de Recompensa",
    giftFormat: "PDF, Notion, Canva...",
    giftDesc: "Un eBook premium cargado con 40 prompts optimizados para ChatGPT para copywriters y creativos.",
    readyToAttach: "Contenido cifrado de forma segura en nuestros depósitos.",
    engagementRules: "2. Regla de Red Social",
    socialBooster: "TikTok Booster",
    rulesAction: "Seguir mi perfil de TikTok",
    rulesBonus: "+ 150 pts",
    rulesDesc: "El seguidor debe pulsar seguir en su pantalla antes de subir la foto de validación.",
    captureTitle: "3. Landing Page generada",
    captureReady: "🎉 Enlace de campaña listo para compartir:",
    captureDesc: "Un enlace limpio e intuitivo listo para stories de Instagram, Threads o tu biografía.",
    automatedUnlock: "4. Análisis Inteligente por IA",
    proofCertified: "¡Captura Certificada por la IA de Visión!",
    proofDetail: "Botón de seguimiento detectado en estado ACTIVO en la imagen enviada.",
    downloadGift: "Descargar prompts de ChatGPT (6.4 MB)",

    // Vision AI / Campaign Execution
    stepVisitTitle: "Paso 1: Abrir Enlace",
    stepVisitDesc: "Haz clic abajo para abrir la página del perfil que deseas apoyar.",
    stepVisitButton: "Visitar Enlace de Perfil",
    stepUploadTitle: "Paso 2: Foto de prueba",
    stepUploadDesc: "Sube una captura de pantalla demostrando tu suscripción.",
    stepVerifyTitle: "Paso 3: Verificación de IA",
    stepVerifyDesc: "Nuestra IA analiza tu imagen de prueba.",
    verifyWithVision: "Verificar con Vision IA (OpenRouter)",
    rapidSimulation: "Simulador Rápido",
    opticalReport: "Reporte de Análisis Optico por IA de Visión",
    simulationMode: "Modo Simulación",
    directApi: "Direct OpenRouter API",
    evidenceApproved: "Prueba Aprobada ✓",
    evidenceRejected: "Prueba Rechazada ✗",
    confidenceScore: "Confianza",
    failedValidation: "Falló la verificación de IA",
    envTip: "Ayuda: Agregue VITE_OPENROUTER_API_KEY en sus variables de entorno para probar el flujo real.",
    footerTagline: "“Haz crecer tu audiencia a través del valor que ofreces.”",
    footerSub: "El enlace SaaS definitivo entre creadores y suscriptores comprometidos.",
    platform: "Plataforma",
    navMarketplaceShort: "Mercado de Regalos",
    navPricingShort: "Planes de Suscripción",
    navBlogShort: "El Blog de Growth",
    resourcesSupport: "Recursos y Soporte",
    faqShort: "Preguntas frecuentes (FAQ)",
    helpCenter: "Centro de Ayuda Integral",
    contactSupport: "Contactar a Soporte",
    legalName: "Información Legal",
    cgu: "Condiciones de Uso",
    privacyPolicy: "Política de Privacidad RGPD",
    rgpdCompliant: "Cumple 100% con RGPD",
    rightsReserved: "Todos los derechos reservados. Desarrollado de conformidad con las condiciones de uso de las redes sociales.",
    madeWithLove: "Hecho con amor para los Creadores",
    dashActivePlan: "MIEMBRO DE PLAN PRO (ACTIVO)",
    dashGreeting: "¡Qué bueno verte de nuevo, Creador!",
    dashSub: "Tus campañas de redirección han generado +{count} suscriptores calificados este mes.",
    dashNewCampaign: "Nueva Campaña",
    dashActiveCampaigns: "Campañas Activas",
    dashCampaignsDetail: "De {count} disponibles en tu biblioteca",
    dashUniqueVisitors: "Visitantes Únicos",
    dashVisitorsDetail: "Generados a partir de tus biografías de redes sociales y códigos QR",
    dashConversions: "Conversiones validadas por IA",
    dashConversionsDetail: "Tasa: {count}%",
    dashValueGenerated: "Valor Generado",
    dashValueDetail: "Ahorro estimado versus publicidad pagada CPC",
    dashPerformanceTitle: "Rendimiento - Últimos 7 Días",
    dashPerformanceSub: "Seguimiento en tiempo real de participantes en tus campañas de redirección",
    dashPerformancePill: "Activo (7 días)",
    dashAnalyticsParticipants: "Participantes (Suscriptores)",
    dashAnalyticsVisitors: "Visitantes Únicos",
    dashLoyaltyLevel: "Tu Nivel de Lealtad",
    dashLevelName: "Nivel: Compartidor Loco ⚡",
    dashPoints: "{count} puntos",
    dashTarget: "Objetivo: Genio de Audiencia 🌟",
    dashTargetDetail: "¡Faltan solo {count} puntos para duplicar tus cuotas de exportación de CSV!",
    dashBooster: "Simular una conversión (+250 puntos)",
    dashOverviewTitle: "Resumen Rápido de tus Campañas Activas",
    dashManageAll: "Gestionar todo ({count})",
    dashTableCampaign: "Campaña",
    dashTableNetwork: "Red",
    dashTableGift: "Regalo",
    dashTableRedirects: "Redirecciones",
    dashTableRules: "Reglas",
    dashTableLink: "Enlace directo",
    dashTableEmpty: "No hay campañas activas. Haz clic en 'Nueva Campaña' para comenzar.",
    dashTableActionAbonnement: "Seguir",
    dashTableActionAbonner: "Suscribirse",
    dashTableActionPartager: "Compartir",
    dashTableCopied: "¡Copiado!",
    dashLeaderboardTitle: "Clasificación de Creadores",
    dashLeaderboardSub: "Posiciones comunitarias para la temporada 2026",
    dashLeaderboardCamps: "{count} campaña{plural}",
    dashExploreCampsTitle: "¿Explorar otras campañas de crecimiento?",
    dashExploreCampsSub: "Únete a ellos y acumula puntos completando acciones para desbloquear grandes recursos.",
    dashSeeMarketplace: "Ver el Mercado",
    supportBlogTitle: "El Blog de la Economía de Creadores",
    supportBlogSub: "Consejos exclusivos para aumentar tus tasas de participación, destacar en Shorts y monetizar tus leads.",
    supportFaqTitle: "Centro de Ayuda de SocialBoost",
    supportFaqSub: "Una base de conocimiento clara para aprovechar al máximo tus campañas de participación.",
    supportFaqSearch: "Buscar una pregunta (ej: cancelar suscripción, API)...",
    supportContactTitle: "Contactar al Soporte Técnico",
    supportContactSub: "Nuestro equipo responde en menos de 24 horas. Completa el siguiente formulario.",
    supportContactButton: "Enviar Mensaje",
    supportTermsTitle: "Condiciones de Servicio",
    supportPrivacyTitle: "Política de Privacidad y RGPD",
    supportReadMore: "Leer artículo completo",
    supportBack: "Volver a los Artículos",
    supportSubmit: "Por favor, complete sus datos de contacto obligatorios.",
    campListTitle: "Mis Campañas de Crecimiento ({count})",
    campListSub: "Administra tus embudos de redirección de valor y monitorea las estadísticas en tiempo real.",
    campListSearch: "Buscar por título o palabra clave...",
    campListEmpty: "No hay campañas que coincidan con tu búsqueda",
    campListSoutiens: "Apoyos ganados",
    campListConversion: "Tasa de conversión",
    campListGift: "Regalo entregado:",
    campListAction: "Acción requerida:",
    campListTest: "Probar Página",
    campListShare: "Compartir",
    campListConfirm: "¿Estás seguro de que deseas eliminar esta campaña?",
    campListSharePortal: "Comparte tu Pasarela",
    campListShareDetails: "Usa el código QR en tus stories/publicaciones o pega el enlace en tu biografía.",
    campListPrint: "Imprimir",
    landingTacticTitle: "Try these 3 quick tactics to explode your traffic!",
    landingTactic1Title: "Táctica 1: Ofrece lead magnets magnéticos",
    landingTactic1Desc: "Sube tus Ebooks, códigos de invitación, plantillas de Notion, o prompts exclusivos.",
    landingTactic2Title: "Táctica 2: El suscriptor interactúa con tus redes",
    landingTactic2Desc: "Visitan tu enlace y te siguen en TikTok, YouTube, Instagram, X o Telegram.",
    landingTactic3Title: "Táctica 3: Validación por IA instantánea",
    landingTactic3Desc: "Nuestra IA analiza su captura de pantalla de prueba para entregar el archivo en 1 segundo.",
    landingTacticFoot1: "Plan Gratuito incluido",
    landingTacticFoot2: "• Crecimiento Certificado",
    landingBentoSecurity: "SEGURIDAD Y RENDIMIENTO",
    landingBentoAudience: "Construye la audiencia de tus sueños",
    landingBentoAudienceSub: "Mejora tus campañas con funciones diseñadas para la eficiencia y entrega segura de tus archivos.",
    landingBento1Title: "Alojamiento Seguro de Archivos",
    landingBento1Desc: "Sube tus PDFs, archivos, videos o integra enlaces de Notion/Canva de forma protegida. Solo se entregan tras validación.",
    landingBento2Title: "Códigos QR y Enlaces en Bio",
    landingBento2Desc: "Todas tus campañas generan hermosas páginas de aterrizaje optimizadas para móviles con un código QR vectorial listo para stories e Instagram.",
    landingBento3Title: "Anti-Spam y Anti-Desuscripción",
    landingBento3Desc: "Algoritmos avanzados para detectar a los usuarios que dejan de seguir de inmediato o intentan reclamar con múltiples correos.",
    landingTestimonialsPill: "RESULTADOS DE CRECIMIENTO PROBADOS",
    landingTestimonialsHeading: "La están rompiendo con SocialBoost",
    landingTestimonialsSub: "Tus compañeros de creación ahorran miles de dólares en publicidad al centrarse en recomendaciones orgánicas.",
    landingBottomPill: "COMENZAR GRATIS",
    landingBottomHeadingMain: "No compres seguidores falsos.",
    landingBottomHeadingGrad: "¡Ofrece valor sólido!",
    landingBottomSub: "Aprovecha nuestro plan gratuito para experimentar el crecimiento en piloto automático. Únete hoy a más de 14.005 creadores líderes.",
    landingBottomBtn: "Iniciar mi cuenta gratuita de inmediato",
    landingBottomFooter: "Gratis para siempre con 1 campaña activa • No requiere tarjeta de crédito"
  }
};
