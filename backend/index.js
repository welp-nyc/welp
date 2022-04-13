const express = require("express");
const app = express();

const mongoose = require("mongoose");
const dotenv = require("dotenv");

const userRoute = require("./routes/users");
const pinRoute = require("./routes/pins");

dotenv.config();

app.use(express.json())

mongoose
  .connect(process.env.MONGO_URL, { 
    useNewUrlParser: true ,
    // useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected!"))
  .catch(err => console.log(err));

app.use("/api/users", userRoute);
app.use("/api/pins", pinRoute);

app.use(express.static(path.join(__dirname, "/frontend/build")));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/frontend/build', 'index.html'));
});

app.listen(process.env.PORT || 8800, () => {
  console.log("Backend server is running!");
});