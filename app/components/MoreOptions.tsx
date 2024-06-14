import {
  languages,
  readerAges,
  storyTypes,
  writingStyles,
} from "@/storyOptions";
import { StoryOptions } from "@/types";
import {
  Button,
  Chip,
  Select,
  SelectItem,
  Switch,
  cn,
} from "@nextui-org/react";
import React, { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { HiSparkles } from "react-icons/hi2";

const MoreOptions = ({
  generatePlot,
  selectedOptions,
  setSelectedOptions,
  loading,
}: {
  generatePlot: () => void;
  selectedOptions: StoryOptions;
  setSelectedOptions: React.Dispatch<React.SetStateAction<StoryOptions>>;
  loading: boolean;
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const handleOptionChange = <T extends string>(
    event: React.ChangeEvent<HTMLSelectElement>,
    optionType: T
  ) => {
    setSelectedOptions({
      ...selectedOptions,
      [optionType]: event.target.value as T,
    });
  };

  const toggleExpand = () => {
    setIsExpanded((prevIsExpanded) => !prevIsExpanded);
  };

  return (
    <div className="flex flex-col p-4">
      <div className="flex items-center justify-between">
        <button
          className="flex items-center text-sm text-content4-foreground/60"
          onClick={toggleExpand}
        >
          More Options{" "}
          {isExpanded ? (
            <MdKeyboardArrowUp size={22} className="ml-1" />
          ) : (
            <MdKeyboardArrowDown size={22} className="ml-1" />
          )}
        </button>
        <Button
          isDisabled={loading}
          variant="faded"
          className="flex items-center gap-1"
          onClick={generatePlot}
        >
          Suggest stories <HiSparkles size={15} className="text-yellow-500" />
        </Button>
      </div>

      <div
        className={`mt-4 ${
          isExpanded ? "opacity-100 h-full" : "opacity-0 h-0"
        } transition-all duration-300`}
      >
        <div className="mt-4 md:mt-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex gap-4 w-full">
              <Select
                labelPlacement="outside"
                label="Language"
                placeholder="Select a language"
                defaultSelectedKeys={["bangla"]}
                value={selectedOptions.language}
                onChange={(event) =>
                  handleOptionChange<"language">(event, "language")
                }
                isDisabled={!isExpanded || loading}
                disallowEmptySelection={true}
              >
                {languages.map((language) => (
                  <SelectItem key={language.value} value={language.value}>
                    {language.label}
                  </SelectItem>
                ))}
              </Select>
              <Select
                labelPlacement="outside"
                label="Story type"
                placeholder="Select a story type"
                defaultSelectedKeys={["bedtime-story"]}
                value={selectedOptions.storyType}
                onChange={(event) =>
                  handleOptionChange<"storyType">(event, "storyType")
                }
                isDisabled={!isExpanded || loading}
                disallowEmptySelection={true}
              >
                {storyTypes.map((storyType) => (
                  <SelectItem
                    key={storyType.value}
                    value={storyType.value}
                    description={storyType.description}
                  >
                    {storyType.label}
                  </SelectItem>
                ))}
              </Select>
            </div>
            <div className="flex gap-4 w-full">
              <Select
                labelPlacement="outside"
                label="Reader age"
                placeholder="Select a age group"
                defaultSelectedKeys={["4-6"]}
                value={selectedOptions.readerAge}
                onChange={(event) =>
                  handleOptionChange<"readerAge">(event, "readerAge")
                }
                isDisabled={!isExpanded || loading}
                disallowEmptySelection={true}
              >
                {readerAges.map((readerAge) => (
                  <SelectItem key={readerAge.value} value={readerAge.value}>
                    {readerAge.label}
                  </SelectItem>
                ))}
              </Select>
              <Select
                labelPlacement="outside"
                label="Writing style"
                placeholder="Select a writing style"
                defaultSelectedKeys={["imaginative"]}
                value={selectedOptions.writingStyle}
                onChange={(event) =>
                  handleOptionChange<"writingStyle">(event, "writingStyle")
                }
                isDisabled={!isExpanded || loading}
                disallowEmptySelection={true}
              >
                {writingStyles.map((writingStyle) => (
                  <SelectItem
                    key={writingStyle.value}
                    value={writingStyle.value}
                    description={writingStyle.description}
                  >
                    {writingStyle.label}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </div>
          <div className="mt-8 flex justify-center">
            <Switch
              isDisabled={loading}
              checked={selectedOptions.isSuperStory}
              onValueChange={(event) =>
                setSelectedOptions({
                  ...selectedOptions,
                  isSuperStory: event.valueOf(),
                })
              }
              classNames={{
                base: cn(
                  "inline-flex flex-row-reverse w-full max-w-md bg-default-100 hover:bg-content2 items-center",
                  "justify-between cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
                  "data-[selected=true]:border-primary"
                ),
                wrapper: "p-0 h-4 overflow-visible",
                thumb: cn(
                  "w-6 h-6 border-2 shadow-lg",
                  "group-data-[hover=true]:border-primary",
                  //selected
                  "group-data-[selected=true]:ml-6",
                  // pressed
                  "group-data-[pressed=true]:w-7",
                  "group-data-[selected]:group-data-[pressed]:ml-4"
                ),
              }}
            >
              <div className="flex flex-col gap-1">
                <div className="text-medium flex items-center gap-2">
                  <span>Super story</span>{" "}
                  <Chip
                    variant="shadow"
                    size="sm"
                    classNames={{
                      base: "bg-gradient-to-br from-indigo-500 to-pink-500 border-small border-white/50 shadow-pink-500/30",
                      content: "drop-shadow shadow-black text-white",
                    }}
                  >
                    Pro
                  </Chip>
                </div>
                <p className="text-tiny text-default-400">
                  Get access to new features before they are released.
                </p>
              </div>
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoreOptions;
