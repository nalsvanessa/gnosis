export interface Challenge {
  id: number;
  title: string;
  difficulty: string;
  description: string;
  category: string;
  createdAt: string;
  reflection: string | null;
  completed: boolean;
  completedAt: string | null;
}