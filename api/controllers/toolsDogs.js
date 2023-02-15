const { Dog, Temper } = require('../src/db');
const axios = require('axios');
const {
    KEY_API
  } = process.env; 

async function completeListOfDogs() {
    let dogsDB = await getDogsFromDb();
    let dogsApi = await getDogsFromApi();
    const completeList = dogsDB.concat(dogsApi);   
    return completeList;
};

const getDogsFromApi = async () => {
    try {
    const response= await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${KEY_API}`);
    const listAllDogsFromApi = await response.data;
    const listFirst100Dogs = await listAllDogsFromApi.slice(0,101);
    return listFirst100Dogs;

    } catch (error) {
        return 'This is a flag to alert that the Api was break down'
    };
};

const getDogsFromDb = async () => {
    const response = await Dog.findAll({
        include : {
            model: Temper,
        }
    });
    const dogsInDb = [];
    await response.forEach( dog => {
        dogsInDb.push(dog.dataValues);
    });
    return dogsInDb;
};

const findDogsByName = async (nameDog) => {
    try {
        const completeListOfDogss = await completeListOfDogs();
        if(typeof(completeListOfDogss) === 'string') throw new Error('Error, The Api probably  was break down right now');
        let hightCoincidences = []; //Almacena los juegos que tienen alta coincidencia con el name pasado
        let lowCoincidences = [];   //Almacena los juegos que tienen baja coincidencia con el name pasado
        completeListOfDogss.forEach(dogCurrent => {
            let dogNameArray = dogCurrent.name.toLowerCase().split(',').join('').split(' ');
            const dogNameForSearchInArray = nameDog.toLowerCase().split(',').join('').split(' ');
            let coincidences = 0;
            for(const index in dogNameForSearchInArray){
                if(dogNameArray.includes(dogNameForSearchInArray[index])) {
                  coincidences++//////////////////////////////
                }
            }
            if(coincidences >= 2) hightCoincidences.push(dogCurrent);//
            else if(coincidences) lowCoincidences.push(dogCurrent);//
        });
        const allDogsMatchByName = [...hightCoincidences,...lowCoincidences];
        
        if(!allDogsMatchByName.length)  throw new Error('Cannot found dog with the entry name'); 
        if(allDogsMatchByName.length < 15 && allDogsMatchByName.length) return allDogsMatchByName;
        if(allDogsMatchByName.length > 15) {
        const first15Dogs = allDogsMatchByName.slice(0,16);
        return first15Dogs;
        };
    } catch (error) {
        return error.message;
    };
};

const findDogById = async id => {
    try {
        const foundDog = await findDogByIdJustLogic(id);
        if(typeof(foundDog) === 'string') throw new Error('Not found none dog with that id');
        return foundDog;
    } catch (error) {
        return error.message;
    };
};

const findDogByIdJustLogic = async id =>{
    try {
        const response = await completeListOfDogs();
        const foundDog = await response.find( recipe => Number(recipe.id) === Number(id));
        if(foundDog) return foundDog;
        return 'Not found none recipe with that id'
    } catch (error) {
        return 'This is a flag to alert that the Api was break down';
    };
};

const createID = async () =>{
    const dogListInDB = await Dog.findAll();
    if(!dogListInDB.length) return  id = 1195753; // mucho mayor al mayor de la api
    let mayorID = 0;
    for(let i = 0 ; i < dogListInDB.length ; i++){
        if(mayorID < dogListInDB[i]['id']) {
            mayorID = dogListInDB[i]['id'];
        };
    };
    let idUnique = mayorID + 1;
    return idUnique;
};

const associationOneDogWithOneTemper = async (newDog,temperName)=>{
    let temperReationShip = await Temper.findAll({where:{name:temperName}});// lo que va dentro del where es la columna de la tabla
    if(!temperReationShip) throw new Error('Please, enter a type diet valid');
    newDog.addTemper(temperReationShip);
};

const associationDogWithTempers = async (newDog,arrayTempers) => {
    try {
        await arrayTempers.forEach(async temper => await associationOneDogWithOneTemper(newDog,temper));
    } catch (error) {
        return 'fallo la asociacion de perro a temperamento';
    };
};

module.exports = {
    completeListOfDogs,
    findDogsByName,
    createID,
    associationDogWithTempers,
    getDogsFromApi,
    findDogById,
    getDogsFromDb
};