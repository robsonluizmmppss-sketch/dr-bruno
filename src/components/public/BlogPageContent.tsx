"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { BlogPost } from "@/types";

export default function BlogPageContent({ posts }: { posts: BlogPost[] }) {
  return (
    <>
      <section className="pt-32 pb-16 bg-gradient-to-b from-[#07141C] to-[#0B2029]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-[#1B7A8A] text-sm font-medium uppercase tracking-wider">Blog</span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mt-2">Artigos e Dicas</h1>
            <p className="text-white/50 mt-3">Conteúdos sobre saúde bucal, cuidados e novidades.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post, i) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link href={`/blog/${post.slug}`} className="group block h-full bg-[#F7FAFC] rounded-2xl overflow-hidden border border-[#E7EEF1] hover:border-[#1B7A8A]/20 hover:shadow-xl hover:shadow-[#1B7A8A]/5 transition-all duration-300">
                    {post.coverImage ? (
                      <div className="relative w-full h-48 overflow-hidden">
                        <Image src={post.coverImage} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 640px) 100vw, 33vw" />
                      </div>
                    ) : (
                      <div className="w-full h-48 bg-gradient-to-br from-[#123B48] to-[#0B2029]" />
                    )}
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-xs text-[#0B2029]/40 mb-3">
                        <Calendar className="w-3.5 h-3.5" />
                        {post.publishedAt ? formatDate(post.publishedAt) : formatDate(post.createdAt)}
                        {post.category && <span className="px-2 py-0.5 bg-[#1B7A8A]/10 text-[#1B7A8A] rounded-lg">{post.category}</span>}
                      </div>
                      <h3 className="font-semibold text-[#07141C] mb-2 group-hover:text-[#1B6878] transition-colors line-clamp-2">{post.title}</h3>
                      <p className="text-sm text-[#0B2029]/60 line-clamp-3 mb-4">{post.excerpt}</p>
                      <span className="inline-flex items-center gap-1 text-sm text-[#1B7A8A] font-medium">
                        Ler mais <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-center text-[#0B2029]/40 py-12">Nenhum artigo publicado ainda.</p>
          )}
        </div>
      </section>
    </>
  );
}
