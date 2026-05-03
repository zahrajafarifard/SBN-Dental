const Contact = require("../models/contact");
const Category = require("../models/category");
const SocialMedia = require("../models/socialMedia");
const Article = require("../models/article");
const Product = require("../models/product");
const ProductImage = require("../models/productImage");

const { Op } = require("sequelize");
const Usage = require("../models/usage-instruction");
const Details = require("../models/product-details");
const Composition = require("../models/product-composition");

exports.getLatestArticles = async (req, res, next) => {
  let _latestArticles;

  try {
    _latestArticles = await Article.findAll({
      limit: 3,
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).send(_latestArticles);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong. Please try again later." });
  }
};
exports.getLatestArticlesHome = async (req, res, next) => {
  let _latestArticles;

  try {
    _latestArticles = await Article.findAll({
      limit: 4,
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).send(_latestArticles);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong. Please try again later." });
  }
};
exports.realtedArticles = async (req, res, next) => {
  let _realtedArticles;

  const { articleId, CategoryId } = req.body;

  try {
    _realtedArticles = await Article.findAll({
      where: {
        CategoryId: CategoryId,
        id: {
          [Op.ne]: articleId,
        },
      },
      limit: 3,
    });

    if (_realtedArticles.length === 0) {
      _realtedArticles = await Article.findAll({
        where: {
          id: {
            [Op.ne]: articleId,
          },
        },
        limit: 3,
      });
    }

    return res.status(200).send(_realtedArticles);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong. Please try again later." });
  }
};

exports.getRelatedProducts = async (req, res, next) => {
  let _realtedProducts;

  const { catId } = req.params;
  const { productId } = req.body;

  try {
    _realtedProducts = await Product.findAll({
      where: {
        CategoryId: catId,
        id: {
          [Op.ne]: productId, // Use Op.ne for excluding a specific id
        },
      },

      limit: 5,
      include: [{ model: ProductImage }],
    });

    return res.status(200).send(_realtedProducts);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong. Please try again later." });
  }
};
exports.getProducts = async (req, res, next) => {
  const { page, pageSize, selectedCategory } = req.body;

  offset = (page - 1) * pageSize;
  limit = pageSize;

  let whereCondition = {};

  if (selectedCategory != 0) {
    whereCondition.CategoryId = selectedCategory;
  }

  let _products = await Product.findAndCountAll({
    where: whereCondition,
    limit,
    offset,
    include: { model: ProductImage },
  });

  return res.status(200).send(_products);
};
exports.articles = async (req, res, next) => {
  let _article;
  const { page, pageSize } = req.body;

  offset = (page - 1) * pageSize;
  limit = pageSize;

  try {
    _article = await Article.findAndCountAll({
      order: [["createdAt", "DESC"]],
      limit,
      offset: offset + 3,
    });

    return res.status(200).send(_article);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong. Please try again later." });
  }
};
exports.footer = async (req, res, next) => {
  let _contact, _latestArticles;

  try {
    _contact = await SocialMedia.findOne();
    _latestArticles = await Article.findAll({
      limit: 4,
      attributes: ["id", "articleTitle"],
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({ data: _contact, articles: _latestArticles });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong. Please try again later." });
  }
};

exports.create = async (req, res, next) => {
  const { name, mobile, message } = req.body;

  if (!name || !mobile || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    Contact.create({ name, mobile, message });

    return res.status(200).json({ message: "Message received successfully!" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong. Please try again later." });
  }
};

exports.getAllProducts = async (req, res, next) => {
  let _products = await Product.findAll({
    attributes: [
      "id",
      "productTitle",
      "price",
      "keyWord1",
      "keyWord2",
      "keyWord3",
      "mainDescriptionItems",
      "bgColor",
    ],
    include: { model: ProductImage, attributes: ["id", "mainImage"] },
  });

  return res.status(200).send(_products);
};

exports.getArticle = async (req, res, next) => {
  let _article;
  const { articleId } = req.params;

  try {
    _article = await Article.findByPk(articleId);

    if (_article) {
      _article.view = +_article?.view + 1;
      await _article.save();
    }

    return res.status(200).send(_article);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong. Please try again later." });
  }
};
exports.getProduct = async (req, res, next) => {
  let _prodId = req.params.productId;

  let _product = await Product.findByPk(_prodId, {
    include: [
      { model: ProductImage },
      { model: Category },
      { model: Usage },
      { model: Details },
      { model: Composition },
    ],
  });

  if (_product) {
    _product.view = +_product?.view + 1;
    await _product.save();
  }

  return res.status(200).send(_product);
};

exports.mostVisitedArticle = async (req, res, next) => {
  const { page, pageSize, admin } = req.body;

  offset = (page - 1) * pageSize;
  limit = pageSize;

  let _articles = await Article.findAll({
    limit,
    offset: admin ? offset : offset + 3,
    order: [["view", "DESC"]],
  });

  return res.status(200).send(_articles);
};

exports.newestArticle = async (req, res, next) => {
  const { page, pageSize, admin } = req.body;

  offset = (page - 1) * pageSize;
  limit = pageSize;

  let _articles = await Article.findAll({
    limit,
    offset: admin ? offset : offset + 3,
    order: [["createdAt", "DESC"]],
  });

  return res.status(200).send(_articles);
};
exports.mostVisited = async (req, res, next) => {
  const { page, pageSize, selectedCategory } = req.body;

  offset = (page - 1) * pageSize;
  limit = pageSize;
  let whereCondition = {};

  if (selectedCategory != 0) {
    whereCondition.CategoryId = selectedCategory;
  }

  let _products = await Product.findAll({
    where: whereCondition,
    limit,
    offset: offset,
    include: { model: ProductImage },
    order: [["view", "DESC"]],
  });

  return res.status(200).send(_products);
};

exports.newest = async (req, res, next) => {
  const { page, pageSize, selectedCategory } = req.body;

  offset = (page - 1) * pageSize;
  limit = pageSize;

  let whereCondition = {};

  if (selectedCategory != 0) {
    whereCondition.CategoryId = selectedCategory;
  }
  let _products = await Product.findAll({
    where: whereCondition,
    limit,
    offset: offset,
    include: { model: ProductImage },
    order: [["createdAt", "DESC"]],
  });

  return res.status(200).send(_products);
};

exports.mostExpensive = async (req, res, next) => {
  const { page, pageSize, selectedCategory } = req.body;

  offset = (page - 1) * pageSize;
  limit = pageSize;

  let whereCondition = {};

  if (selectedCategory != 0) {
    whereCondition.CategoryId = selectedCategory;
  }
  let _products = await Product.findAll({
    where: whereCondition,
    limit,
    offset: offset,
    include: { model: ProductImage },
    order: [["price", "DESC"]],
  });

  return res.status(200).send(_products);
};
exports.cheapest = async (req, res, next) => {
  const { page, pageSize, selectedCategory } = req.body;

  offset = (page - 1) * pageSize;
  limit = pageSize;

  let whereCondition = {};

  if (selectedCategory != 0) {
    whereCondition.CategoryId = selectedCategory;
  }
  let _products = await Product.findAll({
    where: whereCondition,

    limit,
    offset,
    include: { model: ProductImage },
    order: [["price", "ASC"]],
  });

  return res.status(200).send(_products);
};
exports.search = async (req, res, next) => {
  const { searchItem, page, pageSize } = req.body;

  let _products;
  console.log("reeeeeeeeeeeq", req.body);

  offset = (page - 1) * pageSize;
  limit = pageSize;

  try {
    _products = await Product.findAll({
      limit,
      offset,
      include: { model: ProductImage },
      where: {
        [Op.or]: [
          { productTitle: { [Op.like]: `%${searchItem}%` } },
          // { price: searchItem },
        ],
      },
    });
  } catch (error) {
    console.log("eeee", error);
  }

  return res.status(200).send(_products);
};
exports.searchArticle = async (req, res, next) => {
  const { searchItem, page, pageSize, admin } = req.body;

  offset = (page - 1) * pageSize;
  limit = pageSize;

  let _products = await Article.findAll({
    order: [["createdAt", "DESC"]],
    limit,
    offset: admin ? offset : searchItem.length === 0 ? offset + 3 : offset,
    where: {
      [Op.or]: [
        { articleTitle: { [Op.like]: `%${searchItem}%` } },
        // { price: searchItem },
      ],
    },
  });

  return res.status(200).send(_products);
};

exports.categories = async (req, res, next) => {
  let _cats;

  try {
    _cats = await Category.findAll();
  } catch (error) {
    return res.status(500).send("err 500");
  }

  return res.status(200).send(_cats);
};
