const {Country, Activity} = require("../db.js");

const postActivity = async (req, res, next) => {
    const { name, difficulty, span, season, countryName } = req.body;
    try {
        let newActivity = await Activity.create({
            name, 
            difficulty, 
            span, 
            season
        }) 
    
        let countriesByAct = await Country.findAll({
            where: {
                name : countryName
            }
        })
        await Activity.addCountry(countriesByAct);
    
        return res.json({message: "Activity succesfully added"});

    } catch (error) {
        next(error);
    }
}

module.exports = {
    postActivity,
}