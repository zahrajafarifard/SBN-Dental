const express = require("express");
const router = express.Router();

const clientController = require("../controllers/client-controller");

// router.get("/", clientController.getAll);
router.post("/contact", clientController.create);
router.get("/footer", clientController.footer);
router.post("/articles", clientController.articles);

router.get("/article/:articleId", clientController.getArticle);
router.get("/getLatestArticles", clientController.getLatestArticles);
router.get("/getLatestArticlesHome", clientController.getLatestArticlesHome);

router.post("/realtedArticles", clientController.realtedArticles);

router.post("/products/mostVisited", clientController.mostVisited);
router.post("/products/cheapest", clientController.cheapest);
router.post("/products/mostExpensive", clientController.mostExpensive);
router.post("/products/newest", clientController.newest);

router.post("/articles/mostVisited", clientController.mostVisitedArticle);
router.post("/articles/newest", clientController.newestArticle);

router.post("/products", clientController.getProducts);
router.get("/products", clientController.getAllProducts);
router.post("/products/search", clientController.search);
router.post("/articles/search", clientController.searchArticle);
router.get("/products/categories", clientController.categories);
router.get("/product/:productId", clientController.getProduct);
router.post("/relatedProducts/:catId", clientController.getRelatedProducts);

module.exports = router;
