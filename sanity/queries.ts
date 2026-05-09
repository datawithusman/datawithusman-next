import { client } from './client'

// ── Blog Posts ──

export async function getAllPosts() {
  return client!.fetch(`
    *[_type == "post"] | order(date desc) {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      category,
      readTime,
      date,
      published,
      content
    }
  `)
}

export async function getPublishedPosts() {
  return client!.fetch(`
    *[_type == "post" && published == true] | order(date desc) {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      category,
      readTime,
      date,
      published
    }
  `)
}

export async function getPostBySlug(slug: string) {
  return client!.fetch(
    `
    *[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      category,
      readTime,
      date,
      published,
      content
    }
  `,
    { slug }
  )
}

export async function getPostSlugs() {
  return client!.fetch(`
    *[_type == "post" && defined(slug.current)] {
      "slug": slug.current
    }
  `)
}

// ── Projects ──

export async function getAllProjects() {
  return client!.fetch(`
    *[_type == "project"] | order(_createdAt desc) {
      _id,
      title,
      "slug": slug.current,
      category,
      tools,
      problem,
      result,
      featured
    }
  `)
}

export async function getFeaturedProjects() {
  return client!.fetch(`
    *[_type == "project" && featured == true] | order(_createdAt desc) {
      _id,
      title,
      "slug": slug.current,
      category,
      tools,
      problem,
      result,
      featured
    }
  `)
}