import { useState } from "react";
import ListFriend from "./ListFriend";
import Sidebar from "./Sidebar";
import Search from "./ui/Search";
import HELPER from "@/helpers/helper"

export default function ChatSidebar() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className=" flex w-1/4">
      <div className="flex-1 bg-gray-900 text-white p-4 rounded-l-3xl">

        <h2 className="text-xl font-bold">Friends</h2>
        <Search onSubmit={()=>{
          HELPER.Axios('POST', "/api/user", {username: searchQuery}).then(res => {
            console.log(res.data)
          })
        }} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{
          setSearchQuery(e.target.value)
        }}/>
        <div>
          <ListFriend text="Hello" name="zidane" />
          <ListFriend text="Hello" name="zidane" />
        </div>
        {/* Tambahkan daftar chat di sini */}
      </div>
    </div>
  );
}
