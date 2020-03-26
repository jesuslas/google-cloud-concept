var assert = require("assert");
const image = require("../src/modules/image");

describe("Shold get a object response", function() {
  describe("#indexOf()", function() {
    it("should return a a ", function(done) {
      image
        .getImageInfo(__dirname + "\\assets\\tmp-1-1585252636107")
        .then(resp => {
          assert.deepEqual(resp.objects, [
            "Stethoscope",
            "Person",
            "Person",
            "Person",
            "Person"
          ]);
          assert.equal(resp.faces.length, 4);
        })
        .then(done, done)
        .catch(err => console.log("err", err));
    });
  });
});
