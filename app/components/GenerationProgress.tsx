import { Progress } from "@nextui-org/react";
import React, { useEffect, useState } from "react";

function GenerationProgress({
  loading,
  isSuperStory,
}: {
  loading: boolean;
  isSuperStory: boolean;
}) {
  const [filled, setFilled] = useState(0);
  useEffect(() => {
    if (filled <= 100 && loading) {
      setTimeout(
        () => setFilled((prev) => (prev += 0.1)),
        isSuperStory ? 300 : 50
      );
    }
  }, [filled, loading]);
  if (loading) {
    return (
      <div className="fixed bottom-0 left-0 w-full bg-background border-t border-divider rounded-t-3xl">
        <div className="py-4 md:py-6 mx-auto flex justify-center items-center flex-col">
          <Progress
            label={
              <div className="flex justify-between">
                <p>
                  {filled < 40 && "Generating story..."}
                  {filled >= 40 && filled < 99 && "Generating story images..."}
                  {filled >= 99 && "Finishing up..."}
                </p>
              </div>
            }
            classNames={{
              track: "drop-shadow-md border border-default",
              indicator: "bg-gradient-to-r from-pink-500 to-yellow-500",
              label: "tracking-wider font-semibold text-default-600",
              value: "text-foreground/60",
            }}
            isIndeterminate={filled >= 99}
            value={filled}
            className="w-full md:w-[500px] px-8"
          />
          {isSuperStory && (
            <p className="font-normal text-xs text-default-600 mt-3 max-w-96 text-center px-4">
              Super story takes longer to generate, you can come back later and
              find it in your library
            </p>
          )}
        </div>
      </div>
    );
  }
}

export default GenerationProgress;
