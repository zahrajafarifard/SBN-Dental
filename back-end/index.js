const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");

const sequelize = require("./db.js");

const Category = require("./models/category.js");
const Contact = require("./models/contact.js");
const Product = require("./models/product.js");
const ProductImage = require("./models/productImage.js");
const Article = require("./models/article.js");
const SocialMedia = require("./models/socialMedia.js");
const Composition = require("./models/product-composition.js");
const Details = require("./models/product-details.js");
const Usage = require("./models/usage-instruction.js");

const clientRoutes = require("./routes/client-routes.js");
const adminRoutes = require("./routes/admin-routes.js");
const userRoutes = require("./routes/users-routes.js");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/uploads", express.static("uploads"));

// app.use("/uploadedFiles", express.static(process.cwd() + "/uploadedFiles"));

// app.use("/uploadedFiles", express.static("uploadedFiles"));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Credentials", false);
  res.header("Access-Control-Expose-Headers", "Content-Disposition");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use("/api", adminRoutes);
app.use("/sbn", clientRoutes);
app.use("/users", userRoutes);

// app.get("*", (req, res, next) => {
//   return next(new HttpError("Could not find this route.", 404));
// });

// app.use((error, req, res, next) => {

//   if (req.file) {
//     fs.unlink(req.file.path, (err) => {});
//   }
//   if (res.headerSent) {
//     return next(error);
//   }

//   return res
//     .status(error.code || 500)
//     .json({ message: error.message || "An unknown error occurred!" });
// });

Category.hasMany(Product);
Product.belongsTo(Category);

Category.hasMany(Article);
Article.belongsTo(Category);

Product.hasMany(ProductImage);
ProductImage.belongsTo(Product);

Product.hasMany(Composition);
Composition.belongsTo(Product);

Product.hasMany(Details);
Details.belongsTo(Product);

Product.hasMany(Usage);
Usage.belongsTo(Product);

sequelize
  .sync()
  // .sync({ force: true })
  .then(async () => {
    const port = process.env.PORT || 4000;
    const server = app.listen(port, () => {
      console.log("Server is up...");
    });


    const io = require("./socket.js").init(server);

    io.on("connection", (socket) => {
      console.log("socket connected ...");
    });
  })
  .catch((err) => {
    console.log(err);
  });
