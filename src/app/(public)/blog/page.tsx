import { getBlogPosts } from "@/lib/data";
import BlogPageContent from "@/components/public/BlogPageContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Dr. Bruno Aparecido",
  description: "Artigos sobre saúde bucal, dicas e novidades do Dr. Bruno Aparecido.",
};

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const posts = await getBlogPosts();
  return <BlogPageContent posts={posts} />;
}
