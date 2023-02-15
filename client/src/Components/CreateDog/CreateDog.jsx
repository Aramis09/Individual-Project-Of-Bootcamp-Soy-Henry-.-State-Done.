import { useEffect, useState } from "react";
import { getDogsFromDb, postNewDogInDb, testInput,deleteTemper } from "../../Controllers/toolsCreateDog";
// import { newRecipe,axiosQueryRecipes } from '../../Redux/Actions/Actions';
import DogUpload from "../DogsUpload/DogsUpload";
import { connect } from "react-redux";
import { getDogsListFromServer } from "../../Redux/Actions/actions";
import { arrayOfTempers, toolConvertToArrayOfStrings } from '../../Controllers/toolsHome';
import style from './style/createDog.module.css';
import icon_cross from './style/images/icon_cross2.png';


const Create = ({getDogsListFromServer,dogListDependency}) => {
    const [formValue, setFromValue] = useState({name:'', weight:'', height:'', lifeSpan:'',temper:'',});
    const [warning,setWarning] = useState({});
    const [imageUpload,setImageUpload] = useState({base64:null,preview:null});
    const [dogsUpload,setDogsUpload] = useState([]);
    const [tempersAddToUpload,setTempersAddToUpload] = useState([]);
    
    // tengo que resolver la advertencia que marca de asincronia.
    useEffect(()=> {
        let cancel = false;
        if(!cancel) setWarning(testInput(formValue)); 
        return ()=>{
            cancel = true;
        }
    },[formValue]);

    useEffect(()=>{
        const updateList = async ()=>{
            const dogFromDb = await getDogsFromDb();
            setDogsUpload( await dogFromDb);
        }
       updateList();
    },[dogListDependency]);

    // useEffect(() => {
    //     let cancel = false;
      
    //     getDogsFromDb().then((dogsDb) => {
    //         if (cancel) return;
    //         setDogsUpload(dogsDb);
    //     });
      
    //     return () => { 
    //       cancel = true;
    //     }
    //   }, [dogListDependency]);

    const handlerChangesForm = (value,typeInput) =>{
        setFromValue({...formValue, [typeInput]:value}); 
    };
    
    const hanlderSendValuesForm = async ev =>{
        if(!tempersAddToUpload.length) return;
        await postNewDogInDb(warning,formValue,imageUpload,tempersAddToUpload);
        await getDogsListFromServer();
    };
//los 7 habitos de la gente altamente efectiva
    const handlerInputImage = blobImage => {// tengo que preguntar si blobImage existe.
        if(blobImage && (blobImage.type === 'image/png' || blobImage.type ==='image/jpeg')){
            let reader = new FileReader();
            reader.readAsDataURL(blobImage);
            reader.onload = function(){
                let imageInBase64 = reader.result.split(',')[1];
                let previewImage = URL.createObjectURL(blobImage);
                setImageUpload({base64:imageInBase64, preview:previewImage});
            };
        };
    };

    const hanlderAddTemperForUpload = temperForAdd => {
        setTempersAddToUpload([...tempersAddToUpload,temperForAdd]);
    };

    const HanlderDeleteTemperForUpload = temperForDelete => {
        const tempersFiltered = deleteTemper(tempersAddToUpload,temperForDelete);
        setTempersAddToUpload(tempersFiltered);
    };
    
    return (
        <section className={style.background}>
            <div className={style.backgroundOpacity}>

                <h3>Add your puppy 🐕</h3>
                <form action="createDog" id="formulario" onSubmit={ev =>ev.preventDefault()}> 
                    <div className={style.characteristicsDog}>
                        <p className={style.tittles}>Name</p>
                        <input type="text" name="form_name" onChange={(ev) => {handlerChangesForm(ev.target.value,'name')}}/>
                        <p className={style.warningForm}>{warning.name}</p>
                    </div>
                    <div className={style.characteristicsDog}>
                        <p className={style.tittles}>Weight</p>
                        <input type="text" name="form_Weight" placeholder="Lesser Value - Higher Value" onChange={(ev) => {handlerChangesForm(ev.target.value,'weight')}}/>
                        <p className={style.warningForm}>{warning.weight}kg</p>
                    </div>
                    <div className={style.characteristicsDog}>
                        <p className={style.tittles}>Height</p>
                        <input type="text" name="form_Height" placeholder="Lesser Value - Higher Value" onChange={(ev) => {handlerChangesForm(ev.target.value,'height')}}></input>
                        <p className={style.warningForm}>{warning.height} cm</p>
                    </div>
                    <div className={style.characteristicsDog}>
                        <p className={style.tittles}>Life Span</p>
                        <input type="text" name="form_Life_Span" placeholder="Lesser Value -Higher Value" onChange={(ev) => {handlerChangesForm(ev.target.value,'lifeSpan')}}></input>
                        <p className={style.warningForm}>{warning.lifeSpan} years</p>
                    </div>
                    <div>
                    
                    </div>
                    <div className={style.characteristicsDog}>
                        <p className={style.tittles}>Upload a image that show the dog</p>
                        <input type="file" name="dog_Image" id="dog_Image" className={style.inputImage} onInput={(ev) => handlerInputImage(ev.target.files[0])}/>
                        <p className={style.warningForm}>It is mandatory to upload the image</p>
                    <div className={style.imageUploaded}>
                        <p className={style.tittles}>Preview Image:</p>
                        <img src={imageUpload.preview} alt="" />
                    </div>
                    </div>

                    <section className={style.temperAddedSection}>
                        <select name="select_of_tempers" id="select_of_temper" onChange={(ev)=>hanlderAddTemperForUpload(ev.target.value)}>
                            {arrayOfTempers.map(temper =>{
                                return (
                                    <option value={temper} key={1-Math.random()+Math.random()}> 
                                            {temper}
                                        </option>
                                    );
                                })}
                        </select>
                        <div>
                            {tempersAddToUpload.map(temperAdded => {return(
                                <div key={1-Math.random()+Math.random()} className={style.temperAdded}>
                                    <img src={icon_cross} onClick={()=> HanlderDeleteTemperForUpload(temperAdded)}alt="icon_cross" />
                                    <p>{temperAdded}</p>
                                </div>)})}
                        </div>
                    </section>
                    <button className={style.send} onClick={ev => {
                        hanlderSendValuesForm();
                    }} > send dog</button>
                </form>
                <section className={style.listDogsUpload}>
                    {dogsUpload.map(dog => {
                        const temperaments = toolConvertToArrayOfStrings(dog.tempers);
                        return (
                            <DogUpload
                            key={Math.random()*Math.random()}
                            id={dog.id}
                            name={dog.name}
                            image={dog.image}
                            weight={dog.weight}
                            height={dog.height}
                            life_span={dog.life_span}
                            temper= {temperaments}
                            />
                            );
                        })}
                </section>
            </div>
        </section>
    );
}

const mapStateToProps = state => ({
    dogListDependency: state.dogs.dogs,
  
    
});

const mapDispatchToProps = dispatch => ({
    getDogsListFromServer: () => dispatch (getDogsListFromServer()),
});

export default  connect(
    mapStateToProps,
    mapDispatchToProps
)(Create);


