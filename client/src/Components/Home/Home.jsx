import { connect } from 'react-redux';
import { useState ,useEffect } from "react";
import Dog from '../Dog/Dog';
import style from './styles/home.module.css'; 
import { modifyInStoreTheDogs,getDogsListFromServer,orderAlphabeticalUp,orderAlphabeticalDown, restorDogList, getDogsByName, orderLowerWeight, orderGreaterWeight} from '../../Redux/Actions/actions';
import { toolConvertToArrayOfStrings,toolTestFromImage,toolNextPaginate,toolPreviousPaginate,toolFindByBreedGroups,toolAlphabeticalOrderUp,toolAlphabeticalOrderDown, arrayOfTempers,toolSearchByTemper, toolGreaterWeightOrder, toolLowerWeightOrder } from '../../Controllers/toolsHome';
import icon_search_mobile from './styles/images/icon_search.png';
import icon_menu_mobile from './styles/images/icon_menu.png';
import icon_order_mobile  from './styles/images/icon_order.png';
import icon_reload from './styles/images/refresh.png';
import Loading from '../Loading/Loading';

const Home = ({modifyInStoreTheDogs,backUpDogList,restorDogList,getDogsListFromServer,dogsFromStore,getDogsByName,foundByBreed,orderAlphabeticalUp,orderAlphabeticalDown,orderLowerWeight,orderGreaterWeight })=>{
    const [dogsListHome,setDogsListHome] = useState([]);
    const [shortPage,setShortPage] = useState({init:0, finally: 9}); 
    const [menuMobile,setMenuMobile] = useState({show:false, classListTypes:style.menuMobile_hide});
    const [orderMobile,setOrderMobile] = useState({show:false, classListTypes:style.orderMobile_hide});
    useEffect( () => {
        if(!dogsFromStore.loaded || dogsFromStore.dogs.length === 0){
            const bringDogs = async () => {
                getDogsListFromServer();
            }
            bringDogs();
        };
        if(dogsFromStore.loaded) {
            // dogs.dogs.forEach(dog => console.log(dog.diets))
            let numberOnePage = dogsFromStore.dogs.slice(0,9);//
            setDogsListHome(numberOnePage);
        };
    },[dogsFromStore.loaded,dogsFromStore.dogs,getDogsListFromServer]);

    useEffect(() => {
        if(foundByBreed.load) {
            setDogsListHome(foundByBreed.matchedDogs);
        };
    },[foundByBreed]);//foundByBreed.load

    useEffect(() => {
        if(typeof(dogsFromStore.changeOrder) === 'number') {
            setDogsListHome(dogsFromStore.dogs.slice(0,9))
        };
    },[dogsFromStore.changeOrder,dogsFromStore]);

    const handlerNextPaginate = () =>{
        let dogsStore = dogsFromStore.dogs;
        const {newState ,newShortPage} = toolNextPaginate(dogsStore,shortPage,dogsListHome);
        newState? setDogsListHome(newState) : setDogsListHome(dogsListHome); // capaz que pueda mejorarlo sacando los dos puntos
        if(newShortPage)setShortPage(newShortPage);  //este pregunta esta al pedo, puedo sacarla  y dejar el seteo  en teoria.
    };

    const handlerPreviusPaginate = () => {
        let dogsStore = dogsFromStore.dogs;
        const {newState ,newShortPage} = toolPreviousPaginate(dogsStore,shortPage);
        newState? setDogsListHome(newState) : setDogsListHome(dogsListHome);// capaz que pueda mejorarlo sacando los dos puntos
        if(newShortPage)setShortPage(newShortPage); //este pregunta esta al pedo, puedo sacarla y dejar el seteo en teoria.
    };

    const handlerSearchName = () => {
        const name  = document.getElementById('inputSearch').value; // esto todavia no existe.
        getDogsByName(name);
    };

    //necesito arreglar esto, tengo un problema con los perros de la db
    const handlerFindByBreedGroups = async breedGroup =>{
        let matched = toolFindByBreedGroups(backUpDogList,breedGroup);
        if(matched.length) modifyInStoreTheDogs(matched);
    };

    const handlerOrderalphAbeticalUp = () => {
        orderAlphabeticalUp(toolAlphabeticalOrderUp(dogsFromStore.dogs));
        setShortPage({init:0, finally: 9});
    };
    const handlerOrderalphAbeticalDown = () => {
        orderAlphabeticalDown(toolAlphabeticalOrderDown(dogsFromStore.dogs));
        setShortPage({init:0, finally: 9});
    };
    const handlerOrderGreaterWeight = () => {
        orderGreaterWeight(toolGreaterWeightOrder(dogsFromStore.dogs));
        setShortPage({init:0, finally: 9}); 
    };
    const handlerOrderLowerWeight = () => {
        orderLowerWeight(toolLowerWeightOrder(dogsFromStore.dogs));
        setShortPage({init:0, finally: 9});
    };
//este tengo que ver que onda.tengo problema de asincronia
    const hanlderSearchByTemper = (temper) =>{
        const dogsMatched = toolSearchByTemper(backUpDogList,temper);
        modifyInStoreTheDogs(dogsMatched);
    };
    const hanlderMenuMobile= ()=> {
        if(!menuMobile.show){
            setMenuMobile({show:true, classListTypes:style.menuMobile_show});
            setOrderMobile({show:false, classListTypes:style.orderMobile_hide});
        }    
        else{
            setMenuMobile({show:false, classListTypes:style.menuMobile_hide});
    
        };
    };

    const handlerOrderMobile = () =>{
        if(!orderMobile.show){
            setOrderMobile({show:true, classListTypes:style.orderMobile_show})
            setMenuMobile({show:false, classListTypes:style.menuMobile_hide});
        }
        else{
            setOrderMobile({show:false, classListTypes:style.orderMobile_hide});
        };
    };

    return(
        <div className={style.background}>
             {
                dogsListHome.length?
                <section className={style.gridContainer}>

                    <form className={style.search} onSubmit={ ev => {ev.preventDefault()}}>
                        <input type="text" id= 'inputSearch'  /> 
                        <img src={icon_search_mobile} alt="" onClick={ev =>  handlerSearchName()}></img> {/* hay que sacar el boton */}
                    </form>

                     <div className={style.icon_menu_mobile} onClick={() => hanlderMenuMobile() }>
                        <img src={icon_menu_mobile} alt="" />
                    </div>
                    <section className={menuMobile.classListTypes}>
                        <p>Breed Groups</p>
                        <ul>
                            <li><button onClick={() => handlerFindByBreedGroups('Toy')}>Toy</button></li>
                            <li><button onClick={() => handlerFindByBreedGroups('Working')}>Working</button> </li>
                            <li><button onClick={() => handlerFindByBreedGroups('Sporting')}>Sporting</button></li>
                            <li><button onClick={() => handlerFindByBreedGroups('Hound')}>Hound</button></li>
                            <li><button onClick={() => handlerFindByBreedGroups('Terrier')}>Terrier</button></li>
                            <li><button onClick={() => handlerFindByBreedGroups('Mixed')}>Mixed</button></li>
                            <li><button onClick={() => handlerFindByBreedGroups('Herding')}>Herding</button></li>
                        </ul>
                        <p> Weight characteristics</p>
                        <section className={style.orderForWeight}>
                                <button className={style.buttonsOrder} onClick={() => handlerOrderGreaterWeight()}>Greater weight</button>
                                <button className={style.buttonsOrder} onClick={() => handlerOrderLowerWeight()}>Lower weight</button>
                        </section>
                    </section>

                    <div className={style.icon_order_mobile} onClick= {()=> handlerOrderMobile()}>
                        <img src={icon_order_mobile} alt="" />
                    </div>
  
                    <section className={orderMobile.classListTypes}>
                        {/* <section > */}
                            <select name="select_of_tempers" id="select_of_temper" className={style.select_tempers} onChange={(ev)=>hanlderSearchByTemper(ev.target.value)}>
                                {
                                    arrayOfTempers.map(temper =>{
                                        return (
                                            <option value={temper} key={1-Math.random()+Math.random()}> 
                                                {temper}
                                            </option>
                                        );
                                    })
                                }
                            </select>
                            <img src={icon_reload} alt="reload" className={style.icon_reload} onClick={()=>restorDogList()}/>
                            <div className={style.alphabeticalOrderButton}>
                                <button className={style.buttonsOrder}onClick={() => handlerOrderalphAbeticalUp()}>Alphabetically A-Z</button>
                                <button className={style.buttonsOrder} onClick={() => handlerOrderalphAbeticalDown()}>Alphabetically Z-A</button>
                            </div>
                        {/* </section> */}
                    </section>

                    <section className={style.list_Dogs}>
                            {
                                (dogsListHome.map( dog => {
                                    const {id, name,life_span} = dog;
                                        let temperament = dog.temperament || toolConvertToArrayOfStrings(dog.tempers);
                                        let weight = dog.weight.metric || dog.weight;
                                        let height =dog.height.metric || dog.height;
                                        let image = toolTestFromImage(dog.image);                  
                                        return (
                                            <Dog
                                            key = {id}
                                            whereFrom= {'homeComponent'} 
                                            id = {id}
                                            name = {name}
                                            image = {image}
                                            temperament = {temperament}
                                            weight = {weight}
                                            height = {height}
                                            life_span = {life_span}
                                        />
                                    )
                                }))
                            }
                    </section>

                    <section className={style.paginate}>
                        <button onClick={() => handlerPreviusPaginate()} >Previus</button>
                        <button onClick = {() => handlerNextPaginate()} >Next</button>
                    </section>
                </section>
                : <Loading/>   
            }

        </div>
    );
};

const mapStateToProps = state => ({
    dogsFromStore: state.dogs,
    foundByBreed: state.dogsByBreed,
    backUpDogList: state.backUpDogs,
});


const mapDispatchToProps = dispatch => ({
    getDogsListFromServer: () => dispatch (getDogsListFromServer()),
    orderGreaterWeight: (arg) => dispatch(orderGreaterWeight(arg)),
    orderLowerWeight: (arg) => dispatch(orderLowerWeight(arg)),
    orderAlphabeticalUp: (dogsListOrdered) => dispatch(orderAlphabeticalUp(dogsListOrdered)),
    orderAlphabeticalDown:(dogsListOrdered) => dispatch(orderAlphabeticalDown(dogsListOrdered)),
    getDogsByName:(name) => dispatch(getDogsByName(name)),
    modifyInStoreTheDogs: dogListFiltered => dispatch(modifyInStoreTheDogs(dogListFiltered)),
    restorDogList: () => dispatch(restorDogList()),
});

export default  connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);