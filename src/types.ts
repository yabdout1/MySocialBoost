export type Platform = 'tiktok' | 'facebook' | 'youtube' | 'instagram' | 'telegram' | 'linkedin' | 'twitter' | 'all';

export type RewardType = 'pdf' | 'guide' | 'video' | 'template' | 'prompt' | 'checklist' | 'software' | 'discount' | 'course' | 'community' | 'other';

export interface Campaign {
  id: string;
  title: string;
  description: string;
  creatorName: string;
  creatorAvatar: string;
  coverImage: string;
  rewardType: RewardType;
  rewardTitle: string;
  rewardDescription: string;
  rewardFileUrl: string; // The reward destination
  platform: Platform;
  actionType: 'follow' | 'subscribe' | 'like' | 'share' | 'repost' | 'join_group' | 'join_channel';
  targetUrl: string; // Recipient URL (e.g. youtube.com/c/Creator)
  targetHandle: string; // @username or handle
  participantsCount: number;
  maxParticipants?: number;
  expirationDate: string;
  status: 'active' | 'expired' | 'pending' | 'paused';
  createdAt: string;
  pointsReward: number; // Gamification points for completing
}

export interface RewardFile {
  id: string;
  name: string;
  type: RewardType;
  size: string;
  downloadCount: number;
  url: string;
  createdAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  quote: string;
  followersGained: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'campaigns' | 'rewards' | 'billing';
}

export interface LeaderboardUser {
  rank: number;
  name: string;
  points: number;
  avatar: string;
  badge: string;
  contributions: number;
}

export interface AffiliateUser {
  id: string;
  date: string;
  referredEmail: string;
  plan: string;
  status: 'commission_paid' | 'pending' | 'failed';
  commissionAmount: number;
}

export interface BlogItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  image: string;
  category: string;
  readTime: string;
  date: string;
}

export interface AlertNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'success' | 'info' | 'warning';
}
