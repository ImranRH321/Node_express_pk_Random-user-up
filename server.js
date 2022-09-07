const express = require("express");
const { dbContact } = require("./utils/dbContact");
const app = express();
const PORT = process.env.PORT || 5000;
const profileRouter = require("./routes/profile.route");
const dashboardRoute = require("./routes/dashboard.route");

app.get("/", (req, res) => {
  res.send("<h1>Home Route for server</h1>");
});

app.use(express());

dbContact();

app.use('/profile', profileRouter);
app.use('/dashboard', dashboardRoute) 

app.listen(PORT, () => {
  console.log(`server is running http://localhost:${PORT}`);
});
