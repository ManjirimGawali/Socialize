export const dynamic = "force-dynamic";
import { currentUser,auth } from "@clerk/nextjs/server";
import CreatePost from "@/components/ui/CreatePost";
import WhoToFollow from "@/components/ui/WhoToFollow";
import PostCard from "@/components/ui/PostCard";
import { getPosts } from "@/actions/post.actions";
import { getDbUserId, syncUser } from "@/actions/user.actions";
import { redirect } from "next/navigation";
//import { auth } from "@clerk/nextjs/server";
export default async function Home() {
  await syncUser();
  const user=await currentUser();
if (!user) {
  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="text-center">
        <h1 className="text-4xl font-bold">
          Welcome to Socially
        </h1>

        <p className="text-muted-foreground mt-3">
          Please sign in to view posts and connect with people.
        </p>
      </div>
    </div>
  );
}
 



  const posts=await getPosts();
  const dbUserId=await getDbUserId();


  console.log({posts});

  return (
    <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
      
      <div className="lg:col-span-6">
        {user ? <CreatePost /> : null}




      
        <div className="mt-6 space-y-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} dbUserId={dbUserId} />
          ))}
        </div>


      </div>

      <div className="hidden lg:block lg:col-span-4 sticky top-20">
        <WhoToFollow/>
        <div/>
      </div>

    </div>
  );
}