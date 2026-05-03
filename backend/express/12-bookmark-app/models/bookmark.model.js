import mongoose from "mongoose";

const bookmarkSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      default: "general",
    },

  },
  { timestamps: true },
);

const bookmarkModel = mongoose.model("Bookmark", bookmarkSchema);

export default bookmarkModel;
