import { getBlogPostBySlug, getBlogPosts } from "@/lib/data";
import { notFound } from "next/navigation";
import BlogPostContent from "@/components/public/BlogPostContent";
import type { Metadata } from "next";

export async function generateStaticParams() {
  try {
    const posts = await getBlogPosts();
    return posts.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.seoTitle || `${post.title} | Dr. Bruno Aparecido`,
    description: post.seoDescription || post.excerpt,
  };
}

export const dynamic = "force-dynamic";

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post || post.status !== "published") notFound();
  return <BlogPostContent post={post} />;
}
