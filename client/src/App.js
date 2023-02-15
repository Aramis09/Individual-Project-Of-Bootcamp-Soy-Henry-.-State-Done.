import './App.css';
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import './App.css';
import Landing from './Components/Landing/Landing';
import Favourite from './Components/Favourites/Favourites';
import Detail from './Components/Detail/Detail';
import { Route } from "react-router-dom";
import Create from './Components/CreateDog/CreateDog';
import About from './Components/About/About';

function App() {
  return (
    <div className="App">
      <Route path = '/'> <Header /></Route>
      <Route exact path = '/'> <Landing /></Route>
      <Route exact path = '/home'> <Home  /> </Route>
      <Route exact path='/home/create'> <Create /></Route>
      <Route exact path='/home/favourite'> <Favourite /></Route>
      <Route exact path='/home/detail'> <Detail /></Route>
      <Route exact path='/home/about'> <About /></Route>
    </div>
  );
}

export default App;
