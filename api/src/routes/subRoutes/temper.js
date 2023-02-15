const { Router } = require('express');
const { addTemperToDB } = require('../../../controllers/toolsTemper');
const router = Router();

router.get('/',async (req,res)=>{
    try {
        const tempersList = await addTemperToDB();
        return res.status(200).json(tempersList);
    } catch (error) {
        return res.status(500).send('Opss, server is dead');
    };
});

module.exports = router;