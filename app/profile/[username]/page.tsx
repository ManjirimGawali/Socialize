// import {
//   getProfileByUsername,
//   getUserLikedPosts,
//   getUserPosts,
//   isFollowing,
// } from "@/actions/profile.actions";

// import { notFound } from "next/navigation";
// import ProfilePageClient from "./ProfilePageClient";

// type Props = {
//   params: Promise<{
//     username: string;
//   }>;
// };

// export async function generateMetadata({
//   params,
// }: Props) {
//   const { username } = await params;

//   const user =
//     await getProfileByUsername(username);

//   if (!user) return;

//   return {
//     title: user.name || user.username,
//     description:
//       user.bio ||
//       `Check out ${user.username}'s profile.`,
//   };
// }

// async function ProfilePageServer({
//   params,
// }: Props) {
//   const { username } = await params;

//   const user =
//     await getProfileByUsername(username);

//   if (!user) notFound();

//   const [
//     posts,
//     likedPosts,
//     isCurrentUserFollowing,
//   ] = await Promise.all([
//     getUserPosts(user.id),
//     getUserLikedPosts(user.id),
//     isFollowing(user.id),
//   ]);

//   return (
//     <ProfilePageClient
//       user={user}
//       posts={posts}
//       likedPosts={likedPosts}
//       isFollowing={
//         isCurrentUserFollowing
//       }
//     />
//   );
// }

// export default ProfilePageServer;







export const dynamic = "force-dynamic";

import {
  getProfileByUsername,
  getUserLikedPosts,
  getUserPosts,
  isFollowing,
} from "@/actions/profile.actions";

import { notFound } from "next/navigation";
import ProfilePageClient from "./ProfilePageClient";

type Props = {
  params: {
    username: string;
  };
};

export async function generateMetadata({
  params,
}: Props) {
  const { username } = params;

  const user =
    await getProfileByUsername(username);

  if (!user) return {};

  return {
    title: user.name || user.username,
    description:
      user.bio ||
      `Check out ${user.username}'s profile.`,
  };
}

async function ProfilePageServer({
  params,
}: Props) {
  const { username } = params;

  const user =
    await getProfileByUsername(username);

  if (!user) notFound();

  const [
    posts,
    likedPosts,
    isCurrentUserFollowing,
  ] = await Promise.all([
    getUserPosts(user.id),
    getUserLikedPosts(user.id),
    isFollowing(user.id),
  ]);

  return (
    <ProfilePageClient
      user={user}
      posts={posts}
      likedPosts={likedPosts}
      isFollowing={
        isCurrentUserFollowing
      }
    />
  );
}

export default ProfilePageServer;