import { FC } from "react";

interface ListFriendProps {
  name: string;
  text: string;
}

const ListFriend: FC<ListFriendProps> = ({ name, text }) => {
  return (
    <div className="p-2 bg-gray-700 rounded-lg my-2 ">
      <div className="flex justify-between">
        <p className="text-lg text-gray-300">{name}</p>
      </div>
      <div>
        <p className="text-sm text-white">{text}</p>
      </div>
    </div>
  );
};

export default ListFriend;
