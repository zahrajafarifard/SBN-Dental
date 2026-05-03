const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  if (req.method === "OPTION") {
    return next();
  }
  try {
    let decodedToken;
    let token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
      return res.status(401).send("Login failed11, try again.");
    }

    decodedToken = jwt.verify(token, "mySecretKey :) ");

    if (!decodedToken) {
      if (!token) {
        return res.status(401).send("Login failed22, try again.");
      }
    }

    // console.log("decodedToken", decodedToken);

    req.userId = await decodedToken.userId;
    req.mobile = await decodedToken.mobile;
    next();
  } catch (err) {
    // return next(new HttpError("ابتدا به حساب کاربری خود وارد شوید .", 401));
    return res.status(401).send("Login failed33, try again.");
  }
};
