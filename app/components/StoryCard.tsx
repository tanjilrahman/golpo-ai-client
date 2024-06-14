import { Story } from "@/types";
import { Button, Card, CardFooter, CardHeader, Image } from "@nextui-org/react";
import NextImage from "next/image";
import Link from "next/link";
import React from "react";

function StoryCard({ story }: { story: Story }) {
  return (
    <Link href={`/golpo/${story.id}`}>
      <Card isFooterBlurred className="border-none rounded-3xl">
        {story.isSuperStory && (
          <CardHeader className="absolute top-0 right-0 z-20 flex justify-end">
            <p className="text-xs md:text-sm py-1 rounded-full px-3 font-semibold text-white bg-primary border border-divider">
              Super
            </p>
          </CardHeader>
        )}

        <Image
          isZoomed
          isBlurred
          as={NextImage}
          src={story.images[0]}
          width={512}
          height={512}
          alt={story.chapters[0].title}
          className="object-cover w-full h-full rounded-3xl"
        />
        <CardFooter className=" before:bg-white/50 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-3xl rounded-3xl bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10 h-8 md:h-10 lg:h-12 bg-default-500/50">
          <p className="w-full text-sm md:text-lg lg:text-xl text-center font-semibold text-white/80">
            {story.chapters[0].title}
          </p>
          {/* <Button
            className="text-tiny text-white bg-black/20 rounded-full"
            variant="flat"
            color="default"
            size="sm"
          >
            Notify me
          </Button> */}
        </CardFooter>
      </Card>
    </Link>
  );
}

export default StoryCard;
