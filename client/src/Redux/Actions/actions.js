import axios from 'axios';
import { MODIFY_LIST_DOGS,SHOW_DETAIL,START_GET_DOGS,SUCCES_GET_DOGS,ERROR_GET_DOGS ,START_GET_DOGS_BY_BREED,SUCCES_GET_DOGS_BY_BREED,ERROR_GET_DOGS_BY_BREED, ORDER_ALPHABETICAL_UP, ORDER_ALPHABETICAL_DOWN, ADD_FAVOURITES, REMOVE_FAVOURITES, RESTOR_LIST_DOGS, ORDER_GREATER_WEIGHT, ORDER_LOWER_WEIGHT } from './constActions';

const startGetDogs = () => ({type: START_GET_DOGS});
const succesGetDogs = payload => ({type: SUCCES_GET_DOGS, payload});
const errorGetDogs = () => ({type:ERROR_GET_DOGS, payload:'Error get dogs'});


export const getDogsListFromServer = () => {
    return  dispatch => {
     dispatch(startGetDogs());
      axios('http://localhost:3001/dogs')
      .then(response => {
         dispatch(succesGetDogs(response.data));
     })
     .catch( error => {
         dispatch(errorGetDogs( 'Error action'));
     });
    };
 };

 export const orderAlphabeticalUp = payload => ({type:ORDER_ALPHABETICAL_UP,payload});
 export const orderAlphabeticalDown = payload => ({type:ORDER_ALPHABETICAL_DOWN ,payload});

export const orderGreaterWeight = payload =>({type:ORDER_GREATER_WEIGHT ,payload});
export const orderLowerWeight = payload =>({type:ORDER_LOWER_WEIGHT,payload});


export const addFavourites = payload =>({type:ADD_FAVOURITES,payload});
export const removeFavourites = payload => ({type:REMOVE_FAVOURITES,payload});

export const showDetail = payload => ({type:SHOW_DETAIL,payload});

export const modifyInStoreTheDogs = payload =>({type:MODIFY_LIST_DOGS, payload});

export const restorDogList = () =>({type:RESTOR_LIST_DOGS});

const startGetDogsByName = () => ({type:START_GET_DOGS_BY_BREED});
const succesGetDogsByName = payload => ({type:SUCCES_GET_DOGS_BY_BREED, payload});
const errorGetDogsByName = (payload) =>({type:ERROR_GET_DOGS_BY_BREED, payload});

export const getDogsByName = payload => {
    return  dispatch => {
     dispatch(startGetDogsByName());
      axios(`http://localhost:3001/dogs?name=${payload}`)
      .then(response => {
         dispatch(succesGetDogsByName(response.data));
     })
     .catch( error => {
         dispatch(errorGetDogsByName( 'Error action get dogs by breed'));
   
     });
     };
 };



