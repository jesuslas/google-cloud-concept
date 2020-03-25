const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const app = express();
var fileupload = require("express-fileupload");
const path = require("path");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  fileupload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "temp")
  })
);
const image = require("./modules/image");
const audio = require("./modules/audio");

router.use(
  bodyParser.urlencoded({
    extended: false
  })
); // for parsing application/x-www-form-urlencoded

router.use((req, res, next) => {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");
  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  // Request headers you wish to allow
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type"
  );
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  //   res.setHeader("Access-Control-Allow-Credentials", false);
  // Pass to next layer of middleware
  next();
});
router.post("/image", image.getImageInfo);
router.post("/audio", audio.getAudioInfo);
router.get("/*", (_, res) => res.send("it works"));
// router.use("*", (_, res) => res.redirect("/"));
app.use("/", router);

module.exports = app;
