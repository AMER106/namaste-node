import express from "express";
const app = express();

app.use("/about", (req, res) => {
  res.send("hello this is our about page");
});
app.get("/user", (req, res) => {
  res.send("hello user");
});
app.post("/user", (req, res) => {
  res.send("hey user you are saved in our db");
});
app.use("/", (req, res) => {
  res.send("Helo from express server");
});
app.listen(3001, () => {
  console.log("server is runnning on port 3001");
});
