const express = require("express");
const router = express.Router();
const upload = require("../config/multerConfig");

const checkAuth = require("../config/checkAuth");
const adminController = require("../controllers/admin-controller");

router.post("/articles/getArticles", checkAuth, adminController.getArticles);

router.get("/product/:productId", checkAuth, adminController.getProduct);
router.get("/article/:articleId", adminController.getArticle);
router.delete("/product", checkAuth, adminController.deleteProducts);
router.delete("/article", checkAuth, adminController.deleteArticle);

router.post("/products/allProducts", checkAuth, adminController.getProducts);
router.post("/socialMedia", checkAuth, adminController.socialMedia);
router.get("/socialMedia", checkAuth, adminController.getSocialMedia);
router.get("/unreadMessages", adminController.unreadMessages);
router.get("/readMessages", adminController.readMessages);

router.post(
  "/articles",
  checkAuth,
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "sectionTwoImage", maxCount: 1 },
    { name: "sectionFourImage", maxCount: 1 },
    { name: "sectionFiveImage", maxCount: 1 },
  ]),
  adminController.insertArticle
);
router.patch(
  "/articles",
  checkAuth,
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "sectionTwoImage", maxCount: 1 },
    { name: "sectionFourImage", maxCount: 1 },
    { name: "sectionFiveImage", maxCount: 1 },
  ]),
  adminController.editArticle
);

router.post(
  "/products",
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
  ]),
  adminController.insertProduct
);

router.patch(
  "/products",
  checkAuth,
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
  ]),
  adminController.editProduct
);

router.post("/contact-form", adminController.getContacts);

router.post("/addCategory", checkAuth, adminController.addCategory);
router.get("/categories", checkAuth, adminController.getCategories);
router.delete("/delete-category", checkAuth, adminController.deleteCategory);
router.patch("/editCategory", checkAuth, adminController.editCategory);

module.exports = router;
