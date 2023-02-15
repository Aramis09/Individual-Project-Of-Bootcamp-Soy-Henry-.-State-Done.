import Dog from "../Dog/Dog";
import { connect } from 'react-redux';
import style from './styles/favourites.module.css';
import { toolTestFromImage } from "../../Controllers/toolsHome";

const Favourites = (favourites)=>{
    return (
        <div className={style.background}>
            <p className={style.namePage}>Favorites List</p>
                <section className={style.favouritesList}>
                    {
                    favourites.favourites.map(dog => {
                        const {id, name,life_span,weight,height,temperament} = dog;
                        let image = toolTestFromImage(dog.image);   
                        return(
                            <Dog
                                key = {id + Math.random() - Math.random()}
                                id = {id}
                                whereFrom= {'favouritesComponent'}   
                                name = {name}
                                image = {image}
                                temperament = {temperament}
                                weight = {weight}
                                height = {height}
                                life_span = {life_span}
                            />
                        )
                    })
                    }
                </section>
        </div>
    );
};

const mapStateToProps = state => ({
    favourites: state.favourties
});
const mapDispatchToProps = dispatch => ({

});
export default  connect(
    mapStateToProps,
    mapDispatchToProps
)(Favourites);