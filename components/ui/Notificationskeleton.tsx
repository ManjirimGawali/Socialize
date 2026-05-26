import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

export function NotificationsSkeleton() {
  // array of 5 items
  const skeletonItems = Array.from({ length: 5 }, (_, i) => i);

  return (
    <div className="space-y-4">
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
        <CardHeader className="
px-8
py-6
border-b
border-zinc-200/70
dark:border-zinc-800">
          <div className="flex items-center justify-between">
            <CardTitle className="
text-2xl
font-semibold
tracking-[-0.02em]">Notifications</CardTitle>
            <Skeleton className="
h-8
w-24
rounded-full" />
          </div>
        </CardHeader>
        <CardContent className="p-2">
          <ScrollArea className="h-[calc(100vh-14rem)]">
            {skeletonItems.map((index) => (
              <div key={index} className="flex items-start gap-4 p-6 border-b border-zinc-200/50
dark:border-zinc-800
hover:bg-zinc-50/50
dark:hover:bg-zinc-900/40
transition-all
duration-300">
                <Skeleton className="
h-12
w-12
rounded-full"/>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <Skeleton className="
h-5
w-5
rounded-md" />
                    <Skeleton className="h-4 w-48 rounded-md" />
                  </div>
                  <div className="pl-6 space-y-2">
                    <Skeleton className="
h-24
w-full
rounded-2xl" />
                    <Skeleton className="
h-4
w-28
rounded-md" />
                  </div>
                </div>
              </div>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}