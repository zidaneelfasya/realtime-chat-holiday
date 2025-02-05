"use client";

import ListFriend from "@/components/ListFriend";
import Search from "@/components/ui/Search";
import HELPER from "@/helpers/helper";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AddFriendPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<
    { _id: string; username: string }[]
  >([]);
  const handleSearch = () => {
    HELPER.Axios("GET", "/api/user", { username: searchQuery })
      .then((res) => {
        console.log(res.data.data);
        setSearchResults(res.data.data);
        console.log(searchResults); // Simpan hasil pencarian ke state
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#191f29]">
      <div className=" bg-[#0F1215] px-8 py-12 rounded-3xl shadow-lg w-96 h-[500px]">
        <h2 className="text-white text-xl mb-10">Login</h2>
        <Search
          onSubmit={(handleSearch)}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
        />
        <div className="mt-5">
          {searchResults.length > 0 ? (
            <ul className="text-white">
              {searchResults.map((user) => (
                <li
                  key={user._id}
                  className="p-2 border-b border-gray-700 flex justify-between"
                >
                  {user.username}
                  <button
                    className="bg-blue-500 px-2 py-1 text-white rounded"
                    onClick={() =>
                      console.log(
                        `Mengirim permintaan pertemanan ke ${user.username}`
                      )
                    }
                  >
                    Tambah
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">Tidak ada hasil</p>
          )}
        </div>

        {/* <ListSearchFriend /> */}
      </div>
    </div>
  );
}
