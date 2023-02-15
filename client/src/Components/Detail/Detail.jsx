import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { toolConvertBase64ToBlobForImages } from '../../Controllers/toolsDog';
import { showDetail } from '../../Redux/Actions/actions';
import style from './styles/detail.module.css';
import Loading from '../Loading/Loading';

const Detail = ({detailDog,hideDetail}) =>{
    const [imageSRC,setImageSRC] = useState(null);
    
    useEffect(() => {
        return ()=>{
            hideDetail(null);
        };
    },[hideDetail]);//verificar dependencias

    useEffect(()=>{

        const verificationImage = async imageRecipe =>{
           const imageURL = await toolConvertBase64ToBlobForImages(imageRecipe);
           setImageSRC(imageURL);
        };
        if(detailDog) verificationImage(detailDog.image);
    },[detailDog]);//verificar dependencias

    return(
        <section className={style.prueba}>
            {detailDog?
                <section className={style.gridContainer}>
                        <h4>{detailDog.name}</h4>
                        <div className={style.data}>
                            <img src={imageSRC} alt="imageRecipe" />
                            <p>Weight: {detailDog.weight}kg</p>
                            <p>Life span:  {detailDog.life_span}</p>
                            <p>Height: {detailDog.height}cm</p>
                            <p>Temperaments:  {detailDog.temperament}</p>
                        </div>
                </section>
            : <Loading whereFrom = 'Detail'/> 
            
            } 
        </section> 
    
    );
};

const mapStateToProps = state => ({
    detailDog: state.detail,
});
const mapDispatchToProps = dispatch => ({
    hideDetail: dog => dispatch(showDetail(dog)),
});
export default  connect(
    mapStateToProps,
    mapDispatchToProps
)(Detail);

// className={style.error}>Please reselect the dog in the list</p>