const Feature = require("../model/feature");

const getAllFeature = async (req, res) => {
  Feature.find({},'_id name')
    .then((data) => {
      return res.status(200).json({ feature: data });
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json({ error: "Feature doesnot exist" });
    });
};

module.exports = {
    getAllFeature,
  };
