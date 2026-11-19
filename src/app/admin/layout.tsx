import { AdminShell } from "@/components/admin/AdminShell";
import { isAuthenticated } from "@/lib/auth";
import { requireDynamic } from "@/lib/dynamic";

export const instant = false;

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireDynamic();
  const authed = await isAuthenticated();

  // Login page renders without shell
  if (!authed) {
    return children;
  }

  return <AdminShell>{children}</AdminShell>;
}
