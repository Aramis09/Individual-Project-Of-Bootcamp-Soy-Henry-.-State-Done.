export const toolNextPaginate = (dogsStore,shortPage, numberOfDogRendered) => {
    let newState = null; //tiene este valor para que no sete el estado local.
    let newShortPage = shortPage;
    if(numberOfDogRendered.length === 9){// para saber si estamos en las ultimas 
        newShortPage = { init: shortPage.init + 9 , finally: shortPage.finally + 9 };
        newState = dogsStore.slice(newShortPage.init,newShortPage.finally);
        return {newState, newShortPage};
    };
    return {newState, newShortPage};
};

export const toolPreviousPaginate = (dogsStore,shortPage) => {
    if(shortPage.init > 0){
        let newShortPage = { init: shortPage.init - 9 , finally: shortPage.finally - 9 };
        let newState = dogsStore.slice(newShortPage.init,newShortPage.finally );
        return {newState, newShortPage};
    }
    return {};
};

export const toolFindByBreedGroups = (dogsListFromStore,breedGroup) =>{
    let foundDogs = findByBreedGroupFunct(dogsListFromStore,breedGroup);
    return foundDogs;
};


export const toolAlphabeticalOrderUp= dogsListFromStore => {
    let dogListOrdered = dogsListFromStore.sort(alphabeticalOrderUpFunct);
    return dogListOrdered; 
};
export const toolAlphabeticalOrderDown = dogsListFromStore => {
    let dogListOrdered = dogsListFromStore.sort(alphabeticalOrderDownFunct);
    return dogListOrdered;
};

export const toolGreaterWeightOrder = dogsListFromStore => {
    let dogListOrdered = dogsListFromStore.sort(greaterWeightOrderFunct);
    return dogListOrdered;
};
export const toolLowerWeightOrder = dogsListFromStore => {
    let dogListOrdered = dogsListFromStore.sort(lowerWeightOrderFunct);
    return dogListOrdered;
};

export const toolTestFromImage = (image)=>{
    // if(!image) return image;//esto tengo que borrar, es solo para probar momentaneamente.
    if(typeof(image) === 'string') return image; //esto comprueba si es la imagen en base64;
    return image.url;
};

export const toolConvertToArrayOfStrings = arrayTemperFromDb=>{
    const arrayOfTempersStrings = arrayTemperFromDb.map(temperObj => temperObj.name);
    return String(arrayOfTempersStrings);
};

export const toolSearchByTemper = (dogList,temperForSearch) =>{
    const foundTemperaments = searchTemperamentFunct(dogList,temperForSearch);
     return foundTemperaments;
};

//////////LOGICA///////////LOGICA/////////////LOGICA///////////////LOGICA////////////////////LOGICA/////

function findByBreedGroupFunct(dogsListFromStore,breedGroup) {
    let dogsArrayMatched = [];
    dogsListFromStore.forEach( dog => {
        if(dog.breed_group && dog.breed_group.includes(breedGroup)) dogsArrayMatched.push(dog);
    });
    return dogsArrayMatched;
};

function alphabeticalOrderUpFunct(a,b){
    let frst = a.name.toLowerCase();
    let second = b.name.toLowerCase();
    if( frst === second) return 0;
    if( frst > second ) return 1;
     if( frst < second) return -1;
};

function alphabeticalOrderDownFunct(a,b){
    let frst = a.name.toLowerCase();
    let second = b.name.toLowerCase();
    if( frst === second) return 0;
    if( frst > second ) return -1;
     if( frst < second) return 1;
};

function lowerWeightOrderFunct(a,b){    
    
    let frst = null;                                                     
    let second = null;
    if(typeof(a.weight) === 'object'){
        if( a.weight.metric.split('-').length > 1) frst = Number(a.weight.metric.split('-')[1].split(' ')[1]);
        else frst = Number(a.weight.metric.split(' ')[0]);
    }
    else{
        if( a.weight.split('-').length > 1) frst = Number(a.weight.split('-')[1]);// tengo que sacar el ultimo split
        else frst = Number(a.weight.split(' ')[0]);
    }; 

    if(typeof(b.weight) === 'object'){
        if(b.weight.metric.split('-').length > 1) second = Number(b.weight.metric.split('-')[1].split(' ')[1]);
        else second = Number(b.weight.metric.split(' ')[0]);
    }
    else{
        if(b.weight.split('-').length > 1) second = Number(b.weight.split('-')[1]);// tengo que sacar el ultimo split
        else second = Number(b.weight.split(' ')[0]);
    };

    if( frst === second) return 0
    if( frst > second ) return 1;
     if( frst < second) return -1;
};


