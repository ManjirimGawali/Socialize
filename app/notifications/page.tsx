// "use client";

// import { getNotifications, markNotificationsAsRead } from "@/actions/notification.actions";
// import { NotificationsSkeleton } from "@/components/ui/Notificationskeleton";
// import { Avatar, AvatarImage } from "@/components/ui/avatar";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { formatDistanceToNow } from "date-fns";
// import { HeartIcon, MessageCircleIcon, UserPlusIcon } from "lucide-react";

// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";

// type Notifications = Awaited<ReturnType<typeof getNotifications>>;
// type Notification = Notifications[number];

// const getNotificationIcon = (type: string) => {
//   switch (type) {
//     case "LIKE":
//       return <HeartIcon className="size-4 text-red-500" />;
//     case "COMMENT":
//       return <MessageCircleIcon className="size-4 text-blue-500" />;
//     case "FOLLOW":
//       return <UserPlusIcon className="size-4 text-green-500" />;
//     default:
//       return null;
//   }
// };

// function NotificationsPage() {
//   const [notifications, setNotifications] = useState<Notification[]>([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchNotifications = async () => {
//       setIsLoading(true);
//       try {
//         const data = await getNotifications();
//         setNotifications(data);

//         const unreadIds = data.filter((n) => !n.read).map((n) => n.id);
//         if (unreadIds.length > 0) await markNotificationsAsRead(unreadIds);
//       } catch (error) {
//         toast.error("Failed to fetch notifications");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchNotifications();
//   }, []);

//   if (isLoading) return <NotificationsSkeleton />;

//   return (
//     <div className="space-y-4">
//       <Card>
//         <CardHeader className="border-b">
//           <div className="flex items-center justify-between">
//             <CardTitle>Notifications</CardTitle>
//             <span className="text-sm text-muted-foreground">
//               {notifications.filter((n) => !n.read).length} unread
//             </span>
//           </div>
//         </CardHeader>
//         <CardContent className="p-0">
//           <ScrollArea className="h-[calc(100vh-12rem)]">
//             {notifications.length === 0 ? (
//               <div className="p-4 text-center text-muted-foreground">No notifications yet</div>
//             ) : (
//               notifications.map((notification) => (
//                 <div
//                   key={notification.id}
//                   className={`flex items-start gap-4 p-4 border-b hover:bg-muted/25 transition-colors ${
//                     !notification.read ? "bg-muted/50" : ""
//                   }`}
//                 >
//                   <Avatar className="mt-1">
//                     <AvatarImage src={notification.creator.image ?? "/avatar.png"} />
//                   </Avatar>
//                   <div className="flex-1 space-y-1">
//                     <div className="flex items-center gap-2">
//                       {getNotificationIcon(notification.type)}
//                       <span>
//                         <span className="font-medium">
//                           {notification.creator.name ?? notification.creator.username}
//                         </span>{" "}
//                         {notification.type === "FOLLOW"
//                           ? "started following you"
//                           : notification.type === "LIKE"
//                           ? "liked your post"
//                           : "commented on your post"}
//                       </span>
//                     </div>

//                     {notification.post &&
//                       (notification.type === "LIKE" || notification.type === "COMMENT") && (
//                         <div className="pl-6 space-y-2">
//                           <div className="text-sm text-muted-foreground rounded-md p-2 bg-muted/30 mt-2">
//                             <p>{notification.post.content}</p>
//                             {notification.post.image && (
//                               <img
//                                 src={notification.post.image}
//                                 alt="Post content"
//                                 className="mt-2 rounded-md w-full max-w-[200px] h-auto object-cover"
//                               />
//                             )}
//                           </div>

//                           {notification.type === "COMMENT" && notification.comment && (
//                             <div className="text-sm p-2 bg-accent/50 rounded-md">
//                               {notification.comment.content}
//                             </div>
//                           )}
//                         </div>
//                       )}

//                     <p className="text-sm text-muted-foreground pl-6">
//                       {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
//                     </p>
//                   </div>
//                 </div>
//               ))
//             )}
//           </ScrollArea>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
// export default NotificationsPage;





"use client";

import {
  getNotifications,
  markNotificationsAsRead,
} from "@/actions/notification.actions";

import { NotificationsSkeleton } from "@/components/ui/Notificationskeleton";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ScrollArea } from "@/components/ui/scroll-area";

import { formatDistanceToNow } from "date-fns";

import {
  HeartIcon,
  MessageCircleIcon,
  UserPlusIcon,
} from "lucide-react";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type Notifications = Awaited<
  ReturnType<typeof getNotifications>
>;

type Notification = Notifications[number];

const getNotificationIcon = (
  type: string
) => {
  switch (type) {
    case "LIKE":
      return (
        <HeartIcon className="h-5 w-5 text-red-500" />
      );

    case "COMMENT":
      return (
        <MessageCircleIcon className="h-5 w-5 text-blue-500" />
      );

    case "FOLLOW":
      return (
        <UserPlusIcon className="h-5 w-5 text-green-500" />
      );

    default:
      return null;
  }
};

