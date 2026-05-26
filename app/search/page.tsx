import SearchUsers from "@/components/ui/SearchUser";

export default function SearchPage() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">

      <div
        className="
        relative

        rounded-[32px]

        border
        border-zinc-200/70
        dark:border-zinc-800

        bg-white/80
        dark:bg-zinc-950/80

        backdrop-blur-xl

        shadow-[0_8px_40px_rgba(0,0,0,0.04)]

        overflow-visible

        p-8
        "
      >

        {/* Heading */}

        <div className="mb-10">

          <p
            className="
            uppercase
            tracking-[0.25em]
            text-xs
            text-zinc-500"
          >
            Discover people
          </p>

          <h1
            className="
            mt-3
            text-4xl
            font-semibold
            tracking-[-0.04em]
            dark:text-white"
          >
            Search connections
          </h1>

          <p
            className="
            mt-4
            text-zinc-500
            dark:text-zinc-400
            max-w-2xl
            leading-7"
          >
            Find people, discover communities,
            and connect with others on Socialize.
          </p>

        </div>


        {/* Search */}

        <div
          className="
          max-w-3xl
          relative
          z-50"
        >

          <SearchUsers />

        </div>

      </div>

    </div>
  );
}