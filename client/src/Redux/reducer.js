import {ADD_FAVOURITES, REMOVE_FAVOURITES, START_GET_DOGS,SUCCES_GET_DOGS,ERROR_GET_DOGS,START_GET_DOGS_BY_BREED,SUCCES_GET_DOGS_BY_BREED,ERROR_GET_DOGS_BY_BREED, ORDER_ALPHABETICAL_UP, ORDER_ALPHABETICAL_DOWN, SHOW_DETAIL, RESTOR_LIST_DOGS, MODIFY_LIST_DOGS, ORDER_GREATER_WEIGHT, ORDER_LOWER_WEIGHT } from './Actions/constActions';

const initialState = {
    dogs: {
        loading: false, 
        loaded: false,
        order: false,
        changeOrder:false,
        dogs: null,
    },
    dogsByBreed:{
        searching:false,
        load:null,
        matchedDogs: null,
    },
    favourties:[],
    detail:null,
    backUpDogs:[],
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case START_GET_DOGS : 
            return {
                ...state,
                dogs:{
                    loading:true,
                    loaded: false,
                    order: false,
                    changeOrder:false,
                    dogs: null
                }, 
            };
        case SUCCES_GET_DOGS : 
            return {
                ...state,
                dogs:{
                    loading:false,
                    loaded: true,
                    order: false,
                    changeOrder:false,
                    dogs: action.payload,
                },
                backUpDogs:[...action.payload]
            };
        case ERROR_GET_DOGS:
            return {
                ...state,
                dogs: {
                    loading:false,
                    loaded: false,
                    order: false,
                    changeOrder:false,
                    dogs:null,
                    error:action.payload
                }
            };
        case START_GET_DOGS_BY_BREED:
            return {
                ...state,
                dogsByBreed:{
                    searching:true,
                    load:false,
                    matchedDogs: null,
                }
            };
        case SUCCES_GET_DOGS_BY_BREED:
            return {
                ...state,
                dogsByBreed:{
                    searching:false,
                    load:true,
                    matchedDogs: action.payload,
                }
            };
        case ERROR_GET_DOGS_BY_BREED:
            return {
                ...state,
                dogsByBreed:{
                    searching:false,
                    load:false,
                    matchedDogs: action.payload,
                }
            };
    case ORDER_ALPHABETICAL_UP:
            return {
                ...state,
                dogs:{
                    loading:false,
                    loaded: true,
                    order: 'alphabetical_up',
                    changeOrder:Math.random(),
                    dogs:action.payload,
                    error:'non',
                }
            };
        case ORDER_ALPHABETICAL_DOWN: 
            return{
                ...state,
                dogs:{
                    loading:false,
                    loaded: true,
                    order: 'alphabetical_down',
                    changeOrder:Math.random(),
                    dogs:action.payload,
                    error:'non'
                }
            };
            case ORDER_LOWER_WEIGHT:
            return {
                ...state,
                dogs: {
                    loading:false,
                    loaded: true,
                    order: 'lifetime_down',
                    changeOrder:Math.random(),
                    dogs:action.payload,
                    error:'non'
                }
            };
        case ORDER_GREATER_WEIGHT :
            return {
                ...state,
                dogs: {
                    loading:false,
                    loaded: true,
                    order: 'lifetime_up',
                    changeOrder:Math.random(),
                    dogs:action.payload,
                    error:'non'
                }
            };
        case ADD_FAVOURITES:
            return {
                ...state,
                favourties:[...state.favourties,action.payload]
            };
        case REMOVE_FAVOURITES:
            return {
                ...state,
                favourties:[...action.payload]
            };
        case SHOW_DETAIL: 
            return{
                ...state,
                detail: {...action.payload},
        };
        case MODIFY_LIST_DOGS: 
            return{
                ...state,
                dogs: {
                    loading: false, 
                    loaded: true,
                    order:'' ,
                    changeOrder:Math.random(),
                    dogs: action.payload, 
                },
        };
        case RESTOR_LIST_DOGS:
            return{
                ...state,
                dogs: {
                    loading: false, 
                    loaded: true,
                    order:false ,
                    changeOrder:Math.random(),
                    dogs: [...state.backUpDogs], 
                },
            };
        
            default:
                return { ...state };
        };
        
    };






export default reducer;