"use client";

import ListFriend from "@/components/ListFriend";
import Search from "@/components/ui/Search";
import HELPER from "@/helpers/helper";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AddFriendPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
 
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#191f29]">
      <div className=" bg-[#0F1215] px-8 py-12 rounded-3xl shadow-lg w-96 h-[500px]">
        <h2 className="text-white text-xl mb-10">Login</h2>
        <Search
          onSubmit={() => {
            HELPER.Axios("POST", "/api/user", {
              params: { username: searchQuery },
            })
              .then((res) => {
                console.log(res.data.data); // Menyimpan hasil pencarian
              })
              .catch((err) => console.log(err));
          }}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setSearchQuery(e.target.value);
          }}
        />  
        {/* {searchResults.map((user) => (
          <div key={user._id} className="text-white border-b py-2">
            {user.username}{" "}
            
          </div>
        ))} */}

        {/* <ListSearchFriend /> */}
      </div>
    </div>
  );
}
