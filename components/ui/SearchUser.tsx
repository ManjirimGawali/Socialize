"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";

import { searchUsers as searchUsersAction } from "@/actions/search.actions";

import { Input } from "./input";
import { Avatar, AvatarImage } from "./avatar";

type UserResult = {
  id: string;
  name: string | null;
  username: string;
  image: string | null;

  _count: {
    followers: number;
  };
};

function SearchUsers() {
  const [query, setQuery] = useState("");

  const [debouncedQuery,
    setDebouncedQuery] = useState("");

  const [users,
    setUsers] =
      useState<UserResult[]>([]);


  /* Debounce logic */

  useEffect(() => {

    const timer = setTimeout(() => {

      setDebouncedQuery(query);

    },300);

    return ()=>clearTimeout(timer);

  },[query]);


  /* Search only after delay */

  useEffect(()=>{

    const fetchUsers=async()=>{

      if(!debouncedQuery.trim()){

        setUsers([]);

        return;
      }

      try{

        const results=
        await searchUsersAction(
          debouncedQuery
        );

        setUsers(results);

      }catch(error){

        console.log(error);

      }

    };

    fetchUsers();

  },[debouncedQuery]);


  return (

    <div className="relative w-full">

      {/* Search box */}

      <div
      className="
      flex
      items-center
      rounded-2xl
      border
      border-zinc-200/70
      dark:border-zinc-800
      bg-white/80
      dark:bg-zinc-950/80
      backdrop-blur-xl
      px-5
      h-14"
      >

        <Search
        className="
        h-5
        w-5
        text-zinc-400
        mr-3"
        />

        <Input
        value={query}

        onChange={(e)=>
        setQuery(e.target.value)
        }

        placeholder="Search people..."

        className="
        border-0
        bg-transparent
        focus-visible:ring-0
        focus-visible:ring-offset-0"
        />

      </div>



      {/* Results */}

      {users.length>0 &&(

      <div
      className="
      absolute
      top-16
      left-0
      w-full
      z-[100]

      rounded-[28px]

      border
      border-zinc-200/70
      dark:border-zinc-800

      bg-white/95
      dark:bg-zinc-950/95

      backdrop-blur-xl

      shadow-[0_12px_50px_rgba(0,0,0,0.12)]

      max-h-[420px]

      overflow-y-auto"
      >

      {users.map((user)=>(

      <Link
      key={user.id}
      href={`/profile/${user.username}`}

      className="
      flex
      items-center
      gap-4
      px-6
      py-5

      border-b
      border-zinc-200/40
      dark:border-zinc-800

      hover:bg-zinc-100/70
      dark:hover:bg-zinc-900/70

      last:border-none"
      >

      <Avatar
      className="
      h-14
      w-14"
      >

      <AvatarImage
      src={
      user.image ??
      "/avatar.png"
      }
      />

      </Avatar>


      <div>

      <p className="font-medium">

      {user.name}

      </p>

      <p
      className="
      text-sm
      text-zinc-500"
      >

      @{user.username}

      </p>

      </div>

      </Link>

      ))}

      </div>

      )}

    </div>

  );
}

export default SearchUsers;