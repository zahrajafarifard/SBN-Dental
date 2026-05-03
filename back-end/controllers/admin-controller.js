const Contact = require("../models/contact");
const Category = require("../models/category");
const Article = require("../models/article");
const Product = require("../models/product");
const ProductImage = require("../models/productImage");
const Composition = require("../models/product-composition");
const Details = require("../models/product-details");
const Usage = require("../models/usage-instruction");
const SocialMedia = require("../models/socialMedia");

const sequelize = require("../db");
const fs = require("fs");
const path = require("path");
const io = require("../socket");

exports.readMessages = async (req, res, next) => {
  let _readMsgs;
  try {
    _readMsgs = await Contact.update(
      {
        status: "read",
      },
      {
        where: {
          status: "unread",
        },
      }
    );
  } catch (error) {
    console.log("eeeee", error);

    return res.status(500).send("err 500");
  }

  io.getio().emit("readMessages");

  return res.status(200).json({ data: _readMsgs });
};
exports.unreadMessages = async (req, res, next) => {
  let _unreadMsgs;
  try {
    _unreadMsgs = await Contact.count({
      where: {
        status: "unread",
      },
    });
  } catch (error) {
    return res.status(500).send("err 500");
  }

  return res.status(200).json({ data: _unreadMsgs });
};

exports.getSocialMedia = async (req, res, next) => {
  let _finddedSocial;

  try {
    _finddedSocial = await SocialMedia.findOne();
  } catch (error) {
    return res.status(500).send("err 500");
  }
  if (!_finddedSocial) {
    return res.status(404).send("err 404");
  }

  return res.status(200).send(_finddedSocial);
};
exports.socialMedia = async (req, res, next) => {
  const { insta, telegram, whatsApp, address, phone, email } = req.body;

  try {
    const [socialMedia, created] = await SocialMedia.findOrCreate({
      where: {},
      defaults: {
        insta,
        telegram,
        whatsApp,
        address,
        phone,
        email,
      },
    });

    if (!created) {
      await socialMedia.update({
        insta,
        telegram,
        whatsApp,
        address,
        phone,
        email,
      });
      return res
        .status(200)
        .json({ message: "Record updated successfully", socialMedia });
    }

    return res
      .status(201)
      .json({ message: "Record created successfully", socialMedia });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};

exports.editProduct = async (req, res, next) => {
  const {
    productId,
    productTitle,
    category,
    price,
    mainDescriptionSectionOne,
    mainDescriptionItems,
    composition,
    usageInstructions,
    productDetails,
    bgColor,
    keyWord1,
    keyWord2,
    keyWord3,
  } = req.body;

  const _session = await sequelize.transaction();

  try {
    const product = await Product.findByPk(productId, {
      transaction: _session,
    });
    if (!product) {
      await _session.rollback();
      return res.status(404).json({ message: "محصولی یافت نشد" });
    }

    const updateData = {
      productTitle,
      CategoryId: +category,
      price,
      mainDescriptionSectionOne,
      mainDescriptionItems,
      keyWord1,
      keyWord2,
      keyWord3,
      bgColor: bgColor || product.bgColor,
    };
    await product.update(updateData, { transaction: _session });

    await Composition.destroy({
      where: { ProductId: productId },
      transaction: _session,
    });
    await Details.destroy({
      where: { ProductId: productId },
      transaction: _session,
    });
    await Usage.destroy({
      where: { ProductId: productId },
      transaction: _session,
    });

    if (composition) {
      for (const element of composition) {
        await Composition.create(
          {
            title: element.title,
            description: element.description,
            ProductId: productId,
          },
          { transaction: _session }
        );
      }
    }
    if (usageInstructions) {
      for (const element of usageInstructions) {
        await Usage.create(
          {
            title: element.title,
            description: element.description,
            ProductId: productId,
          },
          { transaction: _session }
        );
      }
    }
    if (productDetails) {
      for (const element of productDetails) {
        await Details.create(
          {
            title: element.title,
            description: element.description,
            ProductId: productId,
          },
          { transaction: _session }
        );
      }
    }

    const newImages = {
      mainImage: req.files["mainImage"]?.[0]?.filename,
      image1: req.files["image1"]?.[0]?.filename,
      image2: req.files["image2"]?.[0]?.filename,
      image3: req.files["image3"]?.[0]?.filename,
    };

    const existingImages = await ProductImage.findOne({
      where: { ProductId: product.id },
      transaction: _session,
    });

    const imagePaths = [
      { newImage: newImages.mainImage, oldImage: existingImages?.mainImage },
      { newImage: newImages.image1, oldImage: existingImages?.image1 },
      { newImage: newImages.image2, oldImage: existingImages?.image2 },
      { newImage: newImages.image3, oldImage: existingImages?.image3 },
    ];

    for (const { newImage, oldImage } of imagePaths) {
      if (newImage && oldImage) {
        const filePath = path.join(__dirname, "..", "uploads", oldImage);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
          console.log(`Deleted file: ${filePath}`);
        }
      }
    }

    await ProductImage.update(newImages, {
      where: { ProductId: product.id },
      transaction: _session,
    });

    await _session.commit();
    return res.status(200).json({ message: "به روز رسانی محصول انجام شد" });
  } catch (error) {
    console.error("Error updating product:", error);
    await _session.rollback();
    return res
      .status(500)
      .json({ message: "خطای بروز رسانی محصول ، لطفا بعدا تلاش کنید" });
  }
};

