import { AdminShell } from "@/components/admin/AdminShell";
import { isAuthenticated } from "@/lib/auth";

export const instant = false;

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authed = await isAuthenticated();

  // Login page renders without shell
  if (!authed) {
    return children;
  }

  return <AdminShell>{children}</AdminShell>;
}
