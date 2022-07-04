const { Router } = require('express');
const bodyParser = require('body-parser');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const country = require("./country.js")
const activity = require("./activity.js");
const bodyParser = require('body-parser');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use(bodyParser.json())
router.use("/country", country);
router.use("/activity", activity);


module.exports = router;
