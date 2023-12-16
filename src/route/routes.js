const router = require("express").Router()


const  adminController = require("../controllers/adminController")
const  teacherController = require("../controllers/teacherController")


router.post("/adminSignup",adminController.createAdmin)
router.post("/adminLogin",adminController.adminLogin)


router.post("/teacher",teacherController.createTeacher)







module.exports= router   