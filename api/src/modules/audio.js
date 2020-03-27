const {
  getAudioText,
  getBuckets,
  getTextSentiment,
  getTextAnalyzeEntities
} = require("../service");
const path = require("path");
const child_process = require("child_process");
const exec = child_process.exec;
let CHANELS = 2;
let SAMPLERATE = 8000;
var ffmpeg = require("ffmpeg");

function getExtension(filename) {
  var ext = (filename || "").split(".");
  return ext[ext.length - 1];
}
const encoding = { opus: "OGG_OPUS", flac: "FLAC" };

const tranforEncodToFlac = file => {
  exec(
    `ffmpeg -i ${file} ${path.join(
      path.dirname(__dirname),
      "temp/",
      "output.flac"
    )}`
  );
};
class Image {
  async getAudioInfo(file, filename) {
    try {
      let ext = getExtension(filename);
      if (ext !== "opus") {
        if (ext === "mp3" || ext === "wav") {
          tranforEncodToFlac(file);
          file = path.join(path.dirname(__dirname), "temp/", "output.flac");
          ext = "flac";
        }
      }
      new ffmpeg(file, function(err, _file) {
        SAMPLERATE = _file.metadata.audio.sample_rate;
        CHANELS = _file.metadata.audio.channels.value;
      });

      await getBuckets();
      const [response] = await getAudioText(
        file,
        encoding[ext] || "OGG_OPUS",
        SAMPLERATE,
        CHANELS
      );
      const transcription = response.results
        .map(result => result.alternatives[0].transcript)
        .join("\n");
      const [analyzeEntities] = await getTextAnalyzeEntities(transcription);
      const [result] = await getTextSentiment(transcription);
      const entities = analyzeEntities.entities;
      const sentiment = result.documentSentiment;
      return { transcription, entities, sentiment };
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  }
}

module.exports = new Image();
