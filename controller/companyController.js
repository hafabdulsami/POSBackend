const Company = require("../model/company");

const addCompany = async (req, res) => {
  const { name, phoneNumber } = req.body;
  if (!name || !phoneNumber) {
    return res.status(422).json({ message: "Please add all parameters" });
  }
  try {
    const oldCompany = await Company.findOne({ name });
    if (oldCompany) {
      return res.status(400).json({ message: "Company already registered." });
    }

    const newCompany = new Company({
      name,
      phoneNumber,
    });

    await newCompany.save();
    return res.status(200).json({ message: "Company is Created" });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: "Please check the data!!!" });
  }
};

module.exports = {
  addCompany,
};
