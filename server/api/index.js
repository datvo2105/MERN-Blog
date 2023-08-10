const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();

require("dotenv").config();
require("./configs/db.config").call();

const PORT = process.env.PORT || 1337;
const corsOption = {
  origin: `${process.env.FE_ENV}`,
  credentials: true,
};

app.use("/public", express.static("public"));
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOption));

app.get("/", (req, res) => {
  try {
    res.json("Server is running");
  } catch (error) {
    throw new Error("Server is broken.");
  }
});

const routerAuth = require("./routes/auth.route");
const routerBlog = require("./routes/blog.route");

app.use("/v1/auth", routerAuth);
app.use("/v1/blog", routerBlog);

app.listen(PORT, () => {
  console.log(`Server is running on: http://127.0.0.1:${PORT}`);
});
