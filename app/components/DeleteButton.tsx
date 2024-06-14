"use client";
import { useAuth } from "@clerk/nextjs";
import { Button } from "@nextui-org/react";
import React from "react";
import toast from "react-hot-toast";
import { useRouter } from "../useRouter";

function DeleteButton({ storyId }: { storyId: string }) {
  const router = useRouter();
  const { getToken } = useAuth();
  const handleDelete = async () => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/api/story/" + storyId,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        toast.success("Story deleted");
        router.push("/");
      } else {
        console.error(data.message);
        toast.error(data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Button className="rounded-full" onClick={handleDelete}>
      Delete
    </Button>
  );
}

export default DeleteButton;
