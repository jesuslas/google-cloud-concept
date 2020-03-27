const { apiBaseUrl, bucketName } = require("../config");
const fetch = require("node-fetch");
const { Storage } = require("@google-cloud/storage");
const vision = require("@google-cloud/vision");
const speech = require("@google-cloud/speech");
const language = require("@google-cloud/language");
const fs = require("fs");
const path = require("path");
const storage = new Storage();

module.exports.getDatos = async function getDatos() {
  return await fetch(`${apiBaseUrl}`);
};

module.exports.getBuckets = async function getBuckets() {
  // Instantiates a client. If you don't specify credentials when constructing
  // the client, the client library will look for credentials in the
  // environment.

  try {
    // Makes an authenticated API request.
    const results = await storage.getBuckets();
    const [buckets] = results;
    buckets.forEach(bucket => {
      console.log(bucket.name);
    });
  } catch (err) {
    console.error("ERROR:", err);
  }
};

module.exports.deleteFIleToBucket = async function deleteFIleToBucket(file) {
  try {
    const bucket = storage.bucket(bucketName);
    const fileName = path.basename(file);
    const fileBucket = bucket.file(`uploads/${fileName}`);
    await fileBucket.delete();
  } catch (error) {
    throw error;
  }
};
module.exports.uploadFIleToBucket = async function uploadFIleToBucket(
  file,
  options
) {
  options = options || {};
  const bucket = storage.bucket(bucketName);
  const fileName = path.basename(file);
  const fileBucket = bucket.file(`uploads/${fileName}`);

  return bucket
    .upload(file, { ...options, destination: `uploads/${fileName}` })
    .then(() => fileBucket.makePublic())
    .then(() => exports.getBucketPublicUrl(bucketName, fileName));
};
exports.getBucketPublicUrl = (bucketName, fileName) =>
  `gs://${bucketName}/uploads/${fileName}`;

module.exports.getImageObjects = async function getImageObjects(data) {
  const client = new vision.ImageAnnotatorClient();
  return await client.objectLocalization(data);
};
module.exports.getImageFaces = async function getImageFaces(data) {
  const client = new vision.ImageAnnotatorClient();
  return await client.faceDetection(data);
};

module.exports.getImageExplicitContent = async function getImageExplicitContent(
  data
) {
  const client = new vision.ImageAnnotatorClient();
  return await client.safeSearchDetection(data);
};

module.exports.getTextSentiment = async function getTextSentiment(data) {
  const document = {
    content: data,
    type: "PLAIN_TEXT"
  };
  const client = new language.LanguageServiceClient();
  return await client.analyzeSentiment({ document });
};
module.exports.getTextAnalyzeEntities = async function getTextAnalyzeEntities(
  data
) {
  const document = {
    content: data,
    type: "PLAIN_TEXT"
  };
  const client = new language.LanguageServiceClient();
  return await client.analyzeEntities({ document });
};

module.exports.getAudioText = async function getAudioText(data) {
  let eject = "longRunningRecognize";
  let audio = {};
  if (!data.includes("gs://")) {
    const file = fs.readFileSync(data);
    data = file.toString("base64");
    eject = "recognize";
    audio = {
      content: data
    };
  } else {
    audio = {
      uri: data
    };
  }

  const config = {
    encoding: "FLAC",
    sampleRateHertz: 48000,
    languageCode: "es"
  };
  const request = {
    audio: audio,
    config: config
  };
  const client = new speech.SpeechClient();
  return await client[eject](request);
};
