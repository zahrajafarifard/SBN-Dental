const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require("axios");

const User = require("../models/user");

exports.setNewPassword = async (req, res, next) => {
  console.log("reeeqq", req.body);

  const { newPassword, mobile } = req.body;

  let _findedUser;
  _findedUser = await User.findOne({ where: { mobile } });

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(newPassword, 12);
  } catch (err) {
    console.log("err", err);
  }

  _findedUser.password = hashedPassword;
  await _findedUser.save();

  return res.status(201).json({ data: "new password is set" });
};

exports.checkSecurityCode = async (req, res, next) => {
  // console.log("reeeqq", req.body);
  let _findedUser;

  const { securityCode, mobile } = req.body;

  _findedUser = await User.findOne({
    where: { mobile: mobile, securityCode: securityCode },
  });

  // console.log(_findedUser);

  if (_findedUser) {
    return res.status(200).json({ data: "user matched" });
  } else {
    return res.status(404).json({ data: "No records found" });
  }
};

exports.generateSecurityCode = async (req, res, next) => {
  console.log("reeeqq", req.body);

  const { mobile } = req.body;

  let _findedUser;
  _findedUser = await User.findOne({ where: { mobile: mobile } });

  // console.log("_findedUser1111", _findedUser);

  // _randomCode = Math.floor(Math.random() * 1000000);

  // if (_findedUser) {
  //   _findedUser.securityCode = _randomCode;
  //   await _findedUser.save();
  // } else {
  //   return res.status(404).json({ data: "No records found" });
  // }

  // console.log("_findedUser", _findedUser?.securityCode);

  if (_findedUser) {
    // password is hot#128 but code for # is %23
    // let sms;
    // try {
    //   console.log("send sms to:", mobile, _findedUser.securityCode);

    //   // sms = await axios.get(
    //   //   `https://login.niazpardaz.ir/SMSInOutBox/SendSms?username=d.momeni&password=hot%23128&from=10009611&to=${mobile}&text=کد اعتبار سنجی شما: ${_findedUser?.securityCode}`
    //   // );
    //   console.log("sms :", sms);
    // } catch (error) {
    //   return res
    //     .status(500)
    //     .json({ data: "خطای سمت سرور ، لطفا مجددا تلاش کنید." });
    // }

    return res.status(200).json({ data: "ok" });
  } else {
    return res
      .status(500)
      .json({ data: "خطای سمت سرور ، لطفا مجددا تلاش کنید." });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { mobile, password } = req.body;

    const existingUser = await User.findOne({
      where: { mobile: mobile },
    });

    if (!existingUser) {
      return res
        .status(403)
        .json({ data: "نام کاربری یا رمز عبور اشتباه است." });
    }

    let unhashedPassword;
    try {
      unhashedPassword = await bcrypt.compare(password, existingUser.password);
    } catch (err) {
      return res
        .status(500)
        .json({ data: "خطای سمت سرور ، لطفا مجددا تلاش کنید." });
    }
    if (!unhashedPassword) {
      return res
        .status(403)
        .json({ data: "نام کاربری یا رمز عبور اشتباه است." });
    }
    let token;
    try {
      token = jwt.sign(
        { userId: existingUser.id, mobile: existingUser.mobile },
        "mySecretKey :) ",
        { expiresIn: "2h" }
      );
    } catch (err) {
      return res
        .status(500)
        .json({ data: "خطای سمت سرور ، لطفا مجددا تلاش کنید." });
    }

    return res.status(200).json({
      userId: existingUser.id,
      mobile: existingUser.mobile,
      token: token,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ data: "خطای سمت سرور ، لطفا مجددا تلاش کنید." });
  }
};

exports.signUp = async (req, res, next) => {
  let password = "admin";

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    console.log("err", err);
  }

  console.log("hashed pass:", password, hashedPassword);

  return res.status(200).send(hashedPassword);
};
