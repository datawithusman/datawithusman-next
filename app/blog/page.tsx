import { getPosts } from '@/sanity/lib';
import BlogPageClient from '@/components/BlogPageClient';

export default async function BlogPage() {
  const posts = await getPosts();
  return <BlogPageClient posts={posts} />;
}