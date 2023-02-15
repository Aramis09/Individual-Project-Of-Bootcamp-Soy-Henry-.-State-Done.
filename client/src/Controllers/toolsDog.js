export const toolConvertBase64ToBlobForImages = async image =>{
    const verificationFrom = image.slice(0,8);
    if(verificationFrom === 'https://') return image;
    const base64Response = await fetch(`data:image/jpeg;base64,${image}`);
    const blobImage = await base64Response.blob();
    const blobImageURL= URL.createObjectURL(blobImage);
    return blobImageURL;
};

export const toolRemoveFavourite = (allDogsFav,idRemove)=> {
    const removeFinish = allDogsFav.filter(dog => dog.id !== idRemove);
    return removeFinish;
};

export const toolExistInFav = (allDogsFav,id) =>{
    return allDogsFav.find(dog => dog.id === id);
};