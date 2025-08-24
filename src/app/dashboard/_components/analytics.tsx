import { Users, DollarSign, Wallet } from "lucide-react";
import { StatCard } from "./stats-card";
import { getStats } from "../_data-access/get-stats-creator";
import { formatCurrency } from "@/utils/format";

export async function Stats({
  userId,
  stripeAccountId,
}: {
  userId: string;
  stripeAccountId: string;
}) {
  const { balance, totalAmountResult, totalQtdDonations } = await getStats(
    userId,
    stripeAccountId
  );

  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-3 mb-6">
      <StatCard
        title="Apoiadores"
        description="Total de apoiadores"
        icon={<Users className="w-8 h-8 text-blue-400" />}
        value={totalQtdDonations ?? 0}
      />

      <StatCard
        title="Total recebido"
        description="Quantidade total recebida"
        icon={<DollarSign className="w-8 h-8 text-amber-500" />}
        value={formatCurrency((totalAmountResult ?? 0) / 100)}
      />

      <StatCard
        title="Saldo em conta"
        description="Saldo pendente"
        icon={<Wallet className="w-8 h-8 text-green-500" />}
        value={formatCurrency((balance ?? 0) / 100)}
      />
    </div>
  );
}
