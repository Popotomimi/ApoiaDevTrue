import { Card } from "@/components/ui/card";
import { ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
      <div className="flex items-center justify-center bg-amber-100 rounded-full mx-auto w-14 h-14">
        {icon}
      </div>
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-gray-500 text-sm">{description}</p>
    </Card>
  );
}
