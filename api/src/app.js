const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const app = express();
var fileupload = require("express-fileupload");
const { response } = require("./responses");
const path = require("path");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  fileupload({
    useTempFiles: true,
    safeFileNames: true,
    preserveExtension: 10,
    tempFileDir: path.join(__dirname, "temp")
  })
);
const image = require("./modules/image");
const audio = require("./modules/audio");

router.use(
  bodyParser.urlencoded({
    extended: false
  })
);

router.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type"
  );
  next();
});
router.post("/image", ({ files: { files: { tempFilePath, name } } }, res) =>
  response(res)(() => image.getImageInfo(tempFilePath, name))
);
router.post("/audio", ({ files: { files: { tempFilePath, name } } }, res) =>
  response(res)(() => audio.getAudioInfo(tempFilePath, name))
);
router.get("/*", (_, res) => res.send("it works"));
app.use("/", router);

module.exports = app;
