import express from 'express'
import { addScore, getAllScores, getScoresByDate } from '../services/scores_service';
const router = express.Router();

router.get('/', async function(req, res, next) {
    try {
        const data = await getAllScores();
        res.status(200).send(data);
    }
    catch(err) {
        console.log(err);
    }
});

router.post('/:id', async function(req, res, next) {
    try {
        if(req.params.id) {
            const data = await addScore(req.params.id);
            res.status(200).send(data);
        }
        else res.status(504);
    }
    catch(err) {
        console.log(err);
    }
});

router.get('/getByDate/:dateType', async function(req, res, next) {
    try {
        if(req.params.dateType) {
            const data = await getScoresByDate(req.params.dateType);
            res.status(200).send(data);
        }
        else res.status(504);
    }
    catch(err) {
        console.log(err);
    }
});

export default router;
