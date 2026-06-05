import { Campaign, RewardFile, Testimonial, FaqItem, LeaderboardUser, BlogItem } from './types';

export const INITIAL_CAMPAIGNS: Campaign[] = [
  {
    id: 'campaign-1',
    title: 'Kit Canva Premium: 50 Templates Pour Creator Economy',
    description: 'Accédez instantanément à mon pack privé de 50 designs Canva hautement optimisés pour faire exploser votre taux de clic sur Instagram et TikTok.',
    creatorName: 'Thomas Letellier',
    creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    rewardType: 'template',
    rewardTitle: 'Pack de 50 Templates Canva Viraux',
    rewardDescription: 'Fichier d’accès Canva partagé directement. Modifiable en 1 clic.',
    rewardFileUrl: 'https://canva.com/design/templates-vip-creator-economy-preview-socialboost',
    platform: 'instagram',
    actionType: 'follow',
    targetUrl: 'https://instagram.com/thomas_crea',
    targetHandle: '@thomas_crea',
    participantsCount: 429,
    maxParticipants: 1000,
    expirationDate: '2026-12-31',
    status: 'active',
    createdAt: '2026-05-15',
    pointsReward: 150
  },
  {
    id: 'campaign-2',
    title: 'Ebook: Secrets des Shorts TikTok (De 0 à 100k en 90 jours)',
    description: 'Le guide complet analysant l’algorithme TikTok 2026, la rétention, les hooks, et la structure exacte de 12 vidéos devenues multimillionnaires en vues.',
    creatorName: 'Sarah Benamou',
    creatorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    coverImage: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80',
    rewardType: 'pdf',
    rewardTitle: 'Livre Blanc: TikTok Secrets PDF',
    rewardDescription: 'Format PDF haute qualité - 62 pages de stratégies illustrées.',
    rewardFileUrl: 'https://socialboost.app/files/downloads/secrets_tiktok_shorts_sarahb.pdf',
    platform: 'tiktok',
    actionType: 'follow',
    targetUrl: 'https://tiktok.com/@sarah_shorts_expert',
    targetHandle: '@sarah_shorts_expert',
    participantsCount: 1412,
    maxParticipants: 3000,
    expirationDate: '2026-09-30',
    status: 'active',
    createdAt: '2026-05-18',
    pointsReward: 200
  },
  {
    id: 'campaign-3',
    title: 'Prompt Book: 25 Prompts GPT-4o Infaillibles pour le Copywriting',
    description: 'Générez des pages de vente et des e-mails marketing irrésistibles en quelques secondes. Testés et optimisés pour doubler vos conversions.',
    creatorName: 'Alexandre Dubois',
    creatorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    coverImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80',
    rewardType: 'prompt',
    rewardTitle: '25 Prompts Masters pour Claude & GPT',
    rewardDescription: 'Fichier Markdown avec explications et variables de personnalisation.',
    rewardFileUrl: 'https://notion.so/prompts-dubois-copywriting-socialboost-secret',
    platform: 'youtube',
    actionType: 'subscribe',
    targetUrl: 'https://youtube.com/channel/alexandre_dubois_growth',
    targetHandle: 'Alexandre Dubois Copy',
    participantsCount: 894,
    expirationDate: '2027-01-01',
    status: 'active',
    createdAt: '2026-05-20',
    pointsReward: 180
  },
  {
    id: 'campaign-4',
    title: 'Canal Telegram VIP: Crypto, Finance & IA Trends Semestriels',
    description: 'Rejoignez mon cercle d’alerte privée. Je partage mes analyses d’altcoins prometteurs et d’innovations IA chaque semaine.',
    creatorName: 'Marc-Antoine G.',
    creatorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    coverImage: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&w=800&q=80',
    rewardType: 'community',
    rewardTitle: 'Invitation Directe Telegram Premium',
    rewardDescription: 'Lien d’invitation à usage unique pour intégrer la communauté privée.',
    rewardFileUrl: 'https://t.me/joinchat/private_boost_key_mag_finance',
    platform: 'telegram',
    actionType: 'join_channel',
    targetUrl: 'https://t.me/mag_investors_free',
    targetHandle: 'MAG Investors Free',
    participantsCount: 1670,
    maxParticipants: 2000,
    expirationDate: '2026-08-15',
    status: 'active',
    createdAt: '2026-05-01',
    pointsReward: 250
  },
  {
    id: 'campaign-5',
    title: 'Logiciel No-Code: Scraper de leads Google Maps 100% Gratuit',
    description: 'Une extension Chrome légère avec tutoriel vidéo pour exporter les e-mails, téléphones et adresses de commerces locaux en un clic sur un fichier Excel.',
    creatorName: 'Amélie Voisin',
    creatorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    rewardType: 'software',
    rewardTitle: 'Extension Zip & Code d’activation',
    rewardDescription: 'Fichier ZIP contenant l’extension Chrome et sa clé de licence d’essai.',
    rewardFileUrl: 'https://socialboost.app/files/software/gmaps_scraper_free_build.zip',
    platform: 'twitter',
    actionType: 'repost',
    targetUrl: 'https://twitter.com/amelie_nocode/status/1789456123490',
    targetHandle: '@amelie_nocode',
    participantsCount: 341,
    maxParticipants: 500,
    expirationDate: '2026-11-20',
    status: 'active',
    createdAt: '2026-05-24',
    pointsReward: 160
  }
];

