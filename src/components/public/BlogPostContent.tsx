"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { BlogPost } from "@/types";

export default function BlogPostContent({ post }: { post: BlogPost }) {
  return (
    <>
      <section className="pt-32 pb-16 bg-gradient-to-b from-[#07141C] to-[#0B2029]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link href="/blog" className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Voltar ao blog
            </Link>
            <div className="flex flex-wrap items-center gap-3 text-sm text-white/40 mb-4">
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {post.publishedAt ? formatDate(post.publishedAt) : formatDate(post.createdAt)}</span>
              <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> {post.author}</span>
              {post.category && <span className="px-2 py-0.5 bg-[#1B7A8A]/10 text-[#1B7A8A] rounded-lg text-xs">{post.category}</span>}
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">{post.title}</h1>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {post.coverImage && (
            <div className="relative w-full h-[300px] sm:h-[400px] rounded-2xl overflow-hidden mb-10 -mt-20">
              <Image src={post.coverImage} alt={post.title} fill className="object-cover" sizes="100vw" priority />
            </div>
          )}
          <article className="rich-content text-[#0B2029]/70" dangerouslySetInnerHTML={{ __html: post.content }} />
          {post.tags && (
            <div className="flex flex-wrap gap-2 mt-10 pt-6 border-t border-[#E7EEF1]">
              {post.tags.split(",").map((tag) => (
                <span key={tag.trim()} className="px-3 py-1 bg-[#F7FAFC] text-[#0B2029]/60 text-xs rounded-lg border border-[#E7EEF1]">
                  {tag.trim()}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
