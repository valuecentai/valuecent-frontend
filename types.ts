

export type Page = 'landing' | 'courses';
export type View = { page: 'home' | 'courses' | 'courseDetail' | 'settings' | 'chapterVideo' | 'community' | 'profile'; courseId?: string; chapterTitle?: string; };

export interface Chapter {
  title: string;
  videoEmbedUrl: string;
}

export interface ResourceLink {
  title: string;
  url: string;
  type: 'website' | 'pdf';
}

export interface Course {
  id: string;
  title: string;
  description: string;
  videoEmbedUrl: string;
  notebookUrl: string;
  isFeatured?: boolean;
  chapters?: Chapter[];
  resources?: ResourceLink[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

export interface UserProfile {
  name: string;
  title: string;
}
