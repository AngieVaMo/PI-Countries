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
        await newActivity.addCountry(countriesByAct);
    
        return res.json({message: "Activity succesfully added"});

    } catch (error) {
        next(error);
    }
}

const getActivity= async (req, res, next) => {
    try {
        const foundActivities= await Activity.findAll({
            include: Country

        })
        if(foundActivities.length === 0){
            res.send("No activities found");
        } else{
            res.status(200).send(foundActivities)
        }
    } catch (error) {
        next(error)
    }
}

module.exports = {
    postActivity,
    getActivity
}