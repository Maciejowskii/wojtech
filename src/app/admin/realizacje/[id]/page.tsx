import { notFound } from "next/navigation";
import { AdminDbMissing } from "@/components/admin/AdminDbMissing";
import { RealizationEditor } from "@/components/admin/RealizationEditor";
import { tryGetDb } from "@/lib/db";
import { requireDynamic } from "@/lib/dynamic";
import { getRealizationById } from "@/lib/realizations-db";

export const instant = false;

type Props = { params: Promise<{ id: string }> };

export default async function EditRealizationPage({ params }: Props) {
  await requireDynamic();
  const db = await tryGetDb();
  if (!db) return <AdminDbMissing />;
  const { id } = await params;
  const item = await getRealizationById(id);
  if (!item) notFound();

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold text-navy">
        Edycja realizacji
      </h1>
      <div className="card-surface mt-6 p-6">
        <RealizationEditor initial={item} />
      </div>
    </div>
  );
}
