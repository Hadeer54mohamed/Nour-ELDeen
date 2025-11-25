import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: 'krde98wz',
  dataset: 'production',
  apiVersion: '2024-11-24',
  useCdn: true, // Set to false if you want fresh data
})

const builder = imageUrlBuilder(client)

export function urlFor(source) {
  return builder.image(source)
}