exports.getArticle = async (req, res, next) => {
  let _articleId = req.params.articleId;
  let _article;

  try {
    _article = await Article.findByPk(_articleId, {
      include: [{ model: Category }],
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "خطای سمت سرور ، لطفا مجددا تلاش کنید" });
  }

  return res.status(200).send(_article);
};
exports.getProduct = async (req, res, next) => {
  let _prodId = req.params.productId;
  let _product;

  try {
    _product = await Product.findByPk(_prodId, {
      include: [
        { model: ProductImage },
        { model: Category },
        { model: Usage },
        { model: Details },
        { model: Composition },
      ],
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "خطای سمت سرور ، لطفا مجددا تلاش کنید" });
  }

  return res.status(200).send(_product);
};

exports.deleteProducts = async (req, res, next) => {
  const { productId } = req.body;
  const _session = await sequelize.transaction();

  try {
    // Find product by primary key
    const _findedProduct = await Product.findByPk(productId, {
      transaction: _session,
    });
    if (!_findedProduct) {
      await _session.rollback();
      return res.status(404).json({ message: "محصولی یافت نشد" });
    }

    // Delete related records in Composition, Details, and Usage
    await Composition.destroy({
      where: { ProductId: productId },
      transaction: _session,
    });
    await Details.destroy({
      where: { ProductId: productId },
      transaction: _session,
    });
    await Usage.destroy({
      where: { ProductId: productId },
      transaction: _session,
    });

    // Fetch and delete associated images
    const _deletedProductImgs = await ProductImage.findAll({
      where: { ProductId: productId },
      transaction: _session,
    });

    const filePaths = [];
    for (const img of _deletedProductImgs) {
      // Collect all image paths into an array
      if (img?.mainImage)
        filePaths.push(path.join(__dirname, "..", "uploads", img.mainImage));
      if (img?.image1)
        filePaths.push(path.join(__dirname, "..", "uploads", img.image1));
      if (img?.image2)
        filePaths.push(path.join(__dirname, "..", "uploads", img.image2));
      if (img?.image3)
        filePaths.push(path.join(__dirname, "..", "uploads", img.image3));
    }

    // Delete image files if they exist
    for (const filePath of filePaths) {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log(`Deleted file: ${filePath}`);
      } else {
        console.log(`File does not exist: ${filePath}`);
      }
    }

    // Destroy ProductImage and Product records within the transaction
    await ProductImage.destroy({
      where: { ProductId: productId },
      transaction: _session,
    });
    await _findedProduct.destroy({ transaction: _session });

    // Commit transaction after successful deletion
    await _session.commit();
    return res.status(200).json({ message: "The product has been deleted." });
  } catch (error) {
    // Rollback the transaction on error
    await _session.rollback();
    console.error("Error deleting product:", error);
    return res
      .status(500)
      .json({ message: "خطای سمت سرور ، لطفا مجددا تلاش کنید" });
  }
};