export const DEFAULT_REWARDS_LIBRARY: RewardFile[] = [
  {
    id: 'rew-1',
    name: 'Ebook_TikTok_Secrets.pdf',
    type: 'pdf',
    size: '12.4 MB',
    downloadCount: 1412,
    url: 'https://socialboost.app/files/downloads/secrets_tiktok_shorts_sarahb.pdf',
    createdAt: '2026-05-18'
  },
  {
    id: 'rew-2',
    name: 'Pack_Templates_Canva_Creator_Economy_Thomas.zip',
    type: 'template',
    size: '4.8 MB',
    downloadCount: 429,
    url: 'https://canva.com/design/templates-vip-creator-economy',
    createdAt: '2026-05-15'
  },
  {
    id: 'rew-3',
    name: 'GMaps_Lead_Scraper_Chrome_Ext.zip',
    type: 'software',
    size: '8.1 MB',
    downloadCount: 341,
    url: 'https://socialboost.app/files/software/gmaps_scraper_free_build.zip',
    createdAt: '2026-05-24'
  },
  {
    id: 'rew-4',
    name: 'Cheatsheet_Prompts_GPT4_Dubois.md',
    type: 'prompt',
    size: '142 KB',
    downloadCount: 894,
    url: 'https://notion.so/prompts-dubois-copywriting-socialboost-secret',
    createdAt: '2026-05-20'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Matthieu Chéreau',
    role: 'Youtuber Tech (75k abonnés)',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80',
    quote: 'J’ai distribué un récapitulatif de ma formation d’une page en échange d’un abonnement YouTube. Bilan : +12 000 abonnés qualifiés en 3 semaines, avec un coût d’acquisition de 0€. Cette plateforme est une pépite.',
    followersGained: '+12.4K abonnés'
  },
  {
    id: 'test-2',
    name: 'Chloé Lemoine',
    role: 'Influenceuse Beauté / Lifestyle',
    avatar: 'https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&w=150&q=80',
    quote: 'La conversion est folle. Mes abonnés TikTok d’abord sceptiques adorent le concept car le cadeau (un guide de presets Lightroom) a une vraie valeur. Le système de vérification automatique leur fait gagner un temps précieux.',
    followersGained: '+8.2K TikTok'
  },
  {
    id: 'test-3',
    name: 'Arnaud Sanchez',
    role: 'Fondateur de SaaS B2B',
    avatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=150&q=80',
    quote: 'Je cherchais un moyen organique de faire grossir ma mailing-list et mes followers LinkedIn. Avec SocialBoost, j’ai généré 350+ partages de ma newsletter en moins de 5 jours grâce à un ebook de prompts ChatGPT de niche.',
    followersGained: '+2.5K LinkedIn'
  }
];

export const FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'Comment fonctionne la vérification des actions sociales ?',
    answer: 'SocialBoost dispose de deux méthodes complémentaires : la vérification par liaison d’API (pour détecter les abonnements, likes ou partages de façon instantanée) et la vérification manuelle par capture d’écran. L’utilisateur télécharge un screenshot de son profil abonné et notre algorithme IA d’analyse visuelle approuve ou rejette instantanément la preuve pour débloquer le téléchargement.',
    category: 'general'
  },
  {
    id: 'faq-2',
    question: 'Quelles sont les restrictions anti-fraude appliquées aux visiteurs ?',
    answer: 'Pour éviter que des utilisateurs d’un jour se désabonnent immédiatement après avoir récupéré leur récompense, SocialBoost intègre des contrôles d’intégrité périodiques. Les comptes suspects qui abusent de cette pratique voient leur accès aux récompenses futures révoqué. Un système d’alerte par e-mail et de score de confiance est automatique pour chaque utilisateur.',
    category: 'campaigns'
  },
  {
    id: 'faq-3',
    question: 'Les plans Starter, Pro et Business sont-ils sans engagement ?',
    answer: 'Oui, tout à fait. Nos abonnements sont facturés mensuellement ou annuellement et peuvent être résiliés ou modifiés en un clic depuis votre espace membre sans engagement de durée. Vos campagnes en cours resteront enregistrées mais seront mises en pause s’ils dépassent les limites du plan gratuit.',
    category: 'billing'
  },
  {
    id: 'faq-4',
    question: 'Puis-je lier mes campagnes à mes propres noms de domaine ?',
    answer: 'Bien sûr ! Les créateurs utilisant le plan Pro ou Business peuvent configurer des domaines personnalisés (ex: cadeau.moncompte.com) pour leurs pages de capture de récompense, en plus d’en personnaliser l’ensemble des couleurs, polices de caractères et d’intégrer un pixel Meta ou Google Analytics.',
    category: 'campaigns'
  },
  {
    id: 'faq-5',
    question: 'Quels sont les modes de paiement pris en charge ?',
    answer: 'Nous prenons en charge les règlements par carte bancaire (via Stripe sécurisé), PayPal, ainsi que FedaPay pour les créateurs basés en Afrique afin d’encourager une inclusion financière de tous les influenceurs francophones (Mobile Money, MTN, Moov, Orange Money).',
    category: 'billing'
  }
];

