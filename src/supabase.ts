import { createClient } from '@supabase/supabase-js';
import { Campaign, RewardFile, LeaderboardUser } from './types';

// Retrieve environment credentials from Vite env and sanitize them
const sanitizeEnvVal = (val: string | undefined | null): string => {
  if (!val) return '';
  const trimmed = val.trim();
  if (
    trimmed === '' || 
    trimmed === 'undefined' || 
    trimmed === 'null' || 
    trimmed.includes('placeholder') || 
    trimmed.includes('YOUR_') ||
    trimmed.includes('your-project') ||
    trimmed.includes('yzlswmhmkaueumoerivn')
  ) {
    return '';
  }
  return trimmed;
};

const supabaseUrl = sanitizeEnvVal((import.meta as any).env?.VITE_SUPABASE_URL);
const supabaseAnonKey = sanitizeEnvVal((import.meta as any).env?.VITE_SUPABASE_ANON_KEY) || sanitizeEnvVal((import.meta as any).env?.VITE_SUPABASE_PUBLISHABLE_KEY);

// Create Supabase client (only created if both credentials are provided to avoid runtime errors)
export const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

/**
 * Returns true if the client is successfully connected to a Supabase project.
 */
export const isSupabaseConfigured = (): boolean => {
  return !!(supabaseUrl && supabaseAnonKey && supabase);
};

export const getSupabaseUrlAndKey = () => {
  return {
    url: supabaseUrl,
    configured: isSupabaseConfigured()
  };
};

/**
 * SQL script for database creation in the Supabase SQL Editor.
 */
export const SUPABASE_SQL_SETUP = `-- ==========================================
-- SOCIALBOOST SUPABASE DATABASE SETUP SCHEMA
-- Copy and run this script in your Supabase SQL Editor
-- ==========================================

-- 1. Create the campaigns table matching our app architecture
CREATE TABLE IF NOT EXISTS campaigns (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  creator_name TEXT NOT NULL,
  creator_avatar TEXT NOT NULL,
  cover_image TEXT NOT NULL,
  reward_type TEXT NOT NULL,
  reward_title TEXT NOT NULL,
  reward_description TEXT NOT NULL,
  reward_file_url TEXT NOT NULL,
  platform TEXT NOT NULL,
  action_type TEXT NOT NULL,
  target_url TEXT NOT NULL,
  target_handle TEXT NOT NULL,
  participants_count INTEGER DEFAULT 0,
  max_participants INTEGER,
  expiration_date TEXT NOT NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'expired', 'pending', 'paused')),
  points_reward INTEGER DEFAULT 100,
  email_verification_enabled BOOLEAN DEFAULT FALSE,
  email_for_verification TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create the reward_files table for the creator's storage locker
CREATE TABLE IF NOT EXISTS reward_files (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  size TEXT NOT NULL,
  download_count INTEGER DEFAULT 0,
  url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Pre-seed initial campaign templates to test your backend immediately
INSERT INTO campaigns (
  id, title, description, creator_name, creator_avatar, cover_image, 
  reward_type, reward_title, reward_description, reward_file_url, 
  platform, action_type, target_url, target_handle, participants_count, 
  max_participants, expiration_date, status, points_reward
) VALUES 
(
  'campaign-1', 
  'Kit Canva Premium: 50 Templates Pour Creator Economy', 
  'Accédez instantanément à mon pack privé de 50 designs Canva hautement optimisés pour faire exploser votre taux de clic sur Instagram et TikTok.', 
  'Thomas Letellier', 
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80', 
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
  'template', 
  'Pack de 50 Templates Canva Viraux', 
  'Fichier d’accès Canva partagé directement. Modifiable en 1 clic.', 
  'https://canva.com/design/templates-vip-creator-economy-preview-socialboost', 
  'instagram', 
  'follow', 
  'https://instagram.com/thomas_crea', 
  '@thomas_crea', 
  429, 
  1000, 
  '2026-12-31', 
  'active', 
  150
),
(
  'campaign-2', 
  'Ebook: Secrets des Shorts TikTok (De 0 à 100k en 90 jours)', 
  'Le guide complet analysant l’algorithme TikTok 2026, la rétention, les hooks, et la structure exacte de 12 vidéos devenues multimillionnaires en vues.', 
  'Sarah Benamou', 
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80', 
  'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80',
  'pdf', 
  'Livre Blanc: TikTok Secrets PDF', 
  'Format PDF haute qualité - 62 pages de stratégies illustrées.', 
  'https://socialboost.app/files/downloads/secrets_tiktok_shorts_sarahb.pdf', 
  'tiktok', 
  'follow', 
  'https://tiktok.com/@sarah_shorts_expert', 
  '@sarah_shorts_expert', 
  1412, 
  3000, 
  '2026-09-30', 
  'active', 
  200
) ON CONFLICT (id) DO NOTHING;

-- 4. Enable Row Level Security (RLS) on both tables (To secure them)
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE reward_files ENABLE ROW LEVEL SECURITY;

-- 5. Open access policy protocols (allows all users to read/interact, with full access for inserts)
CREATE POLICY "Allow public read-access" ON campaigns FOR SELECT USING (true);
CREATE POLICY "Allow public inserts" ON campaigns FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public updates" ON campaigns FOR UPDATE USING (true);
CREATE POLICY "Allow public deletes" ON campaigns FOR DELETE USING (true);

CREATE POLICY "Allow public select on rewards" ON reward_files FOR SELECT USING (true);
CREATE POLICY "Allow public insert on rewards" ON reward_files FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on rewards" ON reward_files FOR UPDATE USING (true);
CREATE POLICY "Allow public delete on rewards" ON reward_files FOR DELETE USING (true);

-- 6. Create leaderboard_users table for user tracker representation
CREATE TABLE IF NOT EXISTS leaderboard_users (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  points INTEGER DEFAULT 0,
  avatar TEXT,
  badge TEXT,
  contributions INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Seed initial leaderboard values
INSERT INTO leaderboard_users (id, name, points, avatar, badge, contributions) VALUES
('u-1', 'Jessica V.', 8450, 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80', 'Légende Sociale 👑', 42),
('u-2', 'Lucas Girardon', 7200, 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80', 'Partageur Fou ⚡', 37),
('u-3', 'Mylène K.', 6950, 'https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&w=100&q=80', 'Génie d''Audience 🌟', 33),
('u-4', 'Karim O.', 5800, 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80', 'Expert TikTok 🚀', 26),
('u-5', 'Julie Descombes', 5120, 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80', 'Initié d''Or ⭐', 21)
ON CONFLICT (id) DO NOTHING;

-- Enable Row Level Security (RLS) on leaderboard_users
ALTER TABLE leaderboard_users ENABLE ROW LEVEL SECURITY;

-- Allow public read & insert/update for leaderboard_users
CREATE POLICY "Allow public select on leaderboard" ON leaderboard_users FOR SELECT USING (true);
CREATE POLICY "Allow public insert on leaderboard" ON leaderboard_users FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on leaderboard" ON leaderboard_users FOR UPDATE USING (true);
CREATE POLICY "Allow public delete on leaderboard" ON leaderboard_users FOR DELETE USING (true);
`;

