import { prisma } from "@/lib/prisma";
import UsersAdmin from "@/components/admin/UsersAdmin";

export default async function UsersAdminPage() {
  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true, role: true, createdAt: true },
    orderBy: { createdAt: "desc" },
  });
  return <UsersAdmin users={users} />;
}
