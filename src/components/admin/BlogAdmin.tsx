"use client";

import { useState, useTransition } from "react";
import { Plus, Edit2, Trash2, Check, X, FileText, Eye } from "lucide-react";
import { createBlogPost, updateBlogPost, deleteBlogPost } from "@/actions/admin";
import AdminFormField from "./AdminFormField";
import { formatDate } from "@/lib/utils";
import type { BlogPost } from "@/types";

export default function BlogAdmin({ posts: initial }: { posts: BlogPost[] }) {
  const [posts, setPosts] = useState(initial);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [form, setForm] = useState({
    title: "", excerpt: "", content: "", coverImage: "", category: "Saúde Bucal",
    tags: "", status: "draft", seoTitle: "", seoDescription: "",
  });

  function handleChange(name: string, value: string) {
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function startEdit(post: BlogPost) {
    setEditingId(post.id);
    setForm({
      title: post.title, excerpt: post.excerpt, content: post.content,
      coverImage: post.coverImage || "", category: post.category, tags: post.tags,
      status: post.status, seoTitle: post.seoTitle || "", seoDescription: post.seoDescription || "",
    });
  }

  function handleCreate() {
    startTransition(async () => {
      await createBlogPost(form);
      setShowCreate(false);
      setForm({ title: "", excerpt: "", content: "", coverImage: "", category: "Saúde Bucal", tags: "", status: "draft", seoTitle: "", seoDescription: "" });
      window.location.reload();
    });
  }

  function handleUpdate(id: string) {
    startTransition(async () => {
      await updateBlogPost(id, form);
      setEditingId(null);
      window.location.reload();
    });
  }

  function handleDelete(id: string) {
    if (!confirm("Excluir post?")) return;
    startTransition(async () => {
      await deleteBlogPost(id);
      setPosts((prev) => prev.filter((p) => p.id !== id));
    });
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#07141C]">Blog</h1>
          <p className="text-sm text-[#0B2029]/50 mt-1">Gerencie os artigos do blog</p>
        </div>
        <button onClick={() => { setShowCreate(true); setForm({ title: "", excerpt: "", content: "", coverImage: "", category: "Saúde Bucal", tags: "", status: "draft", seoTitle: "", seoDescription: "" }); }} className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#35B6C8] hover:bg-[#1B6878] text-white text-sm font-medium rounded-xl transition-all">
          <Plus className="w-4 h-4" /> Novo Post
        </button>
      </div>

      {(showCreate || editingId) && (
        <div className="bg-white rounded-2xl p-6 border border-[#E7EEF1] mb-6">
          <h3 className="font-semibold text-[#07141C] mb-4">{editingId ? "Editar" : "Novo"} Post</h3>
          <div className="space-y-4">
            <AdminFormField label="Título" name="title" value={form.title} onChange={handleChange} />
            <AdminFormField label="Resumo" name="excerpt" value={form.excerpt} onChange={handleChange} type="textarea" rows={2} />
            <AdminFormField label="Conteúdo (HTML)" name="content" value={form.content} onChange={handleChange} type="textarea" rows={10} />
            <AdminFormField label="Imagem de capa" name="coverImage" value={form.coverImage} onChange={handleChange} type="image" />
            <div className="grid sm:grid-cols-3 gap-4">
              <AdminFormField label="Categoria" name="category" value={form.category} onChange={handleChange} />
              <AdminFormField label="Tags (separadas por vírgula)" name="tags" value={form.tags} onChange={handleChange} />
              <AdminFormField label="Status" name="status" value={form.status} onChange={handleChange} type="select" options={[
                { label: "Rascunho", value: "draft" }, { label: "Publicado", value: "published" },
              ]} />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <AdminFormField label="SEO Title" name="seoTitle" value={form.seoTitle} onChange={handleChange} />
              <AdminFormField label="SEO Description" name="seoDescription" value={form.seoDescription} onChange={handleChange} />
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={() => editingId ? handleUpdate(editingId) : handleCreate()} disabled={isPending || !form.title} className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#35B6C8] hover:bg-[#1B6878] text-white text-sm font-medium rounded-xl transition-all disabled:opacity-50">
                <Check className="w-4 h-4" /> {isPending ? "Salvando..." : "Salvar"}
              </button>
              <button onClick={() => { setShowCreate(false); setEditingId(null); }} className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#F7FAFC] text-[#0B2029]/60 text-sm rounded-xl hover:bg-[#E7EEF1] transition-all">
                <X className="w-4 h-4" /> Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-xl p-4 border border-[#E7EEF1] flex items-center gap-4">
            <FileText className={`w-5 h-5 shrink-0 ${post.status === "published" ? "text-green-500" : "text-[#0B2029]/30"}`} />
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-sm text-[#07141C]">{post.title}</h3>
              <div className="flex items-center gap-2 mt-0.5">
                <span className={`text-xs px-2 py-0.5 rounded-full ${post.status === "published" ? "bg-green-50 text-green-600" : "bg-amber-50 text-amber-600"}`}>
                  {post.status === "published" ? "Publicado" : "Rascunho"}
                </span>
                <span className="text-xs text-[#0B2029]/40">{formatDate(post.createdAt)}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {post.status === "published" && (
                <a href={`/blog/${post.slug}`} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg hover:bg-[#F7FAFC]"><Eye className="w-4 h-4 text-[#35B6C8]" /></a>
              )}
              <button onClick={() => startEdit(post)} className="p-2 rounded-lg hover:bg-[#F7FAFC]"><Edit2 className="w-4 h-4 text-[#0B2029]/40" /></button>
              <button onClick={() => handleDelete(post.id)} className="p-2 rounded-lg hover:bg-red-50"><Trash2 className="w-4 h-4 text-red-400" /></button>
            </div>
          </div>
        ))}
        {posts.length === 0 && <p className="text-center text-[#0B2029]/40 py-8">Nenhum post cadastrado.</p>}
      </div>
    </div>
  );
}
