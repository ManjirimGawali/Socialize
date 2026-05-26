// import { currentUser } from "@clerk/nextjs/server";
// import { Card, CardContent, CardHeader, CardTitle } from "./card";
// import { SignInButton, SignUpButton } from "@clerk/nextjs";
// import { Button } from "./button";
// import { getUserByClerkId } from "@/actions/user.actions";
// import Link from "next/link";
// import { Avatar, AvatarImage } from "./avatar";
// import { Separator } from "./separator";
// import { LinkIcon, MapPinIcon } from "lucide-react";

// async function Sidebar() {
//   const authUser = await currentUser();
//   if (!authUser) return <UnAuthenticatedSidebar />;

//   const user = await getUserByClerkId(authUser.id);
//   if (!user) return null;

//   return (
//     <div className="sticky top-20">
//       <Card>
//         <CardContent className="pt-6">
//           <div className="flex flex-col items-center text-center">
//             <Link
//               href={`/profile/${user.username}`}
//               className="flex flex-col items-center justify-center"
//             >
//               <Avatar className="w-20 h-20 border-2 ">
//                 <AvatarImage src={user.image || "/avatar.png"} />
//               </Avatar>

//               <div className="mt-4 space-y-1">
//                 <h3 className="font-semibold">{user.name}</h3>
//                 <p className="text-sm text-muted-foreground">{user.username}</p>
//               </div>
//             </Link>

//             {user.bio && <p className="mt-3 text-sm text-muted-foreground">{user.bio}</p>}

//             <div className="w-full">
//               <Separator className="my-4" />
//               <div className="flex justify-between">
//                 <div>
//                   <p className="font-medium">{user._count.following}</p>
//                   <p className="text-xs text-muted-foreground">Following</p>
//                 </div>
//                 <Separator orientation="vertical" />
//                 <div>
//                   <p className="font-medium">{user._count.followers}</p>
//                   <p className="text-xs text-muted-foreground">Followers</p>
//                 </div>
//               </div>
//               <Separator className="my-4" />
//             </div>

//             <div className="w-full space-y-2 text-sm">
//               <div className="flex items-center text-muted-foreground">
//                 <MapPinIcon className="w-4 h-4 mr-2" />
//                 {user.location || "No location"}
//               </div>
//               <div className="flex items-center text-muted-foreground">
//                 <LinkIcon className="w-4 h-4 mr-2 shrink-0" />
//                 {user.website ? (
//                   <a href={`${user.website}`} className="hover:underline truncate" target="_blank">
//                     {user.website}
//                   </a>
//                 ) : (
//                   "No website"
//                 )}
//               </div>
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

// export default Sidebar;

// const UnAuthenticatedSidebar = () => (
//   <div className="sticky top-20">
//     <Card>
//       <CardHeader>
//         <CardTitle className="text-center text-xl font-semibold">Welcome Back!</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <p className="text-center text-muted-foreground mb-4">
//           Login to access your profile and connect with others.
//         </p>
//         <SignInButton mode="modal">
//           <Button className="w-full" variant="outline">
//             Login
//           </Button>
//         </SignInButton>
//         <SignUpButton mode="modal">
//           <Button className="w-full mt-2" variant="default">
//             Sign Up
//           </Button>
//         </SignUpButton>
//       </CardContent>
//     </Card>
//   </div>
// );



import { currentUser } from "@clerk/nextjs/server";
import { Card, CardContent } from "./card";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "./button";
import { getUserByClerkId } from "@/actions/user.actions";
import Link from "next/link";
import { Avatar, AvatarImage } from "./avatar";
import { Separator } from "./separator";
import { LinkIcon, MapPinIcon } from "lucide-react";

