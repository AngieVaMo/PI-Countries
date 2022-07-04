const { Router } = require('express');
const router = Router();
const { getAllCountries, getCountryById } = require("../controllers/countryControllers.js");



router.get("/", getAllCountries);
router.get("/:id", getCountryById);



module.exports = router;