function NotificationsPage() {
  const [notifications, setNotifications] =
    useState<Notification[]>([]);

  const [isLoading, setIsLoading] =
    useState(true);

  useEffect(() => {
    const fetchNotifications =
      async () => {
        setIsLoading(true);

        try {
          const data =
            await getNotifications();

          setNotifications(data);

          const unreadIds =
            data
              .filter((n) => !n.read)
              .map((n) => n.id);

          if (unreadIds.length > 0) {
            await markNotificationsAsRead(
              unreadIds
            );
          }
        } catch {
          toast.error(
            "Failed to fetch notifications"
          );
        } finally {
          setIsLoading(false);
        }
      };

    fetchNotifications();
  }, []);

  if (isLoading)
    return <NotificationsSkeleton />;

  return (
    <div className="w-full max-w-5xl mx-auto">

      <Card
        className="
        rounded-[32px]
        border
        border-zinc-200/70
        dark:border-zinc-800
        bg-white/80
        dark:bg-zinc-950/80
        backdrop-blur-xl
        shadow-[0_8px_40px_rgba(0,0,0,0.04)]
        overflow-hidden"
      >

        {/* HEADER */}

        <CardHeader
          className="
          px-8
          py-6
          border-b
          border-zinc-200/50
          dark:border-zinc-800"
        >

          <div className="flex items-center justify-between">

            <CardTitle
              className="
              text-2xl
              font-semibold
              tracking-[-0.03em]"
            >

              Notifications

            </CardTitle>

            <div
              className="
              rounded-full
              px-4
              py-2
              text-sm
              bg-zinc-100
              dark:bg-zinc-900
              text-zinc-600
              dark:text-zinc-300"
            >

              {
                notifications.filter(
                  (n) => !n.read
                ).length
              }{" "}
              unread

            </div>

          </div>

        </CardHeader>

        <CardContent className="p-2">

          <ScrollArea
            className="
            h-[calc(100vh-14rem)]"
          >

            {notifications.length ===
            0 ? (

              <div
                className="
                text-center
                py-20
                text-zinc-500"
              >

                No notifications yet

              </div>

            ) : (

              notifications.map(
                (notification) => (

                  <div
                    key={notification.id}
                    className={`
                    flex
                    items-center
                    gap-5
                    px-8
                    py-6
                    border-b
                    border-zinc-200/40
                    dark:border-zinc-800
                    transition-all
                    duration-500
                    hover:bg-zinc-50/40
                    dark:hover:bg-zinc-900/30
                    ${
                      !notification.read
                        ? "bg-zinc-100/40 dark:bg-zinc-900/40"
                        : ""
                    }
                    `}
                  >

                    {/* Avatar */}

                    <Avatar
                      className="
                      h-14
                      w-14
                      border-2
                      border-zinc-200
                      dark:border-zinc-800"
                    >

                      <AvatarImage
                        src={
                          notification.creator
                            .image ??
                          "/avatar.png"
                        }
                      />

                    </Avatar>


                    <div className="flex-1 space-y-3">

                      <div className="flex items-center gap-3">

                        {getNotificationIcon(
                          notification.type
                        )}

                        <p
                          className="
                          text-[15px]
                          leading-7"
                        >

                          <span className="font-semibold">

                            {notification
                              .creator.name ??
                              notification
                                .creator
                                .username}

                          </span>{" "}

                          {notification.type ===
                          "FOLLOW"
                            ? "started following you"
                            : notification.type ===
                              "LIKE"
                            ? "liked your post"
                            : "commented on your post"}

                        </p>

                      </div>


                      {notification.post &&
                        (notification.type ===
                          "LIKE" ||
                          notification.type ===
                            "COMMENT") && (

                          <div className="pl-8 space-y-3">

                            <div
                              className="
                              text-sm
                              text-zinc-600
                              dark:text-zinc-300
                              rounded-2xl
                              p-4
                              bg-zinc-100/60
                              dark:bg-zinc-900/60
                              border
                              border-zinc-200/60
                              dark:border-zinc-800"
                            >

                              <p>

                                {
                                  notification
                                    .post
                                    .content
                                }

                              </p>

                              {notification.post
                                .image && (

                                <img
                                  src={
                                    notification
                                      .post
                                      .image
                                  }
                                  className="
                                  mt-4
                                  rounded-2xl
                                  max-w-[220px]"
                                />

                              )}

                            </div>


                            {notification.type ===
                              "COMMENT" &&
                              notification.comment && (

                              <div
                                className="
                                text-sm
                                rounded-2xl
                                p-4
                                bg-zinc-100/60
                                dark:bg-zinc-900/60
                                border
                                border-zinc-200/60
                                dark:border-zinc-800"
                              >

                                {
                                  notification
                                    .comment
                                    .content
                                }

                              </div>

                            )}

                          </div>

                        )}


                      <p
                        className="
                        text-sm
                        text-zinc-500
                        dark:text-zinc-400
                        pl-8"
                      >

                        {formatDistanceToNow(
                          new Date(
                            notification.createdAt
                          ),
                          {
                            addSuffix: true,
                          }
                        )}

                      </p>

                    </div>

                  </div>

                )
              )

            )}

          </ScrollArea>

        </CardContent>

      </Card>

    </div>
  );
}

export default NotificationsPage;