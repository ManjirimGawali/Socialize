"use client";

import { SignInButton } from "@clerk/nextjs";
import { SignUpButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export default function WelcomeHero() {
  return (
    <div className="w-full min-h-[calc(100vh-80px)] px-3 sm:px-4 py-4">

      <section
        className="
        relative
        overflow-hidden
        rounded-[28px] lg:rounded-[40px]
        border
        border-zinc-200/70
        dark:border-zinc-800
        bg-white/80
        dark:bg-zinc-950/80
        backdrop-blur-xl
        shadow-[0_8px_40px_rgba(0,0,0,0.04)]"
      >

        {/* background glow */}

        <div className="absolute right-0 top-0 h-[180px] w-[180px] lg:h-[350px] lg:w-[350px] rounded-full bg-violet-500/10 blur-[90px] lg:blur-[120px]" />

        <div className="absolute bottom-0 left-0 h-[180px] w-[180px] lg:h-[300px] lg:w-[300px] rounded-full bg-blue-500/10 blur-[90px] lg:blur-[120px]" />


        <div
          className="
          grid
          grid-cols-1
          lg:grid-cols-2
          items-center
          gap-10 lg:gap-16
          px-5 sm:px-8 lg:px-16
          py-8 lg:py-14"
        >

          {/* LEFT */}

          <div
            className="
            max-w-xl
            text-center
            lg:text-left
            order-2 lg:order-1"
          >

            <p
              className="
              uppercase
              tracking-[0.25em]
              text-[10px]
              sm:text-xs
              text-zinc-500"
            >

              Where conversations begin

            </p>

            <h1
              className="
              mt-4
              text-3xl
              sm:text-5xl
              lg:text-6xl
              font-semibold
              leading-[1.05]
              tracking-[-0.04em]
              dark:text-white"
            >

              Meet people.
              <br />

              Share moments.
              <br />

              <span className="relative inline-block">

                Build meaningful
                connections.

                <span
                  className="
                  absolute
                  left-0
                  bottom-1
                  lg:bottom-2
                  h-3
                  lg:h-4
                  w-full
                  rounded-full
                  bg-violet-400/20
                  blur-md
                  -z-10"
                />

              </span>

            </h1>

            <p
              className="
              mt-6
              text-sm
              sm:text-base
              lg:text-lg
              leading-7
              text-zinc-500
              dark:text-zinc-400"
            >

              Discover communities,
              create authentic connections
              and enjoy meaningful moments.

            </p>


            <div
              className="
              mt-8
              flex
              flex-col
              sm:flex-row
              justify-center
              lg:justify-start
              gap-3"
            >

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



              
            </div>

          </div>



          {/* RIGHT IMAGE */}

          <div
            className="
            relative
            flex
            justify-center
            order-1 lg:order-2"
          >

            <div
              className="
              h-[280px]
              w-[220px]

              sm:h-[400px]
              sm:w-[300px]

              lg:h-[500px]
              lg:w-[380px]

              overflow-hidden
              rounded-[28px]
              lg:rounded-[40px]
              border
              border-zinc-200
              dark:border-zinc-800
              shadow-xl"
            >

              <img
                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1200&auto=format&fit=crop"
                alt="social"
                className="h-full w-full object-cover"
              />

            </div>


            {/* floating card */}

            <div
              className="
              hidden sm:flex

              absolute
              top-10
              lg:top-20

              -left-4
              lg:-left-8

              rounded-[24px]
              border
              border-zinc-200/70
              dark:border-zinc-800

              bg-white/80
              dark:bg-zinc-950/80

              backdrop-blur-xl
              px-4
              py-3
              shadow-lg"
            >

              <div className="flex gap-3">

                <img
                  src="https://i.pravatar.cc/100?img=12"
                  className="h-10 w-10 rounded-full"
                />

                <div>

                  <p className="font-medium dark:text-white">

                    Sarah

                  </p>

                  <p className="text-xs text-zinc-500">

                    New connection

                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}