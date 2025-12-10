export const auth = (req, res, next) => {
  const token = "xy";
  const isAuthenticated = token === "xyz";
  if (!isAuthenticated) {
    console.log("Unauthorized access attempt");
    return res.status(401).send("Unauthorized");
  }
  next();
};

export const user = (req, res, next) => {
  const token = "abc";
  const isAuthenticated = token === "abc";
  if (!isAuthenticated) {
    console.log("Unauthorized access attempt");
    return res.status(401).send("Unauthorized");
  }
  next();
};
