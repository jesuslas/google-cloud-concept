const { ok, fail } = require("../responses");
const { translate } = require("./utils");
const {
  getBuckets,
  getImageObjects,
  getImageFaces,
  getImageExplicitContent
} = require("../service");

class Image {
  async getImageInfo(req, res) {
    const file = req.files.files.tempFilePath;
    try {
      await getBuckets();
      const [result] = await getImageObjects(file);
      const [result_faces] = await getImageFaces(file);
      const [result_explicit] = await getImageExplicitContent(file);
      let objects = result.localizedObjectAnnotations;
      let faceAnnotations = result_faces.faceAnnotations;
      objects = objects.map(({ name }) => name);
      const faces = faceAnnotations.map((face, i) => {
        return {
          faceNum: `Face #${i + 1}`,
          joyLikelihood: translate(face.joyLikelihood),
          angerLikelihood: translate(face.angerLikelihood),
          sorrowLikelihood: translate(face.sorrowLikelihood),
          surpriseLikelihood: translate(face.surpriseLikelihood)
        };
      });

      const detections = result_explicit.safeSearchAnnotation;
      const explicitContent = {};
      explicitContent["adult"] = translate(detections.adult);
      explicitContent["medical"] = translate(detections.medical);
      explicitContent["spoof"] = translate(detections.spoof);
      explicitContent["violence"] = translate(detections.violence);
      explicitContent["racy"] = translate(detections.racy);
      ok(res)({ objects, faces, detections: explicitContent });
    } catch (error) {
      console.log("error", error);
      fail(res)(error);
    }
  }
}

module.exports = new Image();