// Helper conversion mappings
const toCampaignObject = (row: any): Campaign => {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    creatorName: row.creator_name,
    creatorAvatar: row.creator_avatar,
    coverImage: row.cover_image,
    rewardType: row.reward_type,
    rewardTitle: row.reward_title,
    rewardDescription: row.reward_description,
    rewardFileUrl: row.reward_file_url,
    platform: row.platform,
    actionType: row.action_type,
    targetUrl: row.target_url,
    targetHandle: row.target_handle,
    participantsCount: row.participants_count || 0,
    maxParticipants: row.max_participants || undefined,
    expirationDate: row.expiration_date,
    status: row.status as any,
    createdAt: row.created_at ? new Date(row.created_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    pointsReward: row.points_reward || 100,
    emailVerificationEnabled: row.email_verification_enabled || false,
    emailForVerification: row.email_for_verification || undefined
  };
};

const toCampaignDbRow = (camp: Campaign) => {
  return {
    id: camp.id,
    title: camp.title,
    description: camp.description,
    creator_name: camp.creatorName,
    creator_avatar: camp.creatorAvatar,
    cover_image: camp.coverImage,
    reward_type: camp.rewardType,
    reward_title: camp.rewardTitle,
    reward_description: camp.rewardDescription,
    reward_file_url: camp.rewardFileUrl,
    platform: camp.platform,
    action_type: camp.actionType,
    target_url: camp.targetUrl,
    target_handle: camp.targetHandle,
    participants_count: camp.participantsCount,
    max_participants: camp.maxParticipants || null,
    expiration_date: camp.expirationDate,
    status: camp.status,
    points_reward: camp.pointsReward,
    email_verification_enabled: camp.emailVerificationEnabled || false,
    email_for_verification: camp.emailForVerification || null
  };
};

const toFileObject = (row: any): RewardFile => {
  return {
    id: row.id,
    name: row.name,
    type: row.type,
    size: row.size,
    downloadCount: row.download_count || 0,
    url: row.url,
    createdAt: row.created_at ? new Date(row.created_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
  };
};

const toFileDbRow = (file: RewardFile) => {
  return {
    id: file.id,
    name: file.name,
    type: file.type,
    size: file.size,
    download_count: file.downloadCount,
    url: file.url
  };
};

// ================= FETCH CAMPAIGNS =================
export async function dbFetchCampaigns(): Promise<Campaign[] | null> {
  if (!isSupabaseConfigured() || !supabase) return null;
  try {
    const { data, error } = await supabase
      .from('campaigns')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase fetch error:', error);
      return null;
    }
    return data.map(toCampaignObject);
  } catch (err) {
    console.error('Failed to contact Supabase server:', err);
    return null;
  }
}

