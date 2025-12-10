import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://amer:Goq1OdJxWZVtNzBD@namastenode.lcindlj.mongodb.net/devT"
  );
};
