import { Link } from "react-router-dom";
import style from './styles/header.module.css';
import icon_dog from './styles/images/icon_dog.png';
import icon_heart from './styles/images/icon_heart.png';


const Header = () => {
    
    return (
        <header className={style.navigation}>
            <div className={style.logo}>
                <img src={icon_dog} alt="logo" />   
                <Link to = '/'><p className={style.logo}>Lovely Dog</p></Link>
            </div>
            <nav>
                <Link to = '/home'>
                    <button>                
                    Dog List
                    </button>
                </Link> 

                <Link to = '/home/create'>
                    <button>
                        Upload Dog 
                    </button>
                </Link>
                <Link to= '/home/about'>
                    <button>
                        About
                    </button>
                </Link>
                <Link to= '/home/favourite' >
                    <button className={style.icon_heart}>
                        <img src={icon_heart} alt="" />    
                    </button>
                </Link>
            </nav>
        </header>
    );
};
export default Header;