// ================= INSERT CAMPAIGN =================
export async function dbInsertCampaign(camp: Campaign): Promise<boolean> {
  if (!isSupabaseConfigured() || !supabase) return false;
  try {
    const row = toCampaignDbRow(camp);
    const { error } = await supabase
      .from('campaigns')
      .insert([row]);

    if (error) {
      console.error('Supabase insert campaign error:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Network failure writing to Supabase:', err);
    return false;
  }
}

// ================= DELETE CAMPAIGN =================
export async function dbDeleteCampaign(id: string): Promise<boolean> {
  if (!isSupabaseConfigured() || !supabase) return false;
  try {
    const { error } = await supabase
      .from('campaigns')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Supabase delete campaign error:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Network failure deleting campaign:', err);
    return false;
  }
}

// ================= UPDATE PARTICIPANTS =================
export async function dbIncrementParticipants(id: string, nextCount: number): Promise<boolean> {
  if (!isSupabaseConfigured() || !supabase) return false;
  try {
    const { error } = await supabase
      .from('campaigns')
      .update({ participants_count: nextCount })
      .eq('id', id);

    if (error) {
      console.error('Supabase increment participants error:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Network error during participants increment:', err);
    return false;
  }
}

// ================= FETCH FILES =================
export async function dbFetchFiles(): Promise<RewardFile[] | null> {
  if (!isSupabaseConfigured() || !supabase) return null;
  try {
    const { data, error } = await supabase
      .from('reward_files')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase files fetch error:', error);
      return null;
    }
    return data.map(toFileObject);
  } catch (err) {
    console.error('Supabase network error fetching files:', err);
    return null;
  }
}

// ================= INSERT FILE =================
export async function dbInsertFile(file: RewardFile): Promise<boolean> {
  if (!isSupabaseConfigured() || !supabase) return false;
  try {
    const row = toFileDbRow(file);
    const { error } = await supabase
      .from('reward_files')
      .insert([row]);

    if (error) {
      console.error('Supabase insert file error:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Supabase network error inserting file:', err);
    return false;
  }
}

// ================= DELETE FILE =================
export async function dbDeleteFile(id: string): Promise<boolean> {
  if (!isSupabaseConfigured() || !supabase) return false;
  try {
    const { error } = await supabase
      .from('reward_files')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Supabase delete file error:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Supabase network error deleting file:', err);
    return false;
  }
}

// ================= FETCH USERS FROM LEADERBOARD =================
/**
 * Lists all users from the leaderboard_users table, sorted descending by experience points.
 */
export async function dbFetchUsers(): Promise<LeaderboardUser[] | null> {
  if (!isSupabaseConfigured() || !supabase) return null;
  try {
    const { data, error } = await supabase
      .from('leaderboard_users')
      .select('*')
      .order('points', { ascending: false });

    if (error) {
      console.error('Supabase fetch users error:', error);
      return null;
    }

    return data.map((row: any, index: number) => ({
      rank: index + 1,
      name: row.name,
      points: row.points || 0,
      avatar: row.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      badge: row.badge || 'Membre Actif ⚡',
      contributions: row.contributions || 0
    }));
  } catch (err) {
    console.error('Supabase network error fetching users:', err);
    return null;
  }
}

// ================= INSERT NEW USER TO LEADERBOARD =================
/**
 * Inserts a new leaderboard user profile.
 */
export async function dbInsertUser(user: Omit<LeaderboardUser, 'rank'> & { id: string }): Promise<boolean> {
  if (!isSupabaseConfigured() || !supabase) return false;
  try {
    const { error } = await supabase
      .from('leaderboard_users')
      .insert([{
        id: user.id,
        name: user.name,
        points: user.points,
        avatar: user.avatar,
        badge: user.badge,
        contributions: user.contributions
      }]);

    if (error) {
      console.error('Supabase insert user error:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Supabase network error inserting user:', err);
    return false;
  }
}

// ================= UPDATE USER SCORE / POINTS =================
/**
 * Increments or sets points & contributions for a given user.
 */
export async function dbUpdateUserPoints(id: string, nextPoints: number, nextContributions: number): Promise<boolean> {
  if (!isSupabaseConfigured() || !supabase) return false;
  try {
    const { error } = await supabase
      .from('leaderboard_users')
      .update({
        points: nextPoints,
        contributions: nextContributions
      })
      .eq('id', id);

    if (error) {
      console.error('Supabase update user score error:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Supabase network error updating user score:', err);
    return false;
  }
}

// ================= SUPABASE AUTH MANAGEMENT helpers =================
/**
 * Triggers sign up on Supabase Auth.
 */
export async function authSignUp(email: string, password: string) {
  if (!isSupabaseConfigured() || !supabase) {
    return { data: null, error: new Error("Supabase n'est pas configuré.") };
  }
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    return { data, error };
  } catch (err: any) {
    return { data: null, error: err };
  }
}

/**
 * Triggers sign in with password on Supabase Auth.
 */
export async function authSignIn(email: string, password: string) {
  if (!isSupabaseConfigured() || !supabase) {
    return { data: null, error: new Error("Supabase n'est pas configuré.") };
  }
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  } catch (err: any) {
    return { data: null, error: err };
  }
}

/**
 * Triggers sign out.
 */
export async function authSignOut() {
  if (!isSupabaseConfigured() || !supabase) return;
  try {
    await supabase.auth.signOut();
  } catch (err) {
    console.error("Error signing out:", err);
  }
}

/**
 * Gets the current active user session if available.
 */
export async function authGetCurrentUser() {
  if (!isSupabaseConfigured() || !supabase) return null;
  try {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  } catch (err) {
    console.error("Error fetching current user:", err);
    return null;
  }
}

/**
 * Initiates Google OAuth sequence, returning the secure provider redirect url.
 */
export async function authSignInWithGoogle(redirectTo?: string) {
  if (!isSupabaseConfigured() || !supabase) {
    return { data: null, error: new Error("Supabase n'est pas configuré.") };
  }
  try {
    const defaultRedirect = redirectTo || (typeof window !== 'undefined' ? window.location.origin : '');
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: defaultRedirect,
        skipBrowserRedirect: true
      }
    });
    return { data, error };
  } catch (err: any) {
    return { data: null, error: err };
  }
}

