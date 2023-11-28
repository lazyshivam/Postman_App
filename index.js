const express = require("express");
const cookie_session = require("express-session");
const cors = require("cors");
const passport = require("./passportAuth"); // Import your Passport configuration
require("dotenv").config();
const connectToMongo=require("./db");

const app = express();
const port = 8000;
//function call to connect to the mongoDb Database
connectToMongo();
// Middleware setup
app.use(
  cors({
		origin: process.env.Home_URL,
		methods: "GET,POST,PUT,DELETE",
		credentials: true,
	})
);
app.use(express.json());
// app.use(express.urlencoded({extended: true}));

app.use(
  cookie_session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
app.use(passport.initialize());
app.use(passport.session());
// console.log(process.env.SECRET_KEY)

app.use("/auth", require("./routes/auth"));
app.use("/api/data", require("./routes/apiLinks"))


app.all('*', (req, res) => {
  res.status(404).json({ error: 'Not Found' });
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});