"use client";
import SideBar from "@/app/components/SideBar";
import { UserProfile } from "@clerk/nextjs";
import { dark, neobrutalism } from "@clerk/themes";
import { useTheme } from "next-themes";
import Image from "next/image";

const UserProfilePage = () => {
  const { theme } = useTheme();
  return (
    <div className="flex">
      <SideBar pathname={""} />
      <div className="w-full bg-default-50">
        <div className="relative z-1 max-w-[62rem] mx-auto text-center mt-16 mb-6 md:mb-10">
          <h1 className="mb-3 md:mb-5 text-3xl md:text-4xl lg:text-5xl font-semibold">
            Manage Your{" "}
            <span className="relative inline-block">
              Account
              <Image
                src="/curve.png"
                className="absolute left-0 w-full top-full xl:-mt-2"
                width={624}
                height={28}
                alt="Curve"
              />
            </span>
          </h1>
          {/* <p className="max-w-3xl mx-auto mb-4 lg:mb-8 text-lg">
          Find all of your creations
        </p> */}
        </div>
        <div className="flex justify-center items-center">
          <UserProfile
            appearance={{
              baseTheme: theme === "dark" ? dark : undefined,
            }}
            path="/user-profile"
          />
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
