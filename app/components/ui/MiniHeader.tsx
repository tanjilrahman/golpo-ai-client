import { useRouter } from "@/app/useRouter";
import { Button } from "@nextui-org/react";
import React, { Dispatch, SetStateAction } from "react";
import { RiAiGenerate } from "react-icons/ri";
import {
  TbLayoutSidebarLeftCollapseFilled,
  TbLayoutSidebarLeftExpandFilled,
} from "react-icons/tb";

function MiniHeader({
  isCollapsed,
  setIsCollapsed,
}: {
  isCollapsed: boolean;
  setIsCollapsed: Dispatch<SetStateAction<boolean>>;
}) {
  const router = useRouter();

  return (
    <div className="fixed md:hidden w-full flex items-center justify-between top-0 bg-default-50 left-1/2 -translate-x-1/2 p-1">
      <Button
        isIconOnly
        variant="light"
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="m-2"
      >
        {isCollapsed ? (
          <TbLayoutSidebarLeftExpandFilled size={20} />
        ) : (
          <TbLayoutSidebarLeftCollapseFilled size={20} />
        )}
      </Button>
      <p className="font-semibold">Golpo.ai</p>
      <Button
        isIconOnly
        variant="light"
        onClick={() => {
          if (isCollapsed) {
            router.push("/golpo");
          } else {
            setIsCollapsed(!isCollapsed);
          }
        }}
        className="m-2"
      >
        {isCollapsed ? (
          <RiAiGenerate size={20} />
        ) : (
          <TbLayoutSidebarLeftCollapseFilled size={20} />
        )}
      </Button>
    </div>
  );
}

export default MiniHeader;
