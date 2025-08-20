import Image from "next/image";
import { getInfoUser } from "./_data-access/get-info-user";
import { notFound } from "next/navigation";
import FormDonate from "./_components/form";

export default async function Apoia({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  const user = await getInfoUser({ username });

  if (!user) {
    notFound();
  }

  return (
    <div className=" min-h-[calc(100vh-64px)]">
      <div className="w-full h-64 relative bg-black">
        <Image
          src={user.image ?? "https://github.com/devfraga.png"}
          alt="Banner"
          fill
          className="object-cover opacity-50"
          priority
          quality={100}
        />
      </div>

      <section className="flex flex-col w-full items-center justify-center mx-auto max-w-7xl p-4 relative">
        <div className="flex flex-col items-center">
          <Image
            src={user.image ?? "https://github.com/devfraga.png"}
            className="w-36 h-36 rounded-xl bg-gray-50 hover:shadow-lg duration-300 select-none text-zinc-900 text-3xl flex items-center justify-center object-cover absolute -top-16 border-4 border-white"
            alt="Matheus Fraga"
            width={96}
            height={96}
            quality={100}
          />
          <h1 className=" font-bold text-xl md:text-2xl mt-20 mb-4">
            {user.name ?? "Sem nome definido"}
          </h1>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 w-full mx-auto gap-4 max-w-5xl">
        <section className="flex flex-col bg-gray-50 p-5 rounded-md h-fit mx-2">
          <p className="font-semibold text-lg">Sobre {user.name ?? ""}</p>
          <p className="text-gray-500 mt-2">
            {user.bio ??
              "Sem biografia definida. Você pode definir na aba de configurações"}
          </p>
        </section>

        <section className="bg-gray-50 rounded-md p-5 h-fit mx-2">
          <h3 className="font-semibold text-lg">
            {user.name ? `Apoiar ${user.name}` : "Apoiar Criador"}
          </h3>

          <FormDonate slug={user.username!} creatorId={user.id} />
        </section>
      </div>
    </div>
  );
}
