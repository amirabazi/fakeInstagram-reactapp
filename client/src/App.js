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
import ProtectedRoutes from './ProtectedRoutes'

function App() {
  const [isLogged, setIsLogged] = useRecoilState(loggedState);
  console.log(isLogged)
  return (     
   <Router>
     <Switch>       
     <Route path="/login">
        <Login/>
      </Route>
      <Route path="/register">
        <Register/>
      </Route>            
      <ProtectedRoutes path="/profile" component={Profile} isAuth={isLogged} />      
      <ProtectedRoutes path="/" exact component={Stories} isAuth={isLogged} />       
     </Switch>
   </Router>
   
  );
}

export default App;
