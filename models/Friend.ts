import mongoose, { Document, Model, Schema, Types } from "mongoose";

export interface IFriend extends Document {
    user: Types.ObjectId;
    friend: Types.ObjectId;
    status: String;
}

const FriendSchema: Schema<IFriend> = new Schema(
    {
      user: { type: Types.ObjectId, ref: "User", required: true }, 
      friend: { type: Types.ObjectId, ref: "User", required: true },
      status: { type: String, enum: ["pending", "accepted", "declined"], default: "pending" },
    },
    { timestamps: true }
  );
  
  export default (mongoose.models.Friend as Model<IFriend>) || mongoose.model<IFriend>("Friend", FriendSchema);