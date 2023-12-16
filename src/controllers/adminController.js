const adminModel = require("../models/adminModel");
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")

module.exports = {
  createAdmin : async(req, res, next) => {
    try {
      const data = req.body;

      const protect = await bcrypt.hash(data.password, 10)
      data.password = protect
      const admin = await adminModel.create(data);
      return res.status(201).send({
        status: true,
        message: "admin successfully created",
        data: admin,
      }); 
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
  adminLogin: async (req, res, next) => {
    try {
      let email = req.body.email;
      let password = req.body.password;

      let checkCredential = await adminModel.findOne({ email: email });
      if (!checkCredential) {
        return res
          .status(400)
          .send({ status: false, massage: "Invalid Credential" });
      }
      let hash = checkCredential.password;

      let bcryptpwd = await bcrypt.compare(password, hash);

      if (!bcryptpwd) {
        return res
          .status(400)
          .send({ status: false, message: "please put correct password " });
      }

      let token = jwt.sign({ userId: checkCredential._id }, "ProjectSMS", {
        expiresIn: "10h",
      });
      let obj = { userId: checkCredential["_id"], token };
      return res
        .status(200)
        .send({ status: true, msg: " Admin login successfull", data: obj });
    } catch (error) {
      console.error(error);
      next(error);
    }
}
}


   
 