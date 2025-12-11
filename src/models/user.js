import mongoose from "mongoose";
import { number } from "zod";
const { schema } = mongoose;
const userSchema = new schema({
  firstName: {
    type: string,
    requierd: true,
  },
  lastName: {
    type: string,
  },
  age: {
    type: number,
  },
  gender: {
    type: string,
  },
});
export const User = mongoose.model("User", userSchema);
