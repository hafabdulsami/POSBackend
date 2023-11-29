const Company = require("../model/company");
const { ObjectId } = require("mongodb");

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

const companyList = async (req, res) => {
  try {
    const { _id } = req.query;
    console.log(req.query);
    if (_id) {
      const company = await Company.findById({ _id: _id });
      return res.status(200).json({ company });
    } else {
      const companyList = await Company.find({});
      return res.status(200).json({ companyList });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      errors: [{ message: "Something went wrong. Please try again." }],
    });
  }
};

const editCompany = async (req, res) => {
  const { _id, name, phoneNumber } = req.body;
  const company = await Company.findById({ _id: new ObjectId(_id) });
  if (company) {
    await Company.findOneAndUpdate(
      {
        _id: new ObjectId(_id),
      },
      {
        $set: {
          name,
          phoneNumber
        },
      }
    );
    return res.status(200).json({ message: "Company is updated" });
  } else {
    return res.status(400).json({ message: "Company not found!" });
  }
};

module.exports = {
  addCompany,
  companyList,
  editCompany
};
