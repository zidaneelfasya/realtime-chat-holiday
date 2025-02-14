import { useEffect, useState } from "react";
import ListFriend from "./ListFriend";
import Sidebar from "./Sidebar";
import Search from "./ui/Search";
import HELPER from "@/helpers/helper";


interface Friend {
  _id: string;
  username: string;
}

interface ChatSidebarProps {
  friends: Friend[];
  loading: boolean;
  onSelectFriend: (friend: Friend) => void;
}

export default function ChatSidebar({
  friends,
  loading,
  onSelectFriend,
}: ChatSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex w-1/4">
      <div className="flex-1 bg-gray-900 text-white p-4 rounded-l-3xl">
        <h2 className="text-xl font-bold">Friends</h2>
        <Search
          onSubmit={() => {
            HELPER.Axios("POST", "/api/user", { username: searchQuery }).then(
              (res) => {
                console.log(res.data);
              }
            );
          }}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setSearchQuery(e.target.value);
          }}
        />

        <div>
          {loading ? (
            <p>Loading friends...</p>
          ) : friends.length > 0 ? (
            friends
              .filter((friend) =>
                friend.username.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((friend) => (
                <div
                  key={friend._id}
                  onClick={() => onSelectFriend(friend)}
                  className=" "
                >
                  <ListFriend text="Hallo" name={friend.username} />
                </div>
              ))
          ) : (
            <p>No friends found</p>
          )}
        </div>
      </div>
    </div>
  );
}
