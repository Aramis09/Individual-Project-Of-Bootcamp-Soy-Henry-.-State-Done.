import axios from "axios";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { toolConvertBase64ToBlobForImages } from "../../Controllers/toolsDog";
import {  getDogsListFromServer } from "../../Redux/Actions/actions";
import style from './styles/dogsUpload.module.css';
import icon_cross from './styles/images/icon_cross2.png';


const DogUpload = ({id,name,image,weight,height,life_span,temper,getDogsListFromServer})=>{
    const [imageSRC,setImageSRC] = useState(null);

    useEffect(()=>{
        let unMounted= false;
        const verificationImage = async imageDog => {
           const imageURL = await toolConvertBase64ToBlobForImages(imageDog);
           if(unMounted) return;
           setImageSRC(imageURL);
        };
        if(!unMounted) verificationImage(image);
        return ()=>{
            unMounted= true;
        }
    },[image]);

    const handlerDeleteDog= async() => {
        await axios.delete(`http://localhost:3001/dogs/${id}`);
        await getDogsListFromServer();
    };
    return(
        <div className={style.dogUploaded}>
            <img className={style.icon_cross} src= {icon_cross} alt="icon_cross" onClick={()=> handlerDeleteDog()}/>
            <p className={style.name}>{name}</p>
            <img className={style.image_dog} src= {imageSRC} alt="img_dogs"/>
            <div className={style.characteristics}>
                <p >Weight: {weight} kg</p>
                <p >Height: {height} cm</p>
                <p >Life span: {life_span} years</p>
                <p >Temperaments: {temper}</p>        
            </div>
        </div>
    );

};


const mapStateToProps = state => ({
    
});

const mapDispatchToProps = dispatch => ({
    getDogsListFromServer: () => dispatch (getDogsListFromServer()),
    
});

export default  connect(
    mapStateToProps,
    mapDispatchToProps
)(DogUpload);
