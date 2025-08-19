import Image from "next/image";
import Name from "./name";
import Description from "./description";

interface CardProfileProps {
  user: {
    id: string;
    name: string | null;
    username: string | null;
    bio: string | null;
    image: string | null;
  };
}

const CardProfile = ({ user }: CardProfileProps) => {
  return (
    <div>
      <section className="w-full flex flex-col items-center mx-auto px-4">
        <div className="">
          <Image
            src={
              user.image ??
              "https://avatars.githubusercontent.com/u/16872945?v=4"
            }
            alt="Foto de perfil"
            width={100}
            height={100}
            className="rounded-full bg-gray-50 object-cover border-4 border-white hover:shadow-xl duration-300"
            priority
            quality={100}
          />
        </div>
        <div>
          <Name initialName={user.name ?? "Digite seu nome..."} />
          <Description initialDescription={user.bio ?? ""} />
        </div>
      </section>
    </div>
  );
};

export default CardProfile;
