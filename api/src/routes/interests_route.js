import express from 'express'
import { getInterests, getPopularityReport } from '../services/interests_service';
const router = express.Router();

router.get('/', async function(req, res, next) {
    try {
        const data = await getInterests()
        res.send(data);
    }
    catch(err) {
        console.log(err)
    }
});

router.get('/:dateType', async function(req, res, next) {
    try {
        if(req.params.dateType) {
            const data = await getPopularityReport(req.params.dateType);
            res.status(200).send(data);
        }
        else res.status(504);
    }
    catch(err) {
        console.log(err);
    }
});

export default router;