export const LEADERBOARD: LeaderboardUser[] = [
  { rank: 1, name: 'Jessica V.', points: 8450, avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80', badge: 'Légende Sociale 👑', contributions: 42 },
  { rank: 2, name: 'Lucas Girardon', points: 7200, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80', badge: 'Partageur Fou ⚡', contributions: 37 },
  { rank: 3, name: 'Mylène K.', points: 6950, avatar: 'https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&w=100&q=80', badge: 'Génie d\'Audience 🌟', contributions: 33 },
  { rank: 4, name: 'Karim O.', points: 5800, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80', badge: 'Expert TikTok 🚀', contributions: 26 },
  { rank: 5, name: 'Julie Descombes', points: 5120, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80', badge: 'Initié d\'Or ⭐', contributions: 21 }
];

export const BLOG_POSTS: BlogItem[] = [
  {
    id: 'blog-1',
    title: '5 Idées de Récompenses Digitales Faciles à Créer sans Budget',
    summary: 'Découvrez comment construire de la valeur et générer vos 1000 premiers inscrits sans débourser un centime en transformant votre savoir-faire quotidien.',
    content: 'Créer une récompense digitale attrayante ne demande pas forcément des semaines de travail ou un budget d’agence. Voici 5 formats ultra simples à concevoir pour vos campagnes :\n\n1. **Un document Notion partagé** : Regroupez vos meilleures ressources de travail sur un thème précis (outils de design, chaînes YouTube d’apprentissage...).\n2. **Une Checklist unitaire** : Une feuille Google Sheets interactive sur de la gestion de projet ou une liste d’audits techniques.\n3. **Un enregistrement d’écran de 5 minutes** : Pas besoin de studio, commentez une de vos astuces en filmant votre écran avec Loom.\n4. **Un Prompt IA personnalisé** : Partagez des instructions textuelles de haut niveau peaufinées par vos soins pour Midjourney ou ChatGPT.\n5. **Un pack d’actifs ou d’icônes libres de droits** : Faites le tri et facilitez la recherche d’images pour vos internautes.',
    image: 'https://images.unsplash.com/photo-1510519138101-570d1dca3d66?auto=format&fit=crop&w=800&q=80',
    category: 'Stratégie',
    readTime: '4 min',
    date: '2026-05-30'
  },
  {
    id: 'blog-2',
    title: 'Comment Rédiger un Hook TikTok Imparable pour vos Campagnes',
    summary: 'L’accroche de vos vidéos décide si un internaute va s’abonner pour récupérer votre bonus ou swiper dans la seconde. Analyse pratique des meilleures mécaniques.',
    content: 'Les 3 premières secondes représentent 80 % du succès de vos vidéos courtes. Pour maximiser la conversion vers vos liens de biographie, votre hook doit être millimétré.\n\n- **Le Hook de Frustration** : "Arrêtez de concevoir vos posts comme ça... faites plutôt ceci."\n- **Le Hook de Gain Temporel** : "J’ai passé 50 heures à apprendre X, voici comment le maîtriser en 15 secondes."\n- **Le Hook Visuel direct** : Montrez immédiatement le résultat final (la récompense, le plan d’e-mails ou l’extension Chrome) avant de raconter son fonctionnement.\n\nTerminez toujours par un appel à l’action franc : "Le guide complet de cette manipulation est offert sur le lien en bio si vous me soutenez sur la page !"',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80',
    category: 'TikTok & Reels',
    readTime: '6 min',
    date: '2026-06-02'
  }
];
export const INITIAL_AFFILIATE_LOGS = [
  { id: 'aff-1', date: '2026-06-04', referredEmail: 'luc@creative-studio.fr', plan: 'Plan Pro Annel', status: 'commission_paid', commissionAmount: 11.70 },
  { id: 'aff-2', date: '2026-06-03', referredEmail: 'mounia.beauté@gmail.com', plan: 'Plan Starter Mensuel', status: 'commission_paid', commissionAmount: 5.85 },
  { id: 'aff-3', date: '2026-06-01', referredEmail: 'contact@agence-flow.com', plan: 'Plan Business Mensuel', status: 'pending', commissionAmount: 23.70 },
  { id: 'aff-4', date: '2026-05-28', referredEmail: 'theo.design@outlook.com', plan: 'Plan Pro Mensuel', status: 'commission_paid', commissionAmount: 11.70 }
];
