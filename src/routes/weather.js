import axios from "axios";
import { Router } from "express";

const router = Router()



router.get("/weather", async (req, res) => {
    const city = req.query.city || "London"; // Default to London if no city is provided
    try {
        const data = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${city}`)
        res.status(200).json({ temp_c: data.data.current.temp_c, condition: data.data.current.condition.text, city: data.data.location.name, country: data.data.location.country });
    } catch (error) {
        console.log(error.response.statusText)

        res.status(500).json({message: "Error in fetching data from 3rd party API, please try later"})
    }

});


export default router;