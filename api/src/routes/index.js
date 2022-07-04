const { Router } = require('express');
const bodyParser = require('body-parser');
const { activityRoutes } = require("./activityRoutes.js") 
const { countryRoutes } = require("./countryRoutes.js")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const country = require("./countryRoutes.js")
const activity = require("./activityRoutes.js");
const bodyParser = require('body-parser');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use(bodyParser.json())
router.use("/country", countryRoutes);
router.use("/activity", activityRoutes);


module.exports = router;
