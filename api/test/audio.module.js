var assert = require("assert");
const audio = require("../src/modules/audio");

describe("Shold get a object response", function() {
  describe("#indexOf()", function() {
    it("should return a trancription", function(done) {
      audio
        .getAudioInfo(__dirname + "\\assets\\tmp-1-1585156461007")
        .then(resp => {
          assert.equal(resp.transcription.includes("esperando que tú"), true);
        })
        .then(done, done)
        .catch(err => console.log("err", err));
    });
  });
});