/**
 * Restores and activates Supabase auth state using token parameters from URL hash.
 */
export async function authSetSession(accessToken: string, refreshToken: string) {
  if (!isSupabaseConfigured() || !supabase) {
    return { data: null, error: new Error("Supabase n'est pas configuré.") };
  }
  try {
    const { data, error } = await supabase.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken
    });
    return { data, error };
  } catch (err: any) {
    return { data: null, error: err };
  }
}

// ================= SUPABASE CONNECTION DIAGNOSTIC TEST =================
export interface SupabaseTestResult {
  success: boolean;
  message: string;
  url: string;
  configured: boolean;
  timestamp: string;
  tables: {
    name: string;
    exists: boolean;
    rowCount: number | null;
    error: string | null;
  }[];
}

/**
 * Verifies live connectivity to Supabase and lists connection state/tables
 */
export async function testSupabase(): Promise<SupabaseTestResult> {
  const result: SupabaseTestResult = {
    success: false,
    message: '',
    url: supabaseUrl || 'Non définie',
    configured: isSupabaseConfigured(),
    timestamp: new Date().toLocaleTimeString(),
    tables: []
  };

  if (!result.configured || !supabase) {
    result.message = "Supabase n'est pas configuré. Veuillez d'abord ajouter VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY (ou PUBLISHABLE_KEY) dans vos variables d'environnement.";
    return result;
  }

  // Probe database schemas and tables we expect
  const tablesToProbe = ['campaigns', 'reward_files', 'leaderboard_users'];
  let successCount = 0;

  for (const tableName of tablesToProbe) {
    try {
      // Query exact count of elements inside our tables as a live verification test
      const { count, error } = await supabase
        .from(tableName)
        .select('*', { count: 'exact', head: true });

      if (error) {
        result.tables.push({
          name: tableName,
          exists: false,
          rowCount: null,
          error: error.message
        });
      } else {
        successCount++;
        result.tables.push({
          name: tableName,
          exists: true,
          rowCount: count,
          error: null
        });
      }
    } catch (err: any) {
      result.tables.push({
        name: tableName,
        exists: false,
        rowCount: null,
        error: err?.message || "Erreur de connexion réseau"
      });
    }
  }

  if (successCount === tablesToProbe.length) {
    result.success = true;
    result.message = "Connexion réussie ! Toutes les tables de l'application sont en ligne, opérationnelles et accessibles dans le schéma public.";
  } else if (successCount > 0) {
    result.success = true;
    result.message = `Connexion établie partiellement (${successCount}/${tablesToProbe.length} tables trouvées). Certaines tables de base de données semblent manquantes. Avez-vous exécuté le script SQL fourni dans l'onglet SQL Editor de Supabase ?`;
  } else {
    result.success = false;
    result.message = "La requête de connexion a échoué. Votre clé API ou URL Supabase est probablement invalide, ou l'accès CORS est restreint.";
  }

  return result;
}



