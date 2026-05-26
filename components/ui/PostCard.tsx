// "use client"
// //import { Post } from '.prisma/client/default.js'
// import { deletePost, getPosts } from '@/actions/post.actions';
// import { useUser } from '@clerk/shared/react/index';
// import React from 'react'
// import { toggleLike } from '@/actions/post.actions';
// import { createComment } from '@/actions/post.actions';
// import { toast } from "react-hot-toast";
// import { Card, CardContent } from './card';
// import { Avatar, AvatarImage } from './avatar';
// import Link from 'next/link';
// import { formatDistanceToNow } from 'date-fns';
// import { Button } from './button';
// import { HeartIcon, MessageCircleIcon, SendIcon, LogInIcon } from 'lucide-react';
// import { SignInButton } from '@clerk/nextjs';
// import { DeleteAlertDialog } from './DeleteAlertDialog';
// import { Textarea } from "@/components/ui/textarea";
// import { getDbUserId } from '@/actions/user.actions';

// type Posts= Awaited<ReturnType <typeof getPosts>>;
// type Post=Posts[number];

// function PostCard ({post,dbUserId}:{post:Post;dbUserId:string|null}) {
//   const {user}=useUser();
//   const[newComment,setNewComment]=React.useState("");
//   const [isCommenting,setIsCommenting]=React.useState(false);
//   const [isLiking,setIsLiking]=React.useState(false);
//   const [isDeleting,setIsDeleting]=React.useState(false);
//  const [hasLiked,sethasLiked]=React.useState(post.likes.some(like=>like.userId===dbUserId));
//  const[optimisticLikes,setOptimisticLikes]=React.useState(post._count.likes);
// const [showComments, setShowComments] = React.useState(false);
//  const handleLike=async()=>{
//   if(isLiking)return;
//   try{
//     setIsLiking(true)
//     sethasLiked(prev=>!prev);
//     setOptimisticLikes(prev=>prev+(hasLiked?-1:1));
//     await toggleLike(post.id);
//   }catch(error){
//     setOptimisticLikes(post._count.likes);
//     sethasLiked(post.likes.some(like=>like.userId===dbUserId));
//   }finally{
//     setIsLiking(false);
//   }
//  }
//  const handleAddComment = async () => {
//     if (!newComment.trim() || isCommenting) return;
//     try {
//       setIsCommenting(true);
//       const result = await createComment(post.id, newComment);
//       if (result?.success) {
//         toast.success("Comment posted successfully");
//         setNewComment("");
//       }
//     } catch (error) {
//       toast.error("Failed to add comment");
//     } finally {
//       setIsCommenting(false);
//     }
//   };
//  const handleDeletePost = async () => {
//     if (isDeleting) return;
//     try {
//       setIsDeleting(true);
//       const result = await deletePost(post.id);
//       if (result.success) toast.success("Post deleted successfully");
//       else throw new Error(result.error);
//     } catch (error) {
//       toast.error("Failed to delete post");
//     } finally {
//       setIsDeleting(false);
//     }
//   };

//     return (
//     <Card className="overflow-hidden">
//       <CardContent className="p-4 sm:p-6">
//         <div className="space-y-4">
//           <div className="flex space-x-3 sm:space-x-4">
//             <Link href={`/profile/${post.author.username}`}>
//               <Avatar className="size-8 sm:w-10 sm:h-10">
//                 <AvatarImage src={post.author.image ?? "/avatar.png"} />
//               </Avatar>
//             </Link>

//             {/* POST HEADER & TEXT CONTENT */}
//             <div className="flex-1 min-w-0">
//               <div className="flex items-start justify-between">
//                 <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 truncate">
//                   <Link
//                     href={`/profile/${post.author.username}`}
//                     className="font-semibold truncate"
//                   >
//                     {post.author.name}
//                   </Link>
//                   <div className="flex items-center space-x-2 text-sm text-muted-foreground">
//                     <Link href={`/profile/${post.author.username}`}>@{post.author.username}</Link>
//                     <span>•</span>
//                     <span>{formatDistanceToNow(new Date(post.createdAt))} ago</span>
//                   </div>
//                 </div>
//                 {/* Check if current user is the post author */}
//                 {dbUserId === post.author.id && (
//                   <DeleteAlertDialog isDeleting={isDeleting} onDelete={handleDeletePost} />
//                 )}
//               </div>
//               <p className="mt-2 text-sm text-foreground break-words">{post.content}</p>
//             </div>
//           </div>

//           {/* POST IMAGE */}
//           {post.image && (
//             <div className="rounded-lg overflow-hidden">
//               <img src={post.image} alt="Post content" className="w-full h-auto object-cover" />
//             </div>
//           )}

