import ListFriend from "./ListFriend";
import Sidebar from "./Sidebar";
import Search from "./ui/Search";

export default function ChatSidebar() {
  return (
    <div className=" flex w-1/4">
      <div className="flex-1 bg-gray-900 text-white p-4 rounded-l-3xl">

        <h2 className="text-xl font-bold">Friends</h2>
        <Search/>
        <div>
          <ListFriend text="Hello" name="zidane" />
          <ListFriend text="Hello" name="zidane" />
        </div>
        {/* Tambahkan daftar chat di sini */}
      </div>
    </div>
  );
}
