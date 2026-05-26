import { getRandomUsers } from "@/actions/user.actions";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import Link from "next/link";
import { Avatar, AvatarImage } from "./avatar";
import FollowButton from "./FollowButton";

async function WhoToFollow() {
  const users = await getRandomUsers();

  if (users.length === 0) return null;

  return (
    <Card className="
rounded-[32px]
border
border-zinc-200/70
dark:border-zinc-800
bg-white/80
dark:bg-zinc-950/80
backdrop-blur-xl
shadow-[0_8px_40px_rgba(0,0,0,0.04)]
overflow-hidden">
      <CardHeader>
        <CardTitle>Who to Follow</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {users.map((user) => (
            <div key={user.id} className="flex gap-2 items-center justify-between ">
              <div className="flex items-center gap-1">
                <Link href={`/profile/${user?.username ?? ""}`}>
                  <Avatar>
                    <AvatarImage src={user.image ?? "/avatar.png"} />
                  </Avatar>
                </Link>
                <div className="text-xs">
                 <Link
  href={`/profile/${user?.username ?? ""}`}
  className="font-medium cursor-pointer"
>
                    {user.name}
                  </Link>
                  <p className="text-muted-foreground">@{user.username}</p>
                  <p className="text-muted-foreground">{user._count.followers} followers</p>
                </div>
              </div>
              <FollowButton userId={user.id} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
export default WhoToFollow;