//           {/* LIKE & COMMENT BUTTONS */}
//           <div className="flex items-center pt-2 space-x-4">
//             {user ? (
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 className={`text-muted-foreground gap-2 ${
//                   hasLiked ? "text-red-500 hover:text-red-600" : "hover:text-red-500"
//                 }`}
//                 onClick={handleLike}
//               >
//                 {hasLiked ? (
//                   <HeartIcon className="size-5 fill-current" />
//                 ) : (
//                   <HeartIcon className="size-5" />
//                 )}
//                 <span>{optimisticLikes}</span>
//               </Button>
//             ) : (
//               <SignInButton mode="modal">
//                 <Button variant="ghost" size="sm" className="text-muted-foreground gap-2">
//                   <HeartIcon className="size-5" />
//                   <span>{optimisticLikes}</span>
//                 </Button>
//               </SignInButton>
//             )}

//             <Button
//               variant="ghost"
//               size="sm"
//               className="text-muted-foreground gap-2 hover:text-blue-500"
//               onClick={() => setShowComments((prev) => !prev)}
//             >
//               <MessageCircleIcon
//                 className={`size-5 ${showComments ? "fill-blue-500 text-blue-500" : ""}`}
//               />
//               <span>{post.comments.length}</span>
//             </Button>
//           </div>

//           {/* COMMENTS SECTION */}
//           {showComments && (
//             <div className="space-y-4 pt-4 border-t">
//               <div className="space-y-4">
//                 {/* DISPLAY COMMENTS */}
//                 {post.comments.map((comment) => (
//                   <div key={comment.id} className="flex space-x-3">
//                     <Avatar className="size-8 flex-shrink-0">
//                       <AvatarImage src={comment.author.image ?? "/avatar.png"} />
//                     </Avatar>
//                     <div className="flex-1 min-w-0">
//                       <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
//                         <span className="font-medium text-sm">{comment.author.name}</span>
//                         <span className="text-sm text-muted-foreground">
//                           @{comment.author.username}
//                         </span>
//                         <span className="text-sm text-muted-foreground">·</span>
//                         <span className="text-sm text-muted-foreground">
//                           {formatDistanceToNow(new Date(comment.createdAt))} ago
//                         </span>
//                       </div>
//                       <p className="text-sm break-words">{comment.content}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {user ? (
//                 <div className="flex space-x-3">
//                   <Avatar className="size-8 flex-shrink-0">
//                     <AvatarImage src={user?.imageUrl || "/avatar.png"} />
//                   </Avatar>
//                   <div className="flex-1">
//                     <Textarea
//                       placeholder="Write a comment..."
//                       value={newComment}
//                       onChange={(e) => setNewComment(e.target.value)}
//                       className="min-h-[80px] resize-none"
//                     />
//                     <div className="flex justify-end mt-2">
//                       <Button
//                         size="sm"
//                         onClick={handleAddComment}
//                         className="flex items-center gap-2"
//                         disabled={!newComment.trim() || isCommenting}
//                       >
//                         {isCommenting ? (
//                           "Posting..."
//                         ) : (
//                           <>
//                             <SendIcon className="size-4" />
//                             Comment
//                           </>
//                         )}
//                       </Button>
//                     </div>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="flex justify-center p-4 border rounded-lg bg-muted/50">
//                   <SignInButton mode="modal">
//                     <Button variant="outline" className="gap-2">
//                       <LogInIcon className="size-4" />
//                       Sign in to comment
//                     </Button>
//                   </SignInButton>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </CardContent>
//     </Card>
//   );
// }
// export default PostCard;




"use client";

import { deletePost, getPosts } from "@/actions/post.actions";
import { useUser } from "@clerk/shared/react";
import React from "react";
import { toggleLike } from "@/actions/post.actions";
import { createComment } from "@/actions/post.actions";
import { toast } from "react-hot-toast";
import { Card, CardContent } from "./card";
import { Avatar, AvatarImage } from "./avatar";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { Button } from "./button";
import {
  HeartIcon,
  MessageCircleIcon,
  SendIcon,
  LogInIcon,
  Loader2Icon,
} from "lucide-react";
import { SignInButton } from "@clerk/nextjs";
import { DeleteAlertDialog } from "./DeleteAlertDialog";
import { Textarea } from "./textarea";

type Posts = Awaited<ReturnType<typeof getPosts>>;
type Post = Posts[number];

