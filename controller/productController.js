const Product = require("../model/product");
const { ObjectId } = require("mongodb");

const addProduct = async (req, res) => {
  const { name, model, stockalert, companyId } = req.body;
  if (!name || !model || !stockalert || !companyId) {
    return res.status(422).json({ message: "Please add all parameters" });
  }
  try {
    const oldProduct = await Product.findOne({ name });
    if (oldProduct) {
      return res.status(400).json({ message: "Product already registered." });
    }

    const newProduct = new Product({
      name,
      model,
      stockalert,
      companyId,
    });

    await newProduct.save();
    return res.status(200).json({ message: "Product is Created" });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: "Please check the data!!!" });
  }
};

const ProductList = async (req, res) => {
  try {
    const { _id } = req.query;
    console.log(req.query);
    if (_id) {
      const product = await Product.findById({ _id: _id });
      return res.status(200).json({ product });
    } else {
      const productList = await Product.find({}).populate('companyId');
      const modifiedProductList = productList.map(product => ({
        // Modify other fields as needed
        ...product.toObject(),
        companyId: product.companyId.name // Replace 'name' with the actual field in the Company model
      }));
      return res.status(200).json({ productList:modifiedProductList });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      errors: [{ message: "Something went wrong. Please try again." }],
    });
  }
};

const editProduct = async (req, res) => {
  const { _id, name, model, stockalert, companyId } = req.body;
  const product = await Product.findById({ _id: new ObjectId(_id) });
  if (product) {
    await Product.findOneAndUpdate(
      {
        _id: new ObjectId(_id),
      },
      {
        $set: {
          name,
          model,
          stockalert,
          companyId,
        },
      }
    );
    return res.status(200).json({ message: "Product is updated" });
  } else {
    return res.status(400).json({ message: "Product not found!" });
  }
};

module.exports = {
  addProduct,
  ProductList,
  editProduct
};
