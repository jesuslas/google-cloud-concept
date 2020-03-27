const { apiBaseUrl } = require("../config");
const fetch = require("node-fetch");
const { Storage } = require("@google-cloud/storage");
const vision = require("@google-cloud/vision");
const speech = require("@google-cloud/speech");
const language = require("@google-cloud/language");
const fs = require("fs");

module.exports.getDatos = async function getDatos() {
  return await fetch(`${apiBaseUrl}`);
  // return datos;
};

module.exports.getBuckets = async function getBuckets() {
  // Instantiates a client. If you don't specify credentials when constructing
  // the client, the client library will look for credentials in the
  // environment.
  const storage = new Storage();

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

module.exports.getAudioText = async function getAudioText(
  data,
  encod,
  sampleRate,
  channels
) {
  const file = fs.readFileSync(data);
  const audioBytes = file.toString("base64");
  const audio = {
    content: audioBytes
  };
  const config = {
    encoding: encod,
    sampleRateHertz: sampleRate,
    audioChannelCount: channels,
    languageCode: "es"
  };
  const request = {
    audio: audio,
    config: config
  };
  const client = new speech.SpeechClient();
  return await client.recognize(request);
};
