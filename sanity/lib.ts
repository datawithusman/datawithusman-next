import { getAllPosts as sanityGetAllPosts, getPostBySlug as sanityGetPostBySlug, getPostSlugs as sanityGetPostSlugs, getAllProjects as sanityGetAllProjects } from './queries'
import staticPosts from '@/data/posts'
import staticProjects, { categories as staticCategories } from '@/data/projects'
import { sanityConfigured } from './env'

// ── Blog Posts ──

export async function getPosts() {
  if (!sanityConfigured) return staticPosts
  try {
    const posts = await sanityGetAllPosts()
    return posts.length > 0 ? posts : staticPosts
  } catch {
    return staticPosts
  }
}

export async function getPostSlugs() {
  if (!sanityConfigured) return staticPosts.map((p: any) => ({ slug: p.slug }))
  try {
    const slugs = await sanityGetPostSlugs()
    return slugs.length > 0 ? slugs : staticPosts.map((p: any) => ({ slug: p.slug }))
  } catch {
    return staticPosts.map((p: any) => ({ slug: p.slug }))
  }
}

export async function getPost(slug: string) {
  if (!sanityConfigured) return staticPosts.find((p: any) => p.slug === slug) || null
  try {
    const post = await sanityGetPostBySlug(slug)
    return post || staticPosts.find((p: any) => p.slug === slug) || null
  } catch {
    return staticPosts.find((p: any) => p.slug === slug) || null
  }
}

// ── Projects ──

export async function getProjects() {
  if (!sanityConfigured) return staticProjects
  try {
    const projects = await sanityGetAllProjects()
    return projects.length > 0 ? projects : staticProjects
  } catch {
    return staticProjects
  }
}

export const postCategories = ['All', 'Automation', 'AI Engineering', 'Career', 'Data']
export const projectCategories = staticCategories