import style from './style/dog.module.css';
import { Link } from "react-router-dom";
import icon_fav from './style/images/icon_heart2.png';
import icon_cross from './style/images/icon_cross2.png';
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import { toolConvertBase64ToBlobForImages, toolExistInFav, toolRemoveFavourite } from '../../Controllers/toolsDog';
import { addFavourites, removeFavourites,showDetail } from '../../Redux/Actions/actions';

// import { toolRemoveFavourite,toolExistInFav,toolConvertBase64ToBlobForImages } from '../../Controllers/toolsRecipe';

const Dog= (dataOfDogsAndAction)=> {
    const [imageSRC,setImageSRC] = useState(null);
    const [changeClass,setChangeClass] = useState({heartIcon:style.favoriteAdd_image_off, crossIcon:style.deleteFav_image_off, flag:false});
    
    useEffect(()=>{
        const verificationImage = async imageDog => {
           const imageURL = await toolConvertBase64ToBlobForImages(imageDog);
           setImageSRC(imageURL);
        };
        verificationImage(dataOfDogsAndAction.image);
    },[dataOfDogsAndAction]);

    useEffect (()=>{
        if(dataOfDogsAndAction.whereFrom === 'favouritesComponent'){
            setChangeClass({heartIcon:style.favoriteAdd_image_none, crossIcon:style.deleteFav_image_on, flag:false})
        };
        //es para mantener el color en el corazon cuando navegamos.
        if(toolExistInFav(dataOfDogsAndAction.favouritesDogs,dataOfDogsAndAction.id)) {
            if(dataOfDogsAndAction.whereFrom === 'homeComponent') setChangeClass({heartIcon:style.favoriteAdd_image_on, crossIcon:style.deleteFav_image_off, flag:true});
         }; 
    },[dataOfDogsAndAction] );


    const hanlderDispatchFavAndChangedClass = ()=>{
        const actionAddFav = dataOfDogsAndAction.addFavourites;
        if(!changeClass.flag) {
            setChangeClass({heartIcon:style.favoriteAdd_image_on, crossIcon:style.deleteFav_image_off, flag:true});
            actionAddFav(dataOfDogsAndAction);
        }
        else{
            setChangeClass({heartIcon:style.favoriteAdd_image_off, crossIcon:style.deleteFav_image_off, flag:false});
            hanlderRemoveFavourite();
        };
    };

    const hanlderRemoveFavourite = () => {
        const  allRecipesFavourites = dataOfDogsAndAction.favouritesDogs;
        const idRemove = dataOfDogsAndAction.id;
        const favouritesFiltered = toolRemoveFavourite(allRecipesFavourites,idRemove);
        dataOfDogsAndAction.removeFavourites(favouritesFiltered);
    };


    const handlerDetailShow = ()=>{
        dataOfDogsAndAction.showDetail(dataOfDogsAndAction);
    };

    return (
        <div className={style.dog}>
            <img  src={icon_fav} alt="addFav" onClick={()=>hanlderDispatchFavAndChangedClass()} className={changeClass.heartIcon}/>
            <img src={icon_cross} alt="deleteFav" onClick={() => hanlderRemoveFavourite()} className={changeClass.crossIcon}/>
            <p className={style.dog_name}>{dataOfDogsAndAction.name}</p>
            <img src= {imageSRC} alt="img_dogs" className={style.img_dogs} />
            <p className={style.dogWeight}>weight:({ dataOfDogsAndAction.weight})kg</p>
            <p className={style.dogTempers}>Temperament:  {dataOfDogsAndAction.temperament}</p>
            <Link to='/home/detail'><button onClick={()=> handlerDetailShow()} ><p>Detalles</p></button></Link>
        </div>
        
    );

};


const mapStateToProps = state => ({
    favouritesDogs: state.favourties,
    dogDetail: state.detail,
});
const mapDispatchToProps = dispatch => ({
    addFavourites: dogWillAdd => dispatch(addFavourites(dogWillAdd)),
    removeFavourites: dogWillRemoved => dispatch(removeFavourites(dogWillRemoved)),
    showDetail: dog => dispatch(showDetail(dog)),
});

export default  connect(
    mapStateToProps,
    mapDispatchToProps
)(Dog);