import { RealizationEditor } from "@/components/admin/RealizationEditor";

export const instant = false;

export default function NewRealizationPage() {
  return (
    <div>
      <h1 className="font-display text-3xl font-semibold text-navy">
        Nowa realizacja
      </h1>
      <div className="card-surface mt-6 p-6">
        <RealizationEditor />
      </div>
    </div>
  );
}
