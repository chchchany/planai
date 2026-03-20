export type UserProfile = {
  id: string
  email: string
  nickname: string
  job_title?: string
  company_size?: string
  avatar_url?: string
  created_at: string
}

export type Post = {
  id: string
  author_id: string
  author?: UserProfile
  title: string
  content: string
  category: 'tip' | 'career' | 'tool' | 'reference'
  likes_count: number
  comments_count: number
  created_at: string
}

export type Product = {
  id: string
  seller_id: string
  seller?: UserProfile
  title: string
  description: string
  price: number
  file_url?: string
  preview_url?: string
  category: string
  rating?: number
  sales_count: number
  created_at: string
}

export type Comment = {
  id: string
  post_id: string
  author_id: string
  author?: UserProfile
  content: string
  created_at: string
}
