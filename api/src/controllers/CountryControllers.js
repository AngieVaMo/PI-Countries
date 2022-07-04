const {Country, Activity} = require("../db.js");
const { Op, Sequelize } = require("sequelize");

const getAllCountries = async (req, res, next) => {
    try {
        let countries = await Country.findAll({
            include: {
                model: Activity
            }
        });
        res.json(countries);

    } catch (error) {
        next(error);

    }
}

const getCountryById = async (req, res, next) => {
    const { id } = req.params;
    try {
        let countryById = await Country.findByPk(id.toUpperCase(), {
            include: {
                model: Activity
            }
        })
        res.json(countryById || "ID not found");

    } catch (error) {
        next(error);

    }
}

const getcountryByName = async (req, res, next) => {
    const { name } = req.query;

    try {
        let countryByName = await Country.findAll({
            include:{
                model: Activity
            },
            where:{
                name: {[Sequelize.Op.ilike]: `%${name}%`}
            }
        })
        res.json(countryByName || "Country not found");

    } catch (error) {
        next(error);
    }

};

module.exports = {
    getAllCountries,
    getCountryById,
    getcountryByName
}