"use client";
import { useAuth } from "@clerk/nextjs";
import { Button } from "@nextui-org/react";
import React, { useState } from "react";
import toast from "react-hot-toast";

function AudioPlayer({ storyId, url }: { storyId: string; url: string }) {
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState(url);
  const { getToken } = useAuth();

  const handleAudioPlay = async () => {
    if (!storyId || audioUrl) return;
    try {
      setLoading(true);
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/api/story/synthesize",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await getToken()}`,
          },
          body: JSON.stringify({
            storyId,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setAudioUrl(data.audioUrl);
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
    <div>
      {audioUrl ? (
        <audio className="h-10" controls src={audioUrl}></audio>
      ) : (
        <Button
          isLoading={loading}
          onPress={handleAudioPlay}
          color="primary"
          className="rounded-full"
        >
          Listen audio
        </Button>
      )}
    </div>
  );
}

export default AudioPlayer;
