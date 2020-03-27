const {
  getAudioText,
  getBuckets,
  getTextSentiment,
  getTextAnalyzeEntities,
  uploadFIleToBucket,
  deleteFIleToBucket
} = require("../service");
const fs = require("fs");
const ffmpeg = require("ffmpeg");
const path = require("path");
const moment = require("moment");
const child_process = require("child_process");
const exec = child_process.exec;

function getExtension(filename) {
  var ext = (filename || "").split(".");
  return ext[ext.length - 1];
}
const getAudioTime = fileTempPath => {
  return new Promise((resolve, reject) => {
    try {
      new ffmpeg(fileTempPath, function(err, audio) {
        if (!err) {
          resolve(audio.metadata.duration.raw);
        } else {
          console.log("Error: " + err);
          reject(err);
        }
      });
    } catch (e) {
      console.log(e.code);
      console.log(e.msg);
      reject(e);
    }
  });
};
const generateMonoAudio = async (file, tempFilePath) => {
  return new Promise((resolve, reject) => {
    try {
      exec(
        // `ffmpeg -i ${file} -af aformat=s16:48000 -ac 1 -ss 00:00:00.0 -t 00:01:00.0 ${tempFilePath}`,
        `ffmpeg -i ${file} -af aformat=s16:48000 -ac 1 ${tempFilePath}`,
        resolve
      );
    } catch (e) {
      console.log(e.code);
      console.log(e.msg);
      reject(e);
    }
  });
};
class Image {
  async getAudioInfo(file, fileName) {
    const original = `${file}`;
    try {
      const tempFilePath = path.join(
        path.dirname(__dirname),
        "temp/",
        `output-converted${moment().unix()}.flac`
      );
      const duration = await getAudioTime(file);
      await generateMonoAudio(file, tempFilePath);
      file = tempFilePath;
      if (parseInt(duration.split(":")[1]) > 1) {
        if (parseInt(duration.split(":")[1]) > 15) {
          return {
            error: "Debe seleccionar un archivo de audio que dure menos de 15m"
          };
        }
        await getBuckets();
        file = await uploadFIleToBucket(file);
      }
      let [response] = await getAudioText(file);
      if (parseInt(duration.split(":")[1]) > 1) {
        [response] = await response.promise();
      }
      const transcription = response.results
        .map(result => result.alternatives[0].transcript)
        .join("\n");
      const [analyzeEntities] = await getTextAnalyzeEntities(transcription);
      const [result] = await getTextSentiment(transcription);
      const entities = analyzeEntities.entities;
      const sentiment = result.documentSentiment;
      await fs.unlink(original, erro => console.log);
      await fs.unlink(tempFilePath, erro => console.log);
      if (parseInt(duration.split(":")[1]) > 1) {
        await deleteFIleToBucket(tempFilePath);
      }
      return { transcription, entities, sentiment };
    } catch (error) {
      console.log("error22", error);
      throw error;
    }
  }
}

module.exports = new Image();