exports.deleteArticle = async (req, res, next) => {
  const { articleId } = req.body;
  const _session = await sequelize.transaction();

  try {
    const _findedArticle = await Article.findByPk(articleId, {
      transaction: _session,
    });

    if (!_findedArticle) {
      await _session.rollback();
      return res.status(404).json({ message: "مقاله ای یافت نشد" });
    }

    const filePaths = [
      _findedArticle?.mainImage &&
        path.join(__dirname, "..", "uploads", _findedArticle.mainImage),
      _findedArticle?.sectionTwoImage &&
        path.join(__dirname, "..", "uploads", _findedArticle.sectionTwoImage),
      _findedArticle?.sectionFourImage &&
        path.join(__dirname, "..", "uploads", _findedArticle.sectionFourImage),
      _findedArticle?.sectionFiveImage &&
        path.join(__dirname, "..", "uploads", _findedArticle.sectionFiveImage),
    ].filter(Boolean);

    for (const filePath of filePaths) {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log(`Deleted file: ${filePath}`);
      } else {
        console.log(`File does not exist: ${filePath}`);
      }
    }

    await _findedArticle.destroy({ transaction: _session });
    await _session.commit();

    return res.status(200).json({ message: "The article has been deleted." });
  } catch (error) {
    await _session.rollback();
    console.error("Error deleting article:", error);
    return res
      .status(500)
      .json({ message: "خطای سمت سرور ، لطفا مجددا تلاش کنید" });
  }
};

exports.getContacts = async (req, res, next) => {
  let _contacts;

  const { page, pageSize } = req.body;

  offset = (page - 1) * pageSize;
  limit = pageSize;

  try {
    _contacts = await Contact.findAndCountAll({
      limit,
      offset,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "خطای سمت سرور ، لطفا مجددا تلاش کنید" });
  }

  return res.status(200).send(_contacts);
};

exports.getProducts = async (req, res, next) => {
  let _products;
  const { page, pageSize } = req.body;

  offset = (page - 1) * pageSize;
  limit = pageSize;

  try {
    _products = await Product.findAndCountAll({
      limit,
      offset,
      include: { model: ProductImage },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "خطای سمت سرور ، لطفا مجددا تلاش کنید" });
  }

  return res.status(200).send(_products);
};
exports.getArticles = async (req, res, next) => {
  const { page, pageSize } = req.body;
  let _articles;

  offset = (page - 1) * pageSize;
  limit = pageSize;

  try {
    _articles = await Article.findAndCountAll({ limit, offset });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "خطای سمت سرور ، لطفا مجددا تلاش کنید" });
  }

  return res.status(200).send(_articles);
};

exports.insertArticle = async (req, res, next) => {
  const {
    articleTitle,
    shortDescription,
    authorName,
    sectionOneTitle,
    sectionOneText,
    sectionTwoTitle,
    sectionTwoText,
    sectionThreeTitle,
    sectionThreeText,
    sectionFourTitle,
    sectionFourText,
    sectionFiveTitle,
    sectionFiveText,
    sectionSixTitle,
    sectionSixText,
    readingTime,
    category,
  } = req.body;

  const mainImage = req.files["mainImage"]
    ? req.files["mainImage"][0].filename
    : null;
  const sectionTwoImage = req.files["sectionTwoImage"]
    ? req.files["sectionTwoImage"][0].filename
    : null;
  const sectionFourImage = req.files["sectionFourImage"]
    ? req.files["sectionFourImage"][0].filename
    : null;
  const sectionFiveImage = req.files["sectionFiveImage"]
    ? req.files["sectionFiveImage"][0].filename
    : null;

  try {
    const newArticle = await Article.create({
      CategoryId: +category,
      articleTitle,
      shortDescription,
      authorName,
      sectionOneTitle,
      sectionOneText,
      sectionTwoTitle,
      sectionTwoText,
      sectionThreeTitle,
      sectionThreeText,
      sectionFourTitle,
      sectionFourText,
      sectionFiveTitle,
      sectionFiveText,
      sectionSixTitle,
      sectionSixText,
      mainImage,
      sectionTwoImage,
      sectionFourImage,
      sectionFiveImage,
      readingTime,
    });

    return res.status(201).send("Article was successfully created");
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error saving article to the database." });
  }
};

