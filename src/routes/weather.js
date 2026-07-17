import axios from "axios";
import { Router } from "express";
import redis from "../redis.js";
const router = Router()



/**
 * @swagger
 * /weather:
 *   get:
 *     summary: Get current weather information for a city
 *     description: Fetches the current weather data for a specified city. Defaults to London if no city is provided.
 *     parameters:
 *       - in: query
 *         name: city
 *         schema:
 *           type: string
 *         description: The name of the city to fetch weather data for
 *     responses:
 *       200:
 *         description: Weather data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 temp_c:
 *                   type: number
 *                   description: Temperature in Celsius
 *                 condition:
 *                   type: string
 *                   description: Weather condition description
 *                 city:
 *                   type: string
 *                   description: Name of the city
 *                 country:
 *                   type: string
 *                   description: Name of the country
 *       500:
 *         description: Error in fetching data from 3rd party API
 */
router.get("/weather", async (req, res) => {
    const city = req.query.city || "London"; // Default to London if no city is provided
    try {

        const dataFromRedis = await redis.get(city)

        if(dataFromRedis){
            const data = JSON.parse(dataFromRedis)
            return res.status(200).json({ temp_c: data.current.temp_c, condition: data.current.condition.text, city: data.location.name, country: data.location.country });
        }

        const data = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${city}`)
        await redis.setex(city, 900, JSON.stringify(data.data));

        res.status(200).json({ temp_c: data.data.current.temp_c, condition: data.data.current.condition.text, city: data.data.location.name, country: data.data.location.country });
    } catch (error) {
        console.log(error.response.statusText)

        res.status(500).json({message: "Error in fetching data from 3rd party API, please try later"})
    }

});


export default router;