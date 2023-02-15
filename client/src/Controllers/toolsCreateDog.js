import axios from 'axios';
export const WARNING_NAME = 'Please make sure to put only letters, also use the corresponding capital letters..'
export const WARNING_WEIGHT = 'Please enter a separate weight range between them for that " - ". Not exceed 80kg' ;
export const WARNING_HIGHT = 'Please enter a separate height range between them for that " - ". Not exceed 110cm';
export const WARNING_LIFE_SPAN = 'Please enter a separate life span range between them for that " - ". Not exceed 22 years';
export const WARNING_TEMPER = 'Por favor asegurese de introcucir un valor correcto.';


export const testInput= inputValue => {
    let verification = {name:WARNING_NAME,weight:WARNING_WEIGHT,height:WARNING_HIGHT,lifeSpan:WARNING_LIFE_SPAN,temper:WARNING_TEMPER}; 

    if(testName(inputValue.name)) verification.name = 'Everything is correct';
    if(testRange(inputValue.weight,'weight')) verification.weight = 'Everything is correct';
    if(testRange(inputValue.height,'height')) verification.height = 'Everything is correct';
    if(testRange(inputValue.lifeSpan,'lifeSpan')) verification.lifeSpan = 'Everything is correct';
    // if(testTemper(inputValue.temper)) verification.temper = 'Everything is correct';
    return verification;
};

const testName = value =>{
    if(value.length === 0) return false; 
    let characters = value.split('')
    let alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z', ' '];
    if(characters[0].toLowerCase() === characters[0]) return false; // porque tiene que empezar con mayuscula.
    for(let i = 0 ; i < characters.length ; i++){
        if(!alphabet.includes(characters[i].toLowerCase())) return false;
    };
    return true;
};

const testRange = (rangeBetweenThem, wereFromData)=>{
    const stringRange = rangeBetweenThem.split('-');
    if(stringRange.length < 2 || stringRange.length > 2 || stringRange[0] === '' || stringRange[1] === '') return false;
    if(stringRange[1] <= stringRange[0]) return false;
    if(wereFromData === 'weight'){
        if(stringRange[1] > 80) return false
    }
    if(wereFromData === 'height'){
        if(stringRange[1] > 110) return false
    }
    if(wereFromData === 'lifeSpan'){
        if(stringRange[1] > 20) return false
    }
    return true; 
};

export const postNewDogInDb = async(warning,formValue,imageUpload,tempersAddToUpload)=>{
    if(warning.name === warning.weight && warning.weight === warning.height && warning.height === warning.lifeSpan && warning.lifeSpan === 'Everything is correct'){ //poner lo de arriba dentro del if y borrarle el 2 del nombre
        if(imageUpload.base64){//debe subirse una imagen si o si.
            let newDog = {
                name:formValue.name,
                image: imageUpload.base64,
                imagePreview:imageUpload.preview,
                weight:formValue.weight,
                height:formValue.height,
                life_span:formValue.lifeSpan,
                temper:tempersAddToUpload,
            };
            await axios.post('http://localhost:3001/dogs',newDog);
        };
    };
};

export const getDogsFromDb = async ()=>{
    const dogsFromDbResponse = await axios.get('http://localhost:3001/dogs/db');
    const dogsFromDb = dogsFromDbResponse.data;
    return dogsFromDb;
};

export const deleteTemper = (tempersAdded,temperForDelete)=>{
    const listTemperFiltered = tempersAdded.filter(temper => temper !== temperForDelete);
    return listTemperFiltered;
};

//http://localhost:3001/dogs/db



