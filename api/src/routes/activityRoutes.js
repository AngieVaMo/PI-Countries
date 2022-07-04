const { Router } = require("express");
const router = Router();
const { postActivity } = require("../controllers/activityControllers.js");



router.post("/", postActivity);



module.exports = router;