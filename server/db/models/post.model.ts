import mongoose, { Schema, Types } from "mongoose"
import { IPostDoc } from "../../../interfaces/models/IPost"

const userSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    // user: { type: Types.ObjectId, ref: "User", index: true, required: true },
  },
  { timestamps: true }
)

export default mongoose.model<IPostDoc>("Post", userSchema)
