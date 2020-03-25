const { ok, fail } = require("../responses");
const {
  getAudioText,
  getBuckets,
  getTextSentiment,
  getTextAnalyzeEntities
} = require("../service");

class Image {
  async getAudioInfo(req, res) {
    try {
      await getBuckets();
      const [response] = await getAudioText(req.files.files.tempFilePath);
      const transcription = response.results
        .map(result => result.alternatives[0].transcript)
        .join("\n");
      const [result] = await getTextSentiment(transcription);
      const [analyzeEntities] = await getTextAnalyzeEntities(transcription);
      const entities = analyzeEntities.entities;
      const sentiment = result.documentSentiment;
      ok(res)({ transcription, sentiment, entities });
    } catch (error) {
      console.log("error", error);
      fail(res)(error);
    }
  }
}

module.exports = new Image();
