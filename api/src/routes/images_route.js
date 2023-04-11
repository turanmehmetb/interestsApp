import express from 'express'
const router = express.Router();

router.get('/:path', async function(req, res, next) {
    try {
        if(req.params.path) {
            res.sendFile(decodeURI(req.params.path))
        }
        else res.status(404);
    }
    catch(err) {
        console.log(err);
        res.status(404);
    }
});

export default router;
