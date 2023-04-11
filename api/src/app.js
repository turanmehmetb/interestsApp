import express, { json } from 'express';
import interestsRoute from './routes/interests_route';
import scoresRoute from './routes/scores_route';
import imagesRoute from './routes/images_route';
import { initDatabase } from './services/interests_service';
const cors = require('cors')

const app = express();

app.use(json());
app.use(cors());

const PORT = process.env.PORT || 3000;

initDatabase()
app.get('/', async (req, res) => {
    res.json({ status: true, message: "Our node.js app works" })
});

app.use('/interests', interestsRoute);
app.use('/scores', scoresRoute);
app.use('/getImage', imagesRoute);

app.listen(PORT, () => console.log(`App listening at port ${PORT}`));
