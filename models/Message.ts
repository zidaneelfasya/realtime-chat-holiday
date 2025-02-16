import mongoose, { Document, Model, Schema, Types } from "mongoose";

export interface IMessage extends Document {
  sender: Types.ObjectId;
  receiver: Types.ObjectId;
  content: string;
  status: string;
}

const MessageSchema: Schema<IMessage> = new Schema(
  {
    sender: { type: Types.ObjectId, ref: "User", required: true },
    receiver: { type: Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    status: { type: String, enum: ["sent", "delivered", "read"], default: "sent" },
  },
  { timestamps: true }
);

export default (mongoose.models.Message as Model<IMessage>) || mongoose.model<IMessage>("Message", MessageSchema);
