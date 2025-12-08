import express from "express";
const app = express();
app.use("/", (req, res) => {
  res.send("Helo from express server");
});
app.listen(3000, () => {
  console.log("server is runnning on port 3000");
});
