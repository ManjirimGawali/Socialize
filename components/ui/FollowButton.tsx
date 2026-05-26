"use client";

import { useState } from "react";
import { Button } from "./button";
import { Loader2Icon } from "lucide-react";
import toast from "react-hot-toast";
import { toggleFollow } from "@/actions/user.actions";

function FollowButton({ userId }: { userId: string }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleFollow = async () => {
    setIsLoading(true);

    try {
      await toggleFollow(userId);

      toast.success("User followed successfully");

    } catch (error) {

      toast.error("Error following user");

    } finally {

      setIsLoading(false);

    }
  };

  return (
    <Button
      onClick={handleFollow}
      disabled={isLoading}
      className="
      h-9
      px-5
      rounded-2xl
      bg-black
      dark:bg-white
      dark:text-black
      text-white
      hover:opacity-90
      transition-all
      duration-500
      min-w-[95px]"
    >
      {isLoading ? (

        <Loader2Icon
          className="
          h-4
          w-4
          animate-spin"
        />

      ) : (

        "Follow"

      )}
    </Button>
  );
}

export default FollowButton;