exports.editArticle = async (req, res, next) => {
  const {
    articleId,
    articleTitle,
    shortDescription,
    authorName,
    sectionOneTitle,
    sectionOneText,
    sectionTwoTitle,
    sectionTwoText,
    sectionThreeTitle,
    sectionThreeText,
    sectionFourTitle,
    sectionFourText,
    sectionFiveTitle,
    sectionFiveText,
    sectionSixTitle,
    sectionSixText,
    readingTime,
    category,
  } = req.body;

  const mainImage = req.files["mainImage"]?.[0]?.filename;
  const sectionTwoImage = req.files["sectionTwoImage"]?.[0]?.filename;
  const sectionFourImage = req.files["sectionFourImage"]?.[0]?.filename;
  const sectionFiveImage = req.files["sectionFiveImage"]?.[0]?.filename;

  const _session = await sequelize.transaction();

  try {
    const _finddedArticle = await Article.findOne({
      where: { id: articleId },
      transaction: _session,
    });

    if (!_finddedArticle) {
      await _session.rollback();
      return res.status(404).json({ message: "مقاله ای یافت نشد" });
    }

    const filePaths = [
      mainImage &&
        _finddedArticle.mainImage &&
        path.join(__dirname, "..", "uploads", _finddedArticle.mainImage),
      sectionTwoImage &&
        _finddedArticle.sectionTwoImage &&
        path.join(__dirname, "..", "uploads", _finddedArticle.sectionTwoImage),
      sectionFourImage &&
        _finddedArticle.sectionFourImage &&
        path.join(__dirname, "..", "uploads", _finddedArticle.sectionFourImage),
      sectionFiveImage &&
        _finddedArticle.sectionFiveImage &&
        path.join(__dirname, "..", "uploads", _finddedArticle.sectionFiveImage),
    ].filter(Boolean);

    for (const filePath of filePaths) {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log(`Deleted file: ${filePath}`);
      } else {
        console.log(`File does not exist: ${filePath}`);
      }
    }

    Object.assign(_finddedArticle, {
      articleTitle,
      shortDescription,
      authorName,
      sectionOneTitle,
      sectionOneText,
      sectionTwoTitle,
      sectionTwoText,
      sectionThreeTitle,
      sectionThreeText,
      sectionFourTitle,
      sectionFourText,
      sectionFiveTitle,
      sectionFiveText,
      sectionSixTitle,
      sectionSixText,
      readingTime,
      CategoryId: +category,
      mainImage,
      sectionTwoImage,
      sectionFourImage,
      sectionFiveImage,
    });

    await _finddedArticle.save({ transaction: _session });

    await _session.commit();
    return res
      .status(200)
      .json({ message: "The article has been successfully updated." });
  } catch (error) {
    await _session.rollback();
    console.error("Error updating article:", error);
    return res
      .status(500)
      .json({ message: "خطای سمت سرور ، لطفا مجددا تلاش کنید" });
  }
};

