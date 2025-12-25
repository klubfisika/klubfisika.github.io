// Blog related types
export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  author: string;
  date: string;
  readTime: string;
  image: string;
  views: number;
}

export interface PopularTag {
  name: string;
  count: number;
}

export interface BlogStats {
  totalArticles: number;
  totalViews: string;
  thisMonth: number;
  categories: number;
}

export interface FilterState {
  search: string;
  category: string;
  tag: string | null;
}

// Component Props Types
export interface FeaturedArticleProps {
  post: BlogPost;
}

export interface ArticleCardProps {
  post: BlogPost;
  index: number;
}

export interface ArticleGridProps {
  articles: BlogPost[];
  visibleCount?: number;
}

export interface TagsCardProps {
  tags: PopularTag[];
}

export interface RecentArticlesCardProps {
  articles: Pick<BlogPost, 'slug' | 'title' | 'date' | 'readTime'>[];
}

export interface StatsCardProps {
  stats: BlogStats;
}
