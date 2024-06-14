import SideBar from "@/app/components/SideBar";
import { Author, Story } from "@/types";
import { Button, User } from "@nextui-org/react";
import dayjs from "dayjs";
import NextImage from "next/image";
import { Image } from "@nextui-org/react";
import React from "react";
import localizedFormat from "dayjs/plugin/localizedFormat";
import SuperStory from "@/app/components/SuperStory";
import AudioPlayer from "@/app/components/AudioPlayer";
import DeleteButton from "@/app/components/DeleteButton";
import { auth } from "@clerk/nextjs/server";
async function GolpoPage({ params }: { params: { id: string } }) {
  const { userId } = auth();
  dayjs.extend(localizedFormat);
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/api/story/" + params.id
  );
  const data = await response.json();
  const story: Story & Author = data.story;

  const middle = (length: number) => {
    return Math.round(length / 2) - 1;
  };

  if (!data.success) return <h1>{data.message}</h1>;

  return (
    <div className="flex">
      <SideBar pathname="" />

      <div className="w-full mx-auto bg-default-50">
        <div className="max-w-4xl mx-auto mt-4 md:mt-0">
          <div className="p-6">
            <div className="items-center justify-between mt-8 mb-6 md:mb-10 md:flex">
              <User
                name={<p className="text-base ml-1">{story.author.name}</p>}
                description={
                  <p className="text-sm ml-1">
                    Published at {dayjs(story.createdAt).format("LL")}
                  </p>
                }
                avatarProps={{
                  src: story.author.imageUrl,
                  size: "md",
                  isBordered: true,
                }}
                className="text-lg"
              />
              <div className="mt-3 items-center gap-2 md:gap-3 flex md:mt-0">
                <AudioPlayer storyId={params.id} url={story.audioUrl || ""} />
                {story.authorId === userId && (
                  <DeleteButton storyId={params.id} />
                )}
              </div>
            </div>
            <h3 className="my-2 md:my-6 text-4xl lg:text-5xl xl:text-6xl font-semibold">
              {story.chapters[0].title}
            </h3>
            <div>
              {story.isSuperStory ? (
                <SuperStory chapters={story.chapters} images={story.images} />
              ) : (
                story.chapters[0].story.map((paragraph, i) => (
                  <div key={i}>
                    <p className="mx-auto mb-6 text-lg md:text-xl md:leading-relaxed lg:mb-8">
                      {paragraph}
                    </p>
                    {i === 0 && (
                      <Image
                        isBlurred
                        as={NextImage}
                        alt={story.chapters[0].title}
                        src={story.images[0]}
                        width={1024}
                        height={1024}
                        className="w-full h-full my-6 md:my-10 rounded-3xl overflow-hidden object-cover"
                      />
                    )}
                    {i === middle(story.chapters[0].story.length) - 1 && (
                      <Image
                        isBlurred
                        as={NextImage}
                        alt={story.chapters[0].title}
                        src={story.images[1]}
                        width={1024}
                        height={1024}
                        className="w-full h-full my-6 md:my-10 rounded-3xl overflow-hidden object-cover"
                      />
                    )}
                    {i === story.chapters[0].story.length - 3 && (
                      <Image
                        isBlurred
                        as={NextImage}
                        alt={story.chapters[0].title}
                        src={story.images[2]}
                        width={1024}
                        height={1024}
                        className="w-full h-full my-6 md:my-10 rounded-3xl overflow-hidden object-cover"
                      />
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="w-2/3 mx-auto border-t border-divider" />
          <div className="flex justify-center items-center my-8 ">
            <p className="font-semibold font-serif text-2xl italic text-default-300">
              The End
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GolpoPage;
