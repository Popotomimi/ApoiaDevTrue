import { DonationTable } from "./_components/donates";
import { Stats } from "./_components/analytics";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getLoginOnboardAccount } from "./_data-access/create-onboard-account";
import CreateAccountButton from "./_components/create-account-button";

export default async function Dashboard() {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  const accountUrl = await getLoginOnboardAccount(
    session.user.connectedStripeAccount ?? undefined
  );

  return (
    <div className="p-4">
      <section className="flex items-center justify-between mb-4">
        <div className="w-full flex items-center gap-2 justify-between">
          <h1 className="text-2xl font-semibold">Minha conta</h1>
          {accountUrl && (
            <a
              className="bg-zinc-900 px-4 py-1 rounded-md cursor-pointer text-white"
              href={accountUrl}>
              Ajustar conta{" "}
            </a>
          )}
        </div>
      </section>

      {!session.user.connectedStripeAccount && <CreateAccountButton />}

      <Stats />

      <h2 className="text-2xl font-semibold mb-2">Últimas doações</h2>
      <DonationTable />
    </div>
  );
}
