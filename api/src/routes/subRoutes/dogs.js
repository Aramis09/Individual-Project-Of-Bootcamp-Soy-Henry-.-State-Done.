const { Router } = require('express');
const { findDogById,findDogsByName,completeListOfDogs,createID,associationDogWithTempers, getDogsFromDb }  = require('../../../controllers/toolsDogs.js');
const { Dog,Temper } = require('../../db');
const router = Router();


router.get('/', async(req,res)=>{
    try {
        if(req.query.name){
                if(typeof(req.query.name) === 'string'){
                    console.log(req.query.name)
                    const { name } = req.query;
                    const foundDogs = await findDogsByName(name);
                    if(typeof(foundDogs) === 'string') throw new Error(foundDogs); //founDogs puede traer un error o los perros
                    return res.status(200).json(foundDogs);
                }
                throw new Error('Please, Enter a correctly name (not numbers) ');
        }
        else{
            const listCompleteDogs = await completeListOfDogs();
            if(typeof(listCompleteDogs) === 'string') throw new Error(listCompleteDogs); 
            return res.status(200).json(listCompleteDogs);
        };
    } 
    catch (error) {
        return res.status(400).send(error.message);
    };
});

router.get('/db',async (req,res)=>{
try {
    const dogFromDb = await getDogsFromDb();
    if(typeof(dogFromDb)==='string') throw new Error('cannot get dogs from Db');
    return res.status(200).json(dogFromDb);
} catch (error) {
    res.status(400).send(error.message);
}
});

router.get('/:id', async (req,res)=>{
    try {
        const { id } = req.params
        const foundDog = await findDogById(id);
        if(typeof(foundDog) === 'string') throw new Error(foundDog);
        return res.status(200).json(foundDog);
        
    } catch (error) {
        return res.status(400).send(error.message);
    }
});

router.post('/',async(req,res)=>{
    try {
        const { name,image,imagePreview , height, weight, life_span,temper } = req.body; //diets debe ser una array
        const id = await createID(); // crea un id unico.
        const newDog = await Dog.create({
            id, 
            name,
            image,
            imagePreview, 
            height, 
            weight, 
            life_span,  
        });
         await associationDogWithTempers(newDog,temper);
         return res.status(200).json(newDog);
    } catch (error) {
        return res.status(400).send(error.message);
    }
});

router.delete('/:id', async (req,res)=>{
    try {
        const {id} = req.params;
        await Dog.destroy({
            where:{
                id
            }
        });
        return res.status(200).send('Dog was deleted');
    } catch (error) {
        return res.status(400).send('error, we cannot to delete dog');
    }
});
module.exports = router;