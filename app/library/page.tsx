import { Author, Story } from "@/types";
import { cookies } from "next/headers";
import Image from "next/image";
import React from "react";
import SideBar from "../components/SideBar";
import StoryCard from "../components/StoryCard";

async function Library() {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/api/stories/library",
    {
      headers: {
        Cookie: cookies().toString(),
      },
    }
  );
  const data = await response.json();
  const stories: (Story & Author)[] = data.stories;

  if (!data.success) return <p>{data.message}</p>;

  return (
    <div className="flex">
      <SideBar pathname={"/library"} />
      <div className="w-full bg-default-50">
        <div className="relative z-1 max-w-[62rem] mx-auto text-center mt-16 mb-6 md:mb-10">
          <h1 className="mb-3 md:mb-5 text-3xl md:text-4xl lg:text-5xl font-semibold">
            The{" "}
            <span className="relative inline-block">
              Bookworm’s
              <Image
                src="/curve.png"
                className="absolute left-0 w-full top-full xl:-mt-2"
                width={624}
                height={28}
                alt="Curve"
              />
            </span>{" "}
            Nook
          </h1>
          <p className="max-w-3xl mx-auto mb-4 lg:mb-8 text-lg">
            Find all of your creations
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 md:gap-6 lg:gap-8 mb-10 md:grid-cols-3 xl:grid-cols-4 mx-6 md:mx-10">
          {stories.length > 0 ? (
            stories.map((story, i) => <StoryCard key={i} story={story} />)
          ) : (
            <p>No Stories Found!</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Library;
