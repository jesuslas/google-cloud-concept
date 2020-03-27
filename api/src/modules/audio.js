const {
  getAudioText,
  getBuckets,
  getTextSentiment,
  getTextAnalyzeEntities
} = require("../service");
const fs = require("fs");

function getExtension(filename) {
  var ext = (filename || "").split(".");
  return ext[ext.length - 1];
}
const encoding = { opus: "OGG_OPUS", flac: "FLAC" };
class Image {
  async getAudioInfo(file, filename) {
    const original = `${file}`;
    try {
      let ext = getExtension(filename);
      if (ext !== "opus") {
        return { error: "formato no disponible" };
      }
      await getBuckets();
      const [response] = await getAudioText(file);
      const transcription = response.results
        .map(result => result.alternatives[0].transcript)
        .join("\n");
      const [analyzeEntities] = await getTextAnalyzeEntities(transcription);
      const [result] = await getTextSentiment(transcription);
      const entities = analyzeEntities.entities;
      const sentiment = result.documentSentiment;
      await fs.unlink(original, erro => console.log);
      return { transcription, entities, sentiment };
    } catch (error) {
      console.log("error22", error);
      throw error;
    }
  }
}

module.exports = new Image();
