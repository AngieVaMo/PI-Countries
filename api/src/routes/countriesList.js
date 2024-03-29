const { Router } = require('express');
const { Country } = require('../db');
const express = require('express');
const router = Router();

router.use(express.json());
//Llamado a la API por sólo los nombres para la lista de búsqueda de activity
router.get('/', async (req, res, next)=> {
    try{
        const allCountries = await Country.findAll({
            attributes: ['name'],
            order: [['name', 'ASC']]
        });

        res.status(200).json(allCountries);

    } catch(error){
        next(error);
    }
});

module.exports = router;