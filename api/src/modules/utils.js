module.exports.translate = function translate(data) {
  const translate = {
    VERY_UNLIKELY: "Muy poco probable",
    UNLIKELY: "Improbable",
    POSSIBLE: "Posible",
    VERY_LIKELY: "MUY PROBABLE"
  };
  return translate[data] || "Empty";
};
