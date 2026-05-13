import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
      minLength: 6
    },
    profilePicture: {
      type: String,
      require: true,
      default: ""


    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;