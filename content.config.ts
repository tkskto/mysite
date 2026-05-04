import { defineCollection, defineContentConfig } from '@nuxt/content';
import { asSitemapCollection } from '@nuxtjs/sitemap/content';

export default defineContentConfig({
  collections: {
    resume: defineCollection(
      asSitemapCollection({
        type: 'page',
        source: 'resume/*.md',
      })
    )
  }
})