exports.insertProduct = async (req, res, next) => {
  const _session = await sequelize.transaction();

  const {
    productTitle,
    category,
    price,
    mainDescriptionSectionOne,
    mainDescriptionItems,
    composition,
    usageInstructions,
    productDetails,
    bgColor,
    keyWord1,
    keyWord2,
    keyWord3,
  } = req.body;

  try {
    const newProduct = await Product.create(
      {
        productTitle,
        CategoryId: +category,
        price,
        mainDescriptionSectionOne,
        mainDescriptionItems,
        bgColor,
        keyWord1,
        keyWord2,
        keyWord3,
      },
      { transaction: _session }
    );

    if (composition) {
      for (const element of composition) {
        await Composition.create(
          {
            title: element.title,
            description: element.description,
            ProductId: newProduct.id,
          },
          { transaction: _session }
        );
      }
    }

    if (usageInstructions) {
      for (const element of usageInstructions) {
        await Usage.create(
          {
            title: element.title,
            description: element.description,
            ProductId: newProduct.id,
          },
          { transaction: _session }
        );
      }
    }

    if (productDetails) {
      for (const element of productDetails) {
        await Details.create(
          {
            title: element.title,
            description: element.description,
            ProductId: newProduct.id,
          },
          { transaction: _session }
        );
      }
    }

    if (req.files) {
      await ProductImage.create(
        {
          ProductId: newProduct.id,
          mainImage: req.files["mainImage"]
            ? req.files["mainImage"][0].filename
            : null,
          image1: req.files["image1"] ? req.files["image1"][0].filename : null,
          image2: req.files["image2"] ? req.files["image2"][0].filename : null,
          image3: req.files["image3"] ? req.files["image3"][0].filename : null,
        },
        { transaction: _session }
      );
    }

    await _session.commit();

    return res.status(201).json({
      message: "Product and images were successfully created",
      product: newProduct,
    });
  } catch (error) {
    await _session.rollback();
    console.error("Error creating product:", error);

    return res.status(500).json({
      message: "Error saving product to the database.",
      error: error.message,
    });
  }
};

exports.addCategory = async (req, res, next) => {
  const { categoryName } = req.body;

  try {
    await Category.create({ name: categoryName });
  } catch (error) {
    if (error?.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({ data: "invalid name" });
    } else {
      return res
        .status(500)
        .json({ date: "An error occured, try again later" });
    }
  }

  return res.status(201).json({ data: "The record added successfully." });
};

exports.getCategories = async (req, res, next) => {
  let _allFileTypes;
  try {
    _allFileTypes = await Category.findAll({});
  } catch (error) {
    return res.status(500).json({ data: "An error occured, try again later" });
  }
  return res.status(200).send(_allFileTypes);
};

exports.deleteCategory = async (req, res, next) => {
  const { id } = req.body;

  if (!id) {
    return res
      .status(400)
      .json({ message: "Request body is missing or empty" });
  }

  try {
    const foundCategory = await Category.findByPk(id);
    if (!foundCategory) {
      return res.status(404).json({ message: "No related file found" });
    }

    await foundCategory.destroy();
    return res
      .status(200)
      .json({ message: "File type deleted successfully", data: foundCategory });
  } catch (error) {
    console.error("Error deleting file type:", error);
    return res
      .status(500)
      .json({ message: "An error occurred, please try again later" });
  }
};

exports.editCategory = async (req, res, next) => {
  const { categoryId, categoryName } = req.body;

  if (!categoryId || !categoryName) {
    return res.status(400).json({ data: "Request body is missing or empty" });
  }

  let _findedCategory;

  try {
    _findedCategory = await Category.findByPk(categoryId);
  } catch (error) {
    console.log(error);

    return res.status(500).json({ data: "An error occured, try again later" });
  }

  if (!_findedCategory) {
    return res.status(404).json({ data: "No category found" });
  }

  try {
    _findedCategory.name = categoryName;
    await _findedCategory.save();
  } catch (error) {
    if (error?.name === "SequelizeUniqueConstraintError") {
      return res.status(403).json({
        data: "An error occured while updating exchange, try again later",
      });
    }
    return res.status(500).json({ data: "An error occured, try again later" });
  }
  return res
    .status(200)
    .json({ data: "The fileType was successfully updated" });
};
