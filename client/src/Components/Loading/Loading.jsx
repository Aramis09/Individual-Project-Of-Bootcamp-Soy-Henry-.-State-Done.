
import style from './styles/Loading.module.css';
const Loading = ({whereFrom})=>{
    let message = null;
    whereFrom === 'Detail'? message = 'Please select the dog again in the general list. Enjoy the cool dog.'
    : message = 'Wait while you enjoy this cool dog ....';
    return (
        <section className={style.background}>
            <p>{message}</p>
        </section>
        )
};

export default Loading;