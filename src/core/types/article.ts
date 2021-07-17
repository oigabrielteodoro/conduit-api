import * as t from 'io-ts'

import { tagCodec } from '@/core/types/tag'
import { profileCodec } from '@/core/types/profile'

export const articleCodec = t.type({
  slug: t.string,
  title: t.string,
  description: t.string,
  body: t.string,
  tagList: t.array(tagCodec),
  createdAt: t.string,
  updatedAt: t.string,
  favorited: t.boolean,
  favoritesCount: t.number,
  author: profileCodec,
})

export type Article = t.TypeOf<typeof articleCodec>

export type Articles = {
  artigles: Article[]
  articlesCount: number
}
