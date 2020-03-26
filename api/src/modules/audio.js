const {
  getAudioText,
  getBuckets,
  getTextSentiment,
  getTextAnalyzeEntities
} = require("../service");

class Image {
  async getAudioInfo(file) {
    try {
      await getBuckets();
      const [response] = await getAudioText(file);
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
