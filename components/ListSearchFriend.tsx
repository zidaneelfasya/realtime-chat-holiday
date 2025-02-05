import { FC } from "react";

interface ListSearchFriendProps {
  name: string;
}

const ListSearchFriend: FC<ListSearchFriendProps> = ({ name }) => {
  if (!name)
    return (
      <div className="p-2 bg-gray-700 rounded-lg my-2 ">
        <div className="flex justify-between">
          <p className="text-lg text-gray-300">Not Found</p>
        </div>
      </div>
    );
  return (
    <div className="p-2 bg-gray-700 rounded-lg my-2 ">
      <div className="flex justify-between">
        <p className="text-lg text-gray-300">{name}</p>
      </div>
    </div>
  );
};

export default ListSearchFriend;
