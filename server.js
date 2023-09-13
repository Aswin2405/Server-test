/**
 * @swagger
 * components:
 *   schemas:
 *     States:
 *       type: object
 *       required:
 *          - latitude
 *          - longitude
 *       properties:
 *           first_name:
 *            type: string
 *           last_name:
 *            type: string
 *           latitude:
 *            type: string
 *           longitude:
 *            type: string
 */
 
/**
 * @swagger
 * /get-states/:
 *   get:
 *     description: use to request all states
 *     tags: [STATES CRUD]
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *              schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Guru'
 */

/**
 * @swagger
 * /paginated-states/:
 *   get:
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number to request
 *       - in: query
 *         name: perPage
 *         schema:
 *           type: integer
 *         description: Total number of pages to request
 *     description: Use to request all states using pagination
 *     tags: [STATES CRUD]
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Messages'
 */

/**
 * @swagger
 * /grouped-states/:
 *   get:
 *     parameters:
 *       - in: query
 *         name: country
 *         schema:
 *           type: string
 *         description: unique id of one state to request
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number to request
 *       - in: query
 *         name: perPage
 *         schema:
 *           type: integer
 *         description: Total number of pages to request
 *     description: use to send selected states by sending the unique id
 *     tags: [STATES CRUD]
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *              schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Messages'
 */


import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import UrlRoute from "./routes/UrlRoute.js";
import dotenv from "dotenv"
import rateLimit from "express-rate-limit"
import XLSX from "xlsx";
import Guru from "./models/Guru.js";
import Aswin from "./models/Aswin.js";
import swaggerJsdoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"

const app = express()

// const workbook = XLSX.readFile('Book1.csv');
// const sheetName = workbook.SheetNames[0]; // Assuming data is in the first sheet
// const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

// // console.log(jsonData)

app.use(express.json())
app.use(cors())
dotenv.config()

const port = 3001;

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Population Analayst',
      version: '1.0.0',
    },
  },
  apis: ["server.js"], // files containing annotations as above
};

const swaggerDocument = swaggerJsdoc(options);
app.use("/docs",swaggerUi.serve, swaggerUi.setup(swaggerDocument))

mongoose.connect(process.env.MONGO_URI)

mongoose.connection.once("open",()=>{
    console.log("DB Connected")
})

const limiter = rateLimit({
    windowMs: 1000 * 60 * 1000,
    max:5
})
   
  function groupStates(states) {
    const grouped = [];
  
    states.forEach((state) => {
      let added = false;
  
      grouped.forEach((group) => {
        if (isClose(state, group[0])) {
          group.push(state);
          added = true;
        }
      });
  
      if (!added) {
        grouped.push([state]);
      }
    });
  
    return grouped;
  }
  
  // Function to check if two sets of coordinates are close
  function isClose(state1, state2) {
    const lat1 = state1?.latitude;
    const lon1 = state1?.longitude;
    const lat2 = state2?.latitude;
    const lon2 = state2?.longitude;
  
    // Calculate the Euclidean distance (simplified for demonstration)
    const distance = Math.sqrt(Math.pow(lat1 - lat2, 2) + Math.pow(lon1 - lon2, 2));
  
    // Set a distance threshold (adjust as needed)
    const distanceThreshold = 5.0;
  
    return distance <= distanceThreshold;
  }
    
  // Endpoint to get grouped states (simplified grouping)
  app.get('/grouped-states', async(req, res) => {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;

    const data = await Aswin.find().skip((page - 1) * perPage).limit(perPage);
    const country = req.query.country;
      const aswinData = data.map(async(a)=>
      {
        let apiUrl = `https://api.what3words.com/v3/convert-to-3wa?coordinates=${(a.FIELD5?.split("[")[1])?.toString()}%2C${(a.FIELD6?.split("["))?.toString()?.slice(0, -2)}&language=en&format=json&key=ZRBLF2JB`
        try {
          const response = await fetch(apiUrl);
          if (response.ok) {
            const jsonData = await response.json();
            const fgh = {
              id:a?._id,
              test: `https://api.what3words.com/v3/convert-to-3wa?coordinates=${(a.FIELD5?.split("[")[1])?.toString()}%2C${(a.FIELD6?.split("["))?.toString()?.slice(0, -2)}&language=en&format=json&key=ZRBLF2JB`,
              first_name : a.first_name,
              last_name: a.last_name,
              latitude:(a.FIELD5?.split("[")[1])?.toString(),
              longitude:(a.FIELD6?.split("["))?.toString()?.slice(0, -2),
              country: jsonData.country
            }
            return fgh
          }
        }catch(err){
            console.log(err)
          }
    })

    Promise.all(aswinData)
  .then((results) => {
    const grouped = groupStates(results);

    const arrayOfObjects = [].concat(...grouped);
  
    const fildata = arrayOfObjects.filter(a=>a?.country===country && a)

    res.json(fildata);
  })
  .catch((error) => {
    console.error('Error while fetching data:', error);
  });
  });

  app.get("/get-states",async(req, res) => {
    const data = await Guru.find();
    const aswinData = data.map((a)=>(
      {
      first_name : a.first_name,
      last_name: a.last_name,
        latitude:(a.FIELD5?.split("[")[1])?.toString(),
        longitude:(a.FIELD6?.split("["))?.toString()?.slice(0, -2)
    }))
      res.json(aswinData)
  })

  app.get('/paginated-states', async(req, res) => {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;

    const data = await Guru.find().skip((page - 1) * perPage).limit(perPage);

    res.json(data);
  });

app.get('/', limiter, (req, res) => {res.status(200).send("Hello Brother")})

//url Shortner
app.use("/url",UrlRoute)

app.listen(port,console.log(`listening on port ${port}`))