import { Chapter } from "@/types";
import { Image } from "@nextui-org/react";
import React from "react";
import NextImage from "next/image";

function SuperStory({
  chapters,
  images,
}: {
  chapters: Chapter[];
  images: string[];
}) {
  return (
    <div>
      {chapters.map((chapter, i) => (
        <div key={i}>
          <h4 className="my-2 md:my-6 text-4xl lg:text-5xl xl:text-6xl font-semibold">
            পর্ব {i + 1} - {chapter.title}
          </h4>
          <Image
            isBlurred
            as={NextImage}
            alt={chapter.title}
            src={images[i]}
            width={1024}
            height={1024}
            className="w-full h-full my-6 md:my-10 rounded-3xl overflow-hidden object-cover"
          />
          {chapter.story.map((paragraph, j) => (
            <div key={j}>
              <p className="mx-auto mb-6 text-lg md:text-xl md:leading-relaxed lg:mb-8">
                {paragraph}
              </p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default SuperStory;
