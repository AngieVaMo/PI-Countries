const axios = require("axios");
const {Country} = require("../db");

let downloadApi = async () => {
    try {
        const validation = await Country.findOne({
            where: {name: "Colombia"}
        });

        const apiGet = await axios.get("https://restcountries.com/v3/all");
        const apiInfo = await apiGet.data.map(c => {
          return {
            id: c.cca3,
            name: c.name.common,
            flag: c.flags[1],
            continent: c.region,
            capital: c.capital || ['No tiene capital'],
            subregion: c.subregion,
            area: c.area,
            population: c.population,
            //coatOfArms: c.coatOfArms.png
          }
        })

        if(!validation){
          await Country.bulkCreate(apiInfo);
          console.log("Countries loaded in db succesfully")
        }
    
    } catch (error) {
        console.log(error);

    }
}

module.exports = {
  downloadApi
}