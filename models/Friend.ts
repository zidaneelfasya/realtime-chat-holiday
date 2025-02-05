import mongoose, { Document, Model, Schema, Types } from "mongoose";

export interface IFriend extends Document {
    user: Types.ObjectId;
    friend: Types.ObjectId;
}

const FriendSchema: Schema<IFriend> = new Schema(
    {
      user: { type: Types.ObjectId, ref: "User", required: true }, 
      friend: { type: Types.ObjectId, ref: "User", required: true },
    },
    { timestamps: true }
  );
  
  export default (mongoose.models.Friend as Model<IFriend>) || mongoose.model<IFriend>("Friend", FriendSchema);