async function Sidebar() {
  const authUser = await currentUser();

  if (!authUser) return <UnAuthenticatedSidebar />;

  const user = await getUserByClerkId(authUser.id);

  if (!user) return null;

  return (
    <div className="sticky top-20">

      <Card
        className="
        rounded-[32px]
        border-zinc-200/70
        dark:border-zinc-800
        bg-white/80
        dark:bg-zinc-950/80
        backdrop-blur-xl
        shadow-[0_8px_40px_rgba(0,0,0,0.06)]"
      >

        <CardContent className="pt-8">

          <div className="flex flex-col items-center text-center">

            <Link
           href={`/profile/${user?.username ?? ""}`}
              className="flex flex-col items-center"
            >

              <Avatar className="w-24 h-24 border-4 border-zinc-200 dark:border-zinc-800">

                <AvatarImage
                  src={user.image || "/avatar.png"}
                />

              </Avatar>

              <div className="mt-5 space-y-1">

                <h3 className="font-semibold text-xl dark:text-white">

                  {user.name}

                </h3>

                <p className="text-sm text-zinc-500">

                  @{user.username}

                </p>

              </div>

            </Link>


            {user.bio && (

              <p className="mt-4 text-sm leading-6 text-zinc-500 dark:text-zinc-400">

                {user.bio}

              </p>

            )}

            <div className="w-full">

              <Separator className="my-6" />

              <div className="grid grid-cols-2 gap-4">

                <div className="rounded-2xl bg-zinc-100 dark:bg-zinc-900 p-4">

                  <p className="font-semibold text-lg dark:text-white">

                    {user._count.following}

                  </p>

                  <p className="text-xs text-zinc-500">

                    Following

                  </p>

                </div>

                <div className="rounded-2xl bg-zinc-100 dark:bg-zinc-900 p-4">

                  <p className="font-semibold text-lg dark:text-white">

                    {user._count.followers}

                  </p>

                  <p className="text-xs text-zinc-500">

                    Followers

                  </p>

                </div>

              </div>

              <Separator className="my-6" />

            </div>


            <div className="w-full space-y-3 text-sm">

              <div className="flex items-center text-zinc-500">

                <MapPinIcon className="w-4 h-4 mr-2 shrink-0" />

                {user.location || "No location"}

              </div>


              <div className="flex items-center text-zinc-500">

                <LinkIcon className="w-4 h-4 mr-2 shrink-0" />

                {user.website ? (

                  <a
                    href={user.website}
                    target="_blank"
                    className="truncate hover:underline"
                  >

                    {user.website}

                  </a>

                ) : (

                  "No website"

                )}

              </div>

            </div>

          </div>

        </CardContent>

      </Card>

    </div>
  );
}

export default Sidebar;



const UnAuthenticatedSidebar = () => (

  <div className="sticky top-20 mt-12">

    <div
      className="
      relative
      overflow-hidden
      rounded-[32px]
      border
      border-zinc-200/70
      dark:border-zinc-800
      bg-white/80
      dark:bg-zinc-950/80
      backdrop-blur-xl
      shadow-[0_8px_40px_rgba(0,0,0,0.06)]
      px-6
      py-8"
    >

      {/* background glow */}

      <div
        className="
        absolute
        -top-16
        -right-10
        h-32
        w-32
        rounded-full
        bg-violet-500/10
        blur-3xl"
      />

      <div
        className="
        absolute
        -bottom-16
        -left-10
        h-32
        w-32
        rounded-full
        bg-blue-500/10
        blur-3xl"
      />

      <div className="relative z-10">

        <div className="flex justify-center">

          <div
            className="
            px-4
            py-2
            rounded-full
            text-xs
            uppercase
            tracking-[0.25em]
            bg-zinc-100
            dark:bg-zinc-900
            text-zinc-500"
          >

            Welcome

          </div>

        </div>

        <h2
          className="
          mt-6
          text-center
          text-3xl
          font-semibold
          tracking-tight
          dark:text-white"
        >

          Welcome Back

        </h2>

        <p
          className="
          mt-4
          text-center
          text-sm
          leading-7
          text-zinc-500
          dark:text-zinc-400"
        >

          Continue conversations,
          discover people and
          connect with communities.

        </p>

        <div className="mt-8 space-y-3">

          <SignInButton mode="modal">

            <Button
              variant="outline"
              className="
              w-full
              h-12
              rounded-2xl
              border-zinc-300
              dark:border-zinc-700
              hover:bg-zinc-100
              dark:hover:bg-zinc-900
              transition-all
              duration-500"
            >

              Login

            </Button>

          </SignInButton>


          <SignUpButton mode="modal">

            <Button
              className="
              w-full
              h-12
              rounded-2xl
              bg-black
              dark:bg-white
              dark:text-black
              text-white
              hover:opacity-90
              transition-all
              duration-500"
            >

              Sign Up

            </Button>

          </SignUpButton>

        </div>

      </div>

    </div>

  </div>
);