import { URL } from 'url'
import * as t from 'io-ts'
import { withMessage } from 'io-ts-types'

type UrlBrand = {
  readonly Url: unique symbol
}

export const urlCodec = withMessage(
  t.brand(
    t.string,
    (value): value is t.Branded<string, UrlBrand> => isUrl(value),
    'Url',
  ),
  () => 'Invalid URL',
)

export type Url = t.TypeOf<typeof urlCodec>

function isUrl (value: unknown) {
  try {
    const url = new URL(typeof value === 'string' ? value : '')
    return !!url
  } catch {
    return false
  }
}
