import Image from "next/image";
import React from "react";
import SideBar from "../components/SideBar";
import CharactersBody from "../components/CharactersBody";
import { cookies } from "next/headers";

async function CharactersPage() {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/api/character/all",
    {
      headers: {
        Cookie: cookies().toString(),
      },
    }
  );
  const data = await response.json();
  const characters = data.characters;

  if (!data.success) return <p>{data.message}</p>;
  return (
    <div className="flex">
      <SideBar pathname={"/characters"} />
      <div className="w-full bg-default-50">
        <div className="relative z-1 max-w-[62rem] mx-auto text-center mt-12 mb-8 md:mb-10">
          <h1 className="mb-5 text-5xl font-semibold">
            <span className="relative inline-block">
              Characters
              <Image
                src="/curve.png"
                className="absolute left-0 w-full top-full xl:-mt-2"
                width={624}
                height={28}
                alt="Curve"
              />
            </span>{" "}
          </h1>
        </div>
        <div className="mx-6 md:mx-10">
          {/* <p>No character found</p> */}
          <CharactersBody serverCharacters={characters} />
        </div>
      </div>
    </div>
  );
}

export default CharactersPage;
