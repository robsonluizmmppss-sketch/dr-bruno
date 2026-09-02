import { getBlogPosts } from "@/lib/data";
import BlogAdmin from "@/components/admin/BlogAdmin";

export default async function BlogAdminPage() {
  const posts = await getBlogPosts(false);
  return <BlogAdmin posts={posts} />;
}
