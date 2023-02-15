const { Temper }= require('../src/db');
const { getDogsFromApi } = require('../controllers/toolsDogs');

const addTemperToDB= async () =>{
    try {
        let tempersInDB = await Temper.findAll();
        if(tempersInDB.length) return tempersInDB;
        let tempers = await createArrayOfObjTempers();
        const list = await Temper.bulkCreate(tempers);
        return await list;
    } catch (error) {
        return error.message; 
    };
};

const createArrayOfObjTempers = async ()=>{ // podemos usar un new Set, para simplificar las cosas.
    const dogListApi = await getDogsFromApi();
    let temperamentArray =  [];
    await dogListApi.forEach(dog => {
       if(dog.temperament){
           const arrayTempers = dog.temperament.split(',')
           arrayTempers.forEach( temper => {
           if(!temperamentArray.includes(temper)) temperamentArray.push(temper); 
       });
       };
   });
   let id = 0;
   let tempersForUpload = temperamentArray.map(temper => {
        const objUpload = {id,name:temper};
        id++;
        return objUpload;
    });
    return tempersForUpload;
};

module.exports ={ 
    addTemperToDB,
};