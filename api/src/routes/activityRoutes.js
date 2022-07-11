const { Router } = require("express");
const router = Router();
const { postActivity, getActivity } = require("../controllers/activityControllers.js");



router.post("/", postActivity);
router.get("/", getActivity);



module.exports = router;