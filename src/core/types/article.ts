import { Tag } from '@/core/types/tag'
import { Profile } from '@/core/types/profile'

export type Article = {
  slug: string
  title: string
  description: string
  body: string
  tagList: Tag[]
  createdAt: string
  updatedAt: string
  favorited: boolean
  favoritesCount: number
  author: Profile
}

export type Articles = {
  artigles: Article[]
  articlesCount: number
}
