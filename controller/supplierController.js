const Supplier = require("../model/supplier");
const { ObjectId } = require("mongodb");
const addSupplier = async (req, res) => {
  const { name, shopName, phoneNumber, city } = req.body;
  if (!name || !phoneNumber || !shopName || !city) {
    return res.status(422).json({ message: "Please add all parameters" });
  }

  try {
    const oldSupplier = await Supplier.findOne({ name, shopName });
    if (oldSupplier) {
      return res.status(400).json({ message: "Supplier already registered." });
    }

    const newSupplier = new Supplier({
      name,
      phoneNumber,
      shopName,
      city,
    });

    await newSupplier.save();
    return res.status(200).json({ message: "Supplier is Created" });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: "Please check the data!!!" });
  }
};

const supplierList = async (req, res) => {
  console.log("kkk");
  try {
    const { _id } = req.query;
    console.log(req.query);
    if (_id) {
      const supplier = await Supplier.findById({ _id: _id });
      return res.status(200).json({ supplier });
    } else {
      const supplierList = await Supplier.find({});
      return res.status(200).json({ supplierList });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      errors: [{ message: "Something went wrong. Please try again." }],
    });
  }
};

const editSupplier = async (req, res) => {
  const { _id, name, phoneNumber, shopName, city } = req.body;
  const supplier = await Supplier.findById({ _id: new ObjectId(_id) });
  if (supplier) {
    await Supplier.findOneAndUpdate(
      {
        _id: new ObjectId(_id),
      },
      {
        $set: {
          name,
          phoneNumber,
          shopName,
          city,
        },
      }
    );
    return res.status(200).json({ message: "Suppler is updated" });
  } else {
    return res.status(400).json({ message: "Suppler not found!" });
  }
};

module.exports = {
  addSupplier,
  editSupplier,
  supplierList,
};