function greaterWeightOrderFunct(a,b){
    let frst = null;                                                     
    let second = null; 
    // if(a.weight.metric.split('-').length > 1) frst = Number(a.weight.metric.split('-')[1].split(' ')[1]);
    // else frst = Number(a.weight.metric.split(' ')[0]);

    // if(b.weight.metric.split('-').length > 1) second = Number(b.weight.metric.split('-')[1].split(' ')[1]);
    // else second = Number(b.weight.metric.split(' ')[0]);
    if(typeof(a.weight) === 'object'){
        if( a.weight.metric.split('-').length > 1) frst = Number(a.weight.metric.split('-')[1].split(' ')[1]);
        else frst = Number(a.weight.metric.split(' ')[0]);
    }
    else{
        if( a.weight.split('-').length > 1) frst = Number(a.weight.split('-')[1]);// tengo que sacar el ultimo split
        else frst = Number(a.weight.split(' ')[0]);
    }; 

    if(typeof(b.weight) === 'object'){
        if(b.weight.metric.split('-').length > 1) second = Number(b.weight.metric.split('-')[1].split(' ')[1]);
        else second = Number(b.weight.metric.split(' ')[0]);
    }
    else{
        if(b.weight.split('-').length > 1) second = Number(b.weight.split('-')[1]);// tengo que sacar el ultimo split
        else second = Number(b.weight.split(' ')[0]);
    };
    if( frst === second) return 0;
    if( frst > second ) return -1;
    if( frst < second) return 1;
};

const searchTemperamentFunct = (dogList,temperForSearch)=>{
    let matchedTempers = [];
    dogList.forEach(dog =>{
        if(dog.hasOwnProperty('temperament')){
            const arrayTempers = dog.temperament.split(',');
            if( arrayTempers.includes(temperForSearch)) matchedTempers.push(dog);
        };
        if(dog.hasOwnProperty('tempers')){
            const arrayTempers = dog.tempers.map( temperDb => temperDb.name);
            if( arrayTempers.includes(temperForSearch)) matchedTempers.push(dog);
        };
    });
    return matchedTempers;
};

export const arrayOfTempers = [
    "Stubborn",
    " Curious",
    " Playful",
    " Adventurous",
    " Active",
    " Fun-loving",
    "Aloof",
    " Clownish",
    " Dignified",
    " Independent",
    " Happy",
    "Wild",
    " Hardworking",
    " Dutiful",
    "Outgoing",
    " Friendly",
    " Alert",
    " Confident",
    " Intelligent",
    " Courageous",
    "Loyal",
    " Brave",
    "Docile",
    " Responsive",
    " Composed",
    " Receptive",
    " Faithful",
    "Loving",
    " Protective",
    " Trainable",
    " Responsible",
    "Friendly",
    " Energetic",
    " Loyal",
    " Gentle",
    " Affectionate",
    " Devoted",
    " Assertive",
    " Dominant",
    "Strong Willed",
    " Stubborn",
    " Obedient",
    " Reserved",
    "Kind",
    " Sweet-Tempered",
    " Loving",
    "Tenacious",
    " Attentive",
    "Steady",
    " Bold",
    " Proud",
    "Reliable",
    " Fearless",
    " Lively",
    " Self-assured",
    "Cautious",
    " Eager",
    "Good-natured",
    "Spirited",
    " Companionable",
    " Even Tempered",
    " Rugged",
    " Fierce",
    " Refined",
    "Obedient",
    " Joyful",
    "Affectionate",
    " Agile",
    "Amiable",
    " Excitable",
    " Determined",
    "Self-confidence",
    " Hardy",
    "Fearless",
    " Calm",
    " Spirited",
    " Good-tempered",
    "Watchful",
    " Hard-working",
    "Energetic",
    "Feisty",
    " Cheerful",
    " Sensitive",
    "Easygoing",
    " Adaptable",
    " Trusting",
    " Lovable",
    " Territorial",
    " Keen",
    "Protective",
    " Familial",
    " Rational",
    "Devoted",
    " Bright",
    "Agile",
    " Quick",
    "Trainable",
    " Reliable",
    " Powerful",
    "Hardy",
    " Gay",
    " Stable",
    " Quiet",
    " Inquisitive",
    "Alert",
    " Strong",
    " Sociable",
    " Patient",
    "Suspicious",
    " Great-hearted",
    " Merry",
    " Vocal",
    " Tolerant",
    " Mischievous",
    " People-Oriented",
    " Bossy",
    " Cunning",
    " Watchful",
    " Cautious",
    "Playful",
    " Easygoing",
    " Athletic",
    "Boisterous",
    " Cooperative",
    " Kind",
    "Intelligent",
    " Trustworthy",
    "Self-important",
    "Respectful",
    "Sweet-Tempered",
    " Thoughtful",
    " Generous",
    "Mischievous",
    " Cat-like",
    " Sturdy"
];
// a.life_span.split('-')[1].split(' ')[1]
// b.life_span.split('-')[1].split(' ')[1]
