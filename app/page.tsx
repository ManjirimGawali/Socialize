export const dynamic = "force-dynamic";

import { currentUser } from "@clerk/nextjs/server";
import CreatePost from "@/components/ui/CreatePost";
import WhoToFollow from "@/components/ui/WhoToFollow";
import PostCard from "@/components/ui/PostCard";
import WelcomeHero from "@/components/ui/WelcomeHero";

import { getPosts } from "@/actions/post.actions";
import { getDbUserId, syncUser } from "@/actions/user.actions";

export default async function Home() {
  await syncUser();

  const user = await currentUser();

  if (!user) {
    return <WelcomeHero />;
  }

  const posts = await getPosts();
  const dbUserId = await getDbUserId();

  return (
    <div
      className="
      grid
      grid-cols-1
      lg:grid-cols-10
      gap-8
      px-2
      lg:px-4
      py-4
      "
    >
      {/* CENTER FEED */}

      <div className="lg:col-span-6 space-y-8">

        {/* CREATE POST */}

        <div
          className="
          rounded-[32px]
          border
          border-zinc-200/70
          dark:border-zinc-800
          bg-white/80
          dark:bg-zinc-950/80
          backdrop-blur-xl
          shadow-[0_8px_40px_rgba(0,0,0,0.04)]
          "
        >
          <CreatePost />
        </div>


        {/* POSTS */}

        <div className="space-y-8">

          {posts.map((post) => (

            <div
              key={post.id}
              className="
              rounded-[32px]
              border
              border-zinc-200/70
              dark:border-zinc-800
              bg-white/80
              dark:bg-zinc-950/80
              backdrop-blur-xl
              shadow-[0_8px_40px_rgba(0,0,0,0.04)]
              overflow-hidden
              "
            >

              <PostCard
                post={post}
                dbUserId={dbUserId}
              />

            </div>

          ))}

        </div>

      </div>


      {/* RIGHT SIDEBAR */}

      <div
        className="
        hidden
        lg:block
        lg:col-span-4
        sticky
        top-24
        h-fit
        "
      >

        <div
          className="
          rounded-[32px]
          border
          border-zinc-200/70
          dark:border-zinc-800
          bg-white/80
          dark:bg-zinc-950/80
          backdrop-blur-xl
          shadow-[0_8px_40px_rgba(0,0,0,0.04)]
          overflow-hidden
          "
        >

          <WhoToFollow />

        </div>

      </div>

    </div>
  );
}