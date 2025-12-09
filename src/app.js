import express from "express";
const app = express();

app.use(
  "/user",
  (req, res, next) => {
    console.log("handling first user request");

    next();
    res.send("user request handles 1st time");
  },
  (req, res, next) => {
    console.log("handling second user request");
    // res.send("user request handles 2nd time");
  }
);
app.listen(3001, () => {
  console.log("server is runnning on port 3001");
});
