const {Country, Activity} = require("../db.js");
const { Op } = require("sequelize");

let getAllCountries = async (req, res, next) => {
    let { name } = req.query;

        try {
            if(name){
                let countriesByName = await Country.findAll({
                    where:{
                        name:
                        {
                            [Op.iLike]: `%${name}%`,
                        }
                    },
                    include: Activity,  
                })
                res.json(countriesByName);

            } else{
                let countries = await Country.findAll({
                    include: {
                        model: Activity
                    }
                });
                res.json(countries );
                
            }
        } catch (error) {
            next(error);
    
        }  
};

let getCountryById = async (req, res, next) => {
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


module.exports = {
    getAllCountries,
    getCountryById
}