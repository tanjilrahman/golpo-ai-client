import React from "react";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  User,
} from "@nextui-org/react";
import { SignOutButton, useUser } from "@clerk/nextjs";
import { HiOutlineLogout } from "react-icons/hi";
import { MdOutlineManageAccounts } from "react-icons/md";

import { FiInfo } from "react-icons/fi";
import { useRouter } from "@/app/useRouter";

export const UserCard = () => {
  const { user } = useUser();
  const router = useRouter();
  return (
    <Card shadow="none" className="border-none bg-transparent">
      <CardHeader>
        <User
          name={<p className="">{user?.fullName}</p>}
          description={
            <p className="">{user?.emailAddresses[0].emailAddress}</p>
          }
          avatarProps={{
            src: user?.imageUrl,
            size: "sm",
          }}
          className="cursor-pointer"
        />
      </CardHeader>
      <CardBody className="py-0 px-0">
        <Button
          variant="ghost"
          className="items-center w-full flex justify-start py-[22px] rounded-none border-none"
        >
          <FiInfo size={23} className="mr-1" />
          <p className="font-semibold">Help & Feedback</p>
        </Button>
        <Button
          variant="ghost"
          className="items-center w-full flex justify-start py-[22px] rounded-none  border-none"
          onClick={() => router.push("/user-profile")}
        >
          <MdOutlineManageAccounts size={27} className="mr-1" />
          <p className="font-semibold">Manage Account</p>
        </Button>
        <SignOutButton>
          <Button
            variant="ghost"
            className="items-center w-full flex justify-start py-[22px] rounded-none  border-none"
          >
            <HiOutlineLogout size={27} className="mr-1" />
            <p className="font-semibold">Log Out</p>
          </Button>
        </SignOutButton>
      </CardBody>
      <CardFooter className=" text-xs underline space-x-2 text-default-400 ">
        <p className="cursor-pointer">Terms of Service</p>
        <p className="cursor-pointer">Privacy</p>
      </CardFooter>
    </Card>
  );
};
