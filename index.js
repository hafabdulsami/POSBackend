const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const supplierRoutes = require("./routes/supplierRoutes");
const companyRoutes = require("./routes/companyRoutes");
const productRoutes = require("./routes/productRoutes");
const card = require("./model/user");
const db = require("./utils/db");
require("dotenv").config();

const app = express();
const PORT = 5000;
app.use(cors());
app.use(bodyParser.json());

app.use("/api", userRoutes);
app.use("/api", companyRoutes);
app.use("/api", supplierRoutes);
app.use("/api", productRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
