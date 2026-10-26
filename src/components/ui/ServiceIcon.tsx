import {
  Bike,
  Car,
  Coffee,
  Laptop,
  MonitorSpeaker,
  Wrench,
  type LucideIcon,
} from "lucide-react";

const map: Record<string, LucideIcon> = {
  coffee: Coffee,
  car: Car,
  tv: MonitorSpeaker,
  bike: Bike,
  tool: Wrench,
  laptop: Laptop,
};

export function ServiceIcon({
  name,
  className = "size-6",
}: {
  name: string;
  className?: string;
}) {
  const Icon = map[name] ?? Wrench;
  return <Icon className={className} aria-hidden strokeWidth={1.75} />;
}
