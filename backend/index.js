const app = require("express")();
require("dotenv").config();
const port = process.env.PORT || 4040;

app.use(require("express").urlencoded({ extended: true }));
app.use(require("express").json());

async function connectingToDB() {
  try {
    await require("mongoose").connect(process.env.MONGO, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("Connected to the DB ✅");
  } catch (error) {
    console.log("ERROR: Your DB is not running, start it up ☢️");
  }
}
connectingToDB();

//==========================================================================
app.use(require("cors")());
//==========================================================================
app.use("/users", require("./routes/users.js"));
app.use("/posts", require("./routes/posts.js"));
//==========================================================================
app.listen(port, () => console.log("🚀 Listening on port: " + port + " 🚀"));
