"use client";

import { User, Shield } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface UserItem {
  id: string;
  name: string | null;
  email: string;
  role: string;
  createdAt: Date;
}

export default function UsersAdmin({ users }: { users: UserItem[] }) {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#07141C]">Usuários</h1>
        <p className="text-sm text-[#0B2029]/50 mt-1">Usuários com acesso ao painel</p>
      </div>

      <div className="space-y-2">
        {users.map((user) => (
          <div key={user.id} className="bg-white rounded-xl p-4 border border-[#E7EEF1] flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#123B48] flex items-center justify-center shrink-0">
              <User className="w-5 h-5 text-[#35B6C8]" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-sm text-[#07141C]">{user.name || "Sem nome"}</h3>
              <p className="text-xs text-[#0B2029]/40">{user.email}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#35B6C8]/10 text-[#1B6878] text-xs font-medium rounded-lg">
                <Shield className="w-3 h-3" /> {user.role}
              </span>
              <span className="text-xs text-[#0B2029]/30">{formatDate(user.createdAt)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
