const jwt = require("jsonwebtoken");
const { isValidObjectId } = require("mongoose");
const admilModel = require("../models/adminModel");

module.exports = {
  authentication: async function (req, res, next) {
    try {
      let bearerHeader = req.headers.authorization;
      if (!bearerHeader) {
        return res
          .status(401)
          .send({
            status: false,
            message: "Token is missing! please enter token.",
          });
      }
      let bearerToken = bearerHeader.split(" ");
      let token = bearerToken[1];
      let decodedToken = jwt.verify(
        token,
        "ProjectSMS",
        function (err, decodedToken) {
          if (err) {
            return res
              .status(400)
              .send({ status: false, msg: "Invalid Token or Token Expired" });
          }
          req.decodedToken = decodedToken;
          next();
        }
      );
    } catch (error) {
        console.error(error);
        next(error);
      }
  },
};
