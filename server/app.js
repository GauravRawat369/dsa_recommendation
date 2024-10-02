import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser';
const app = express();


import authRoutes from './routes/auth.route.js'
import questionRoute from './routes/question.route.js'
app.use(cors()); // Enable CORS for all origins
app.use(bodyParser.json()); // Parse JSON bodies


const PORT = process.env.PORT || 8001;

import connectToMongodb from './db/connectToMongoDb.js'
app.use("/api/auth",authRoutes)

app.use('/api/questions',questionRoute)


app.listen(PORT, () => {
    connectToMongodb();
  console.log(`Server running on http://localhost:${PORT}`);
});
