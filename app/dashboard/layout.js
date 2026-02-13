import DashboardHeader from "@/app/_components/DashboardHeader";
import Sidebar from "@/app/_components/Sidebar";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Dashboard",
  description:
    "Real-time analytics dashboard for AI token usage, cost monitoring, and workforce insights.",
};

export default async function DashboardLayout({ children }) {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-1 overflow-x-hidden">
        <DashboardHeader />

        <main className="p-6 bg-(--bg)">{children}</main>
      </div>
    </div>
  );
}
