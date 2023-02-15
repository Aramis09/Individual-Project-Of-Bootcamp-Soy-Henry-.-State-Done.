import style from './styles/landingPage.module.css';
import insta from './styles/images/insta.png';
import mail from './styles/images/mail.png';
import linkedin from './styles/images/linkedin.png';
import phone from './styles/images/phone.png';
import { Link } from 'react-router-dom';

const Landing = () => {

return (
    <div className={style.fondo}>
      <div className={style.fondo2}>
        <section className={style.body}>
          <div >
            <h4>Find your ideal puppy</h4>
            <Link to ='/home'><button> Start your experience now!!! </button></Link>
          </div>
        </section>

        <footer className={style.footer}>
          <div className={style.caja}>
            <a href={`https://instagram.com/sebaajaime?igshid=NDk5N2NlZjQ=`} target='blank'><img src={insta} alt="instagram" /></a>
          </div>
          <div className={style.caja}>
            <a href="https://www.linkedin.com/in/aramis-jaime-b2807a24b" target='blank'><img src={linkedin} alt="" /> </a>
          </div>
          <div className={style.caja}>
            {/* <p>Telefono</p> */}
            <img src={phone} alt="" />
          </div>
          <div className={style.caja}>
            {/* <p>Correo</p> */}
            <img src={mail} alt="" />
          </div>

        </footer>
      </div>
  </div>
);

};
export default Landing;