function PostCard({
  post,
  dbUserId,
}: {
  post: Post;
  dbUserId: string | null;
}) {
  const { user } = useUser();

  const [newComment, setNewComment] = React.useState("");
  const [isCommenting, setIsCommenting] = React.useState(false);
  const [isLiking, setIsLiking] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);

  const [hasLiked, setHasLiked] = React.useState(
    post.likes.some((like) => like.userId === dbUserId)
  );

  const [optimisticLikes, setOptimisticLikes] =
    React.useState(post._count.likes);

  const [showComments, setShowComments] = React.useState(false);

  const handleLike = async () => {
    if (isLiking) return;

    try {
      setIsLiking(true);

      setHasLiked((prev) => !prev);

      setOptimisticLikes((prev) =>
        prev + (hasLiked ? -1 : 1)
      );

      await toggleLike(post.id);
    } catch {
      setOptimisticLikes(post._count.likes);

      setHasLiked(
        post.likes.some(
          (like) => like.userId === dbUserId
        )
      );
    } finally {
      setIsLiking(false);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      setIsCommenting(true);

      const result = await createComment(
        post.id,
        newComment
      );

      if (result?.success) {
        toast.success("Comment added");

        setNewComment("");
      }
    } catch {
      toast.error("Failed to comment");
    } finally {
      setIsCommenting(false);
    }
  };

  const handleDeletePost = async () => {
    if (isDeleting) return;

    try {
      setIsDeleting(true);

      const result = await deletePost(post.id);

      if (result.success)
        toast.success("Post deleted");
    } catch {
      toast.error("Failed");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Card
      className="
      overflow-hidden
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
      <CardContent className="p-6">

        <div className="space-y-6">

          {/* HEADER */}

          <div className="flex gap-4">

            <Link
              href={`/profile/${post.author.username}`}
            >
              <Avatar
                className="
                h-12
                w-12
                border-2
                border-zinc-200
                dark:border-zinc-800"
              >
                <AvatarImage
                  src={
                    post.author.image ??
                    "/avatar.png"
                  }
                />
              </Avatar>
            </Link>

            <div className="flex-1">

              <div className="flex justify-between">

                <div>

                  <div className="flex gap-2 items-center">

                    <Link
                      href={`/profile/${post.author.username}`}
                      className="font-semibold"
                    >
                      {post.author.name}
                    </Link>

                    <span className="text-zinc-500">
                      @{post.author.username}
                    </span>

                    <span className="text-zinc-500">
                      •
                    </span>

                    <span className="text-zinc-500 text-sm">

                      {formatDistanceToNow(
                        new Date(post.createdAt)
                      )}{" "}
                      ago

                    </span>

                  </div>

                </div>

                {dbUserId === post.author.id && (
                  <DeleteAlertDialog
                    isDeleting={isDeleting}
                    onDelete={handleDeletePost}
                  />
                )}

              </div>

              <p
                className="
                mt-4
                text-[15px]
                leading-7
                text-zinc-700
                dark:text-zinc-300"
              >
                {post.content}
              </p>

            </div>

          </div>


          {/* IMAGE */}

          {post.image && (

            <div
              className="
              rounded-[24px]
              overflow-hidden
              border
              border-zinc-200/70
              dark:border-zinc-800"
            >

              <img
                src={post.image}
                className="
                w-full
                object-cover"
              />

            </div>

          )}



          {/* ACTIONS */}

          <div
            className="
            flex
            gap-4
            pt-4
            border-t
            border-zinc-200
            dark:border-zinc-800"
          >

            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={`
              rounded-xl
              gap-2
              transition-all
              hover:bg-zinc-100
              dark:hover:bg-zinc-900
              ${
                hasLiked
                  ? "text-red-500"
                  : "text-zinc-500"
              }
              `}
            >

              {hasLiked ? (
                <HeartIcon className="fill-current w-5 h-5" />
              ) : (
                <HeartIcon className="w-5 h-5" />
              )}

              {optimisticLikes}

            </Button>


            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                setShowComments(
                  !showComments
                )
              }
              className="
              rounded-xl
              gap-2
              hover:bg-zinc-100
              dark:hover:bg-zinc-900"
            >

              <MessageCircleIcon className="w-5 h-5" />

              {post.comments.length}

            </Button>

          </div>



          {/* COMMENTS */}

          {showComments && (

            <div
              className="
              pt-6
              border-t
              border-zinc-200
              dark:border-zinc-800
              space-y-5"
            >

              {post.comments.map(
                (comment) => (
                  <div
                    key={comment.id}
                    className="flex gap-3"
                  >
                    <Avatar className="w-8 h-8">

                      <AvatarImage
                        src={
                          comment.author.image ??
                          "/avatar.png"
                        }
                      />

                    </Avatar>

                    <div>

                      <p className="font-medium">

                        {comment.author.name}

                      </p>

                      <p className="text-sm text-zinc-500">

                        {comment.content}

                      </p>

                    </div>

                  </div>
                )
              )}

              {user ? (

                <div className="space-y-3">

                  <Textarea
                    placeholder="Write a comment..."
                    value={newComment}
                    onChange={(e) =>
                      setNewComment(
                        e.target.value
                      )
                    }
                    className="
                    rounded-2xl
                    border-zinc-200
                    dark:border-zinc-800"
                  />

                  <Button
                    onClick={
                      handleAddComment
                    }
                    disabled={
                      isCommenting
                    }
                    className="
                    rounded-2xl
                    bg-black
                    dark:bg-white
                    dark:text-black"
                  >

                    {isCommenting ? (
                      <>
                        <Loader2Icon className="animate-spin w-4 h-4 mr-2" />
                        Posting
                      </>
                    ) : (
                      <>
                        <SendIcon className="w-4 h-4 mr-2" />
                        Comment
                      </>
                    )}

                  </Button>

                </div>

              ) : (

                <SignInButton mode="modal">

                  <Button
                    variant="outline"
                    className="rounded-2xl"
                  >
                    <LogInIcon className="w-4 h-4 mr-2" />
                    Sign in
                  </Button>

                </SignInButton>

              )}

            </div>

          )}

        </div>

      </CardContent>
    </Card>
  );
}

export default PostCard;