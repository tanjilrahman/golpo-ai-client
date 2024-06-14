"use client";

import React, { useState } from "react";
import { Button, Card, CardBody } from "@nextui-org/react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import SideBar from "../components/SideBar";
import { Textarea } from "@nextui-org/react";
import { PiMagicWand } from "react-icons/pi";
import { IoSparkles } from "react-icons/io5";
import Image from "next/image";
import MoreOptions from "../components/MoreOptions";
import { SuggestedPlot } from "@/types";
import GenerationProgress from "../components/GenerationProgress";
import toast, { Toaster } from "react-hot-toast";
import PlotCardSkeleton from "../components/ui/PlotCardSkeleton";
import MiniHeader from "../components/ui/MiniHeader";

function Golpo() {
  const { userId, getToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const [loadingPlot, setLoadingPlot] = useState(false);
  const [plot, setPlot] = useState("");
  const [selectedOptions, setSelectedOptions] = useState({
    language: "bangla",
    storyType: "bedtime-story",
    readerAge: "4-6",
    writingStyle: "imaginative",
    isSuperStory: false,
  });
  const [suggestedPlot, setSuggestedPlot] = useState<SuggestedPlot[] | []>([]);
  const router = useRouter();

  const generatePlot = async () => {
    try {
      setLoadingPlot(true);
      setSuggestedPlot([]);
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/api/plot/generate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await getToken()}`,
          },
          body: JSON.stringify({
            options: selectedOptions,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setSuggestedPlot(data.plots);
      } else {
        console.error(data.message);
        toast.error(data.message);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingPlot(false);
    }
  };

  const generateStory = async (plot: string) => {
    if (!userId) return router.push("?m=signin");
    if (!plot) return toast.error("Plot can't be empty");
    try {
      setLoading(true);
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/api/story/generate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await getToken()}`,
          },
          body: JSON.stringify({
            plot: plot,
            options: selectedOptions,
          }),
        }
      );
      const data = await response.json();
      if (data.success) {
        toast.success("Story created! Redirecting...");
        router.push("/golpo/" + data.storyId);
      } else {
        console.error(data.message);
        toast.error(data.message);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex">
      <SideBar pathname="/golpo" />

      <div className="py-16 md:pb-20 mx-auto w-full bg-default-50 relative">
        {/* <MiniHeader /> */}
        <div className="relative z-1 max-w-[62rem] mx-auto text-center mb-4 md:mb-10">
          <h1 className="mb-3 md:mb-5 text-3xl md:text-4xl lg:text-5xl font-semibold">
            Create a{" "}
            <span className="relative inline-block">
              New Story{" "}
              <Image
                src="/curve.png"
                className="absolute left-0 w-full top-full xl:-mt-2"
                width={624}
                height={28}
                alt="Curve"
              />
            </span>
          </h1>
          <p className="max-w-3xl mx-auto mb-4 lg:mb-8 text-lg">
            Every good story starts with a good idea
          </p>
        </div>
        <div className="w-full p-4 md:w-[800px] mx-auto">
          <div className="flex justify-center my-auto space-x-2  h-28 bg-default-50 border border-secondary/20 p-2 rounded-[19px] shadow-lg shadow-secondary-100">
            <Textarea
              value={plot}
              onChange={(e) => setPlot(e.target.value)}
              label={
                <p className="flex items-center text-secondary font-semibold h-full text-base">
                  <IoSparkles className="mr-1" />
                  Generate
                </p>
              }
              placeholder="Write a golpo plot..."
              className="text-xl"
              isDisabled={loading}
            />
            <Button
              isDisabled={loading}
              className="h-full mx-0 bg-secondary-500 px-0 gap-0 min-w-14 shadow-secondary-200 shadow-md"
              onClick={() => generateStory(plot)}
            >
              <PiMagicWand size={25} className="text-white" />
            </Button>
          </div>
          <div>
            <MoreOptions
              loading={loading}
              generatePlot={generatePlot}
              selectedOptions={selectedOptions} // Pass entire options object
              setSelectedOptions={setSelectedOptions}
            />
          </div>
          {(suggestedPlot.length > 0 || loadingPlot) && (
            <div className="p-4">
              <p className="font-semibold text-xl mb-4">Suggested stories</p>
              <div className="flex flex-col md:flex-row items-center gap-4">
                {suggestedPlot?.map((plotObj, i) => (
                  <Card className="bg-default-100 p-2" key={i}>
                    <CardBody className="gap-2 md:gap-4">
                      <div className="flex items-center justify-between">
                        <p className="font-bold text-lg">{plotObj.title}</p>{" "}
                        <Button
                          isDisabled={loading}
                          onClick={() => generateStory(plotObj.plot)}
                          variant="ghost"
                          size="sm"
                        >
                          Generate
                        </Button>
                      </div>
                      <p className="text-sm">{plotObj.plot}</p>
                    </CardBody>
                  </Card>
                ))}
              </div>
              {loadingPlot && (
                <div className="flex flex-col md:flex-row items-center gap-4">
                  {[...Array(2)].map((e, i) => (
                    <PlotCardSkeleton key={i} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <GenerationProgress
          loading={loading}
          isSuperStory={selectedOptions.isSuperStory}
        />
      </div>
    </div>
  );
}

export default Golpo;
