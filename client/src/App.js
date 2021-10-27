import './App.css';
import Login from './Login/Login';
import Navbar from './Navbar/Navbar';
import Register from './Register/Register';
import Stories from './Stories/Stories';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Profile from './Profile/Profile';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import {loggedState} from './atoms'



function App() {
  const [isLogged, setIsLogged] = useRecoilState(loggedState);
  return (     
   <Router>
     <Switch>       
     <Route path="/login">
        <Login/>
      </Route>
      <Route path="/register">
        <Register/>
      </Route>      
      <Route path="/profile">
        <Navbar/>
        <Profile/>
      </Route>
      <Route path="/">
        <Navbar/>
        <Stories/>
      </Route>
     </Switch>
   </Router>
   
  );
}

export default App;
