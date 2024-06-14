"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Skeleton,
  User,
} from "@nextui-org/react";
import { TbSmartHome } from "react-icons/tb";
import { LuBookOpen } from "react-icons/lu";
import { IoDiamondOutline } from "react-icons/io5";
import { PiMagicWandDuotone } from "react-icons/pi";
import { UserCard } from "./ui/UserCard";
import { MdOutlineFaceUnlock } from "react-icons/md";
import { ThemeSwitcher } from "./ui/ThemeSwitcher";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import {
  TbLayoutSidebarLeftCollapseFilled,
  TbLayoutSidebarLeftExpandFilled,
} from "react-icons/tb";
import { isMobile } from "react-device-detect";
import MiniHeader from "./ui/MiniHeader";
import toast from "react-hot-toast";
import { MdVpnKey } from "react-icons/md";
import RegisterModal from "./RegisterModal";

function SideBar({ pathname }: { pathname: string }) {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    if (isMobile) {
      setIsCollapsed(true);
    }
  }, []);
  useEffect(() => {
    if (!isCollapsed && isMobile) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isCollapsed]);
  return (
    <div
      className={`flex ${
        isCollapsed ? "w-0" : "w-[392px] md:w-72 lg:w-80"
      } transition-width duration-250 relative z-30 bg-default-50`}
    >
      <div
        className={`inset-y-0 h-[100dvh] sticky flex flex-col border-r border-divider bg-background ${
          isCollapsed ? "w-0" : "w-[392px] md:w-72 lg:w-80 p-5 md:p-6 z-20"
        }`}
      >
        {!isCollapsed && (
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold ml-2">Golpo.ai</h2>
            <ThemeSwitcher />
          </div>
        )}
        {!isCollapsed && (
          <div className="mt-6 md:mt-24">
            <Button
              onClick={() => router.push("/")}
              className={`${
                pathname === "/"
                  ? "bg-secondary text-white"
                  : " bg-transparent hover:bg-secondary-100"
              } items-center w-full flex justify-start py-[22px] mt-1`}
            >
              <TbSmartHome size={25} className="mr-1" />
              <p className="font-semibold">Home</p>
            </Button>
            <Button
              onClick={() => router.push("/golpo")}
              className={`${
                pathname === "/golpo"
                  ? "bg-secondary text-white"
                  : " bg-transparent hover:bg-secondary-100"
              } items-center w-full flex justify-start py-[22px] mt-1`}
            >
              <PiMagicWandDuotone size={25} className="mr-1" />
              <p className="font-semibold">Golpo</p>
            </Button>
            <Button
              onClick={() =>
                toast.error("Comming soon...", {
                  icon: "👏",
                })
              }
              className={`${
                pathname === "/characters"
                  ? "bg-secondary text-white"
                  : " bg-transparent hover:bg-secondary-100"
              } items-center w-full flex justify-start py-[22px] mt-1`}
            >
              <MdOutlineFaceUnlock size={25} className="mr-1" />
              <p className="font-semibold">Characters</p>
            </Button>
            <Button
              onClick={() => router.push("/library")}
              className={`${
                pathname === "/library"
                  ? "bg-secondary text-white"
                  : " bg-transparent hover:bg-secondary-100"
              } items-center w-full flex justify-start py-[22px] mt-1`}
            >
              <LuBookOpen size={25} className="mr-1" />
              <p className="font-semibold">Library</p>
            </Button>
            <Button
              onClick={() =>
                toast.error("Comming soon...", {
                  icon: "👏",
                })
              }
              className={`${
                pathname === "/pricing"
                  ? "bg-secondary text-white"
                  : " bg-transparent hover:bg-secondary-100"
              } items-center w-full flex justify-start py-[22px] mt-1`}
            >
              <IoDiamondOutline size={23} className="mr-1" />
              <p className="font-semibold">Pricing</p>
            </Button>
          </div>
        )}
        {!isCollapsed && (
          <div className="mt-auto">
            <div className="relative mb-12">
              <Card
                shadow="none"
                className=" border-none flex ring ring-default-100"
              >
                <CardHeader className="text-center">
                  <h3 className="text-lg mx-auto pt-3 font-semibold">
                    Upgrade to Pro 🚀
                  </h3>
                </CardHeader>
                <CardBody className="px-6 py-0 pb-10">
                  <p className="text-small text-center">
                    Experience the full potential of AI story writing in Bangla!{" "}
                    <span aria-label="confetti" role="img">
                      🎉
                    </span>
                  </p>
                </CardBody>
              </Card>
              <Button
                className={
                  "w-2/3 -bottom-5 left-1/2 -translate-x-1/2 absolute font-semibold"
                }
                color="secondary"
                radius="full"
                size="md"
                variant={"solid"}
                onClick={() =>
                  toast.error("Comming soon...", {
                    icon: "👏",
                  })
                }
              >
                Upgrade
              </Button>
            </div>
            {user || !isLoaded ? (
              <Popover showArrow placement="bottom">
                <PopoverTrigger>
                  {isLoaded ? (
                    <User
                      name={<p className="">{user?.fullName}</p>}
                      description={
                        <p className="">
                          {user?.emailAddresses[0].emailAddress}
                        </p>
                      }
                      avatarProps={{
                        src: user?.imageUrl,
                        size: "sm",
                      }}
                      className="cursor-pointer w-full flex justify-start"
                    />
                  ) : (
                    <User
                      name={
                        <Skeleton className="w-20 h-3 rounded-lg"></Skeleton>
                      }
                      description={
                        <Skeleton className="w-40 h-3 rounded-lg mt-2"></Skeleton>
                      }
                      avatarProps={{
                        size: "sm",
                      }}
                      className="h-9"
                    />
                  )}
                </PopoverTrigger>
                <PopoverContent className="p-1">
                  <UserCard />
                </PopoverContent>
              </Popover>
            ) : (
              <div>
                <Button
                  onClick={() => router.push("?m=signin")}
                  className={`${
                    pathname === ""
                      ? "bg-secondary text-white"
                      : " bg-transparent hover:bg-secondary-100"
                  } items-center w-full flex justify-start py-[22px] mt-1`}
                >
                  <MdVpnKey size={25} className="mr-1" />
                  <p className="font-semibold">Sign In</p>
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
      <Button
        isIconOnly
        variant="light"
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="ml-auto opacity-0 md:opacity-100 sticky m-2 top-4"
      >
        {isCollapsed ? (
          <TbLayoutSidebarLeftExpandFilled size={20} />
        ) : (
          <TbLayoutSidebarLeftCollapseFilled size={20} />
        )}
      </Button>
      <div className="md:hidden z-10">
        <MiniHeader isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      </div>
      <RegisterModal />
    </div>
  );
}

export default SideBar;
