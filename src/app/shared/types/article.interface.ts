import { ProfileInterface } from './profile.interface';

export interface ArticleInterface {
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  slug: string;
  author: ProfileInterface;
}
