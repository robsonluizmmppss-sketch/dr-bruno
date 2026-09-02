import { getDashboardStats } from "@/lib/data";
import DashboardContent from "@/components/admin/DashboardContent";

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();
  return <DashboardContent stats={stats} />;
}
