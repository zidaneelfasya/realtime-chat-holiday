import { useEffect, useState } from "react";
import ListFriend from "./ListFriend";
import Sidebar from "./Sidebar";
import Search from "./ui/Search";
import HELPER from "@/helpers/helper";

export default function ChatSidebar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<
    { _id: string; username: string }[]
  >([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFriends = async () => {
      setLoading(true);
      try {
        const res = await HELPER.Axios("GET", "/api/friend");
        setSearchResults(res.data.data);
      } catch (error) {
        console.error("Error fetching friends:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFriends();
  }, []);

  return (
    <div className=" flex w-1/4">
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
          ) : searchResults.length > 0 ? (
            searchResults.map((friend) => (
              <ListFriend key={friend._id} text="Hallo" name={friend.username} />
            ))
          ) : (
            <p>No friends found</p>
          )}
        </div>
        <div>
          <ListFriend text="Hello" name="isi disini untuk nama" />
          <ListFriend text="Hello" name="zidane" />
        </div>
        {/* Tambahkan daftar chat di sini */}
      </div>
    </div>
  );
}
