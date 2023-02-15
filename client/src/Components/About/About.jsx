import styles from './styles/about.module.css';
import personal_image from './styles/images/personal_image.jpg';
import icon_react from './styles/images/react.png';
import icon_node from './styles/images/node.png';
import icon_sql from './styles/images/sql.png';
const About = ()=>{

    return(
        <div className={styles.background}>
            <section className={styles.container}>
                <section className={styles.presentation} >
                    <div>
                        <h4>Informacion sobre Mi persona</h4>
                        <p> Soy Aramis, desarrollador JavaScript, actualmente estoy cursando un bootcamp llamado 'Soy henry'. <br />
                            Este proyecto pertenece a la etapa de 'Proyecto Individual', pasada la misma se prosigue con el proyecto grupal. 
                            Mis objetivos como desarrollador es seguir ampliando conocimientos y encontrar un ambiente de trabajo saludable. Como persona valoro mucho las habilidades blandas que puedan tener mis compañeros de trabajo, ya que
                            soy muy consciente que sin un buen ambiente laboral las cosas no progresan de la mejor manera (haciendo énfasis en progreso Individual y grupal)
                        </p>
                    </div>
                    <img src={personal_image} alt="" />
                </section>
                <section className={styles.proyect}>
                        <div>
                            <h4>Desarrollo del Proyecto</h4>
                            <p>
                                El objetivo de esta página es para que usted pueda ver, y evaluar los conocimientos puestos en practica. <br />
                                Este proyecto no solo consta de un cliente que consume una Api, sino que también está desarrollado un servidor y una base de datos <br />
                            </p>
                        </div>
                        <br />
                            <div className={styles.C_S_DB}>
                                <img src={icon_react} alt="" />
                                <p>
                                Cliente: Fue desarrollado en su totalidad con el framework React JS, centralizando el estado de forma global con librería Redux y consumiendo del servidor creado previamente. Los aspectos de estilo fueron creados aplicando CSS modules para cada componente de React. <br />
                                </p>
                            </div>
                        <br />
                            <div className={styles.C_S_DB}>
                                <img src={icon_node} alt="" />
                                <p>
                                Servidor: Se diseñó con Node JS, complementando el erutado con el framework Express. Todos los modelos y relaciones de la base de datos se establecieron con Sequalize, ya que este tiene cubierto algunas vulnerabilidades básicas como SQL INYECTION.<br />
                                </p>
                            </div>
                        <br />
                        <div className={styles.C_S_DB}>
                            <img src={icon_sql} alt="" />
                            <p> Base de datos: Fue creada con PostgreSQL, utilizando la herramienta pgAdmin para manejar la misma.</p>
                        </div>
                </section>

                <section className={styles.attributors}>
                    <div className={styles.links}>
                        <br />
                        <br />
                        <h4>Referencia imágenes gratuitas utilizadas:</h4>
                        <br />
                        <a href="https://www.flaticon.es/iconos-gratis/perro" title="perro iconos">Perro iconos creados por Freepik - Flaticon</a>
                        <br />
                        Imagen de <a href="https://www.freepik.es/foto-gratis/vista-adorable-perro-chihuahua-casa_33790831.htm#query=perros&position=20&from_view=keyword">Freepik</a>
                        <br />
                        Foto de Lucas Pezeta: https://www.pexels.com/es-es/foto/perro-marron-corriendo-en-el-campo-2197906/
                        <br />
                        Perro en atardecer Fondo de pantalla: https://www.xtrafondos.com/wallpaper/5160x3440/5798-perro-en-atardecer.html
                        <br />
                        Imagen de <a href="https://www.freepik.es/foto-gratis/vista-frontal-concepto-perro-lindo-divertido_11524378.htm#page=6&query=perros&position=19&from_view=keyword">Freepik</a>
                        <br />
                        Imagen de <a href="https://www.freepik.es/vector-gratis/patron-garabatos-perros-palabras-coloridos_4234035.htm#page=3&query=huellas%20de%20perro&position=34&from_view=keyword">Freepik</a>
                        <br />
                        <br />
                        <br />
                    </div>
                </section>
            </section>
        </div>
    );
};


export default About;