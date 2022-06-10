import './App.css';
import Home from './component/Home/Home';
import User from './component/User/User';
import Login from './component/Login/Login';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import NotFound from "./component/NotFound/NotFound";
import NavigationBar from "./component/NavigationBar/NavigationBar";

function App() {
  return (
      <Router>
          <NavigationBar />
          <Routes>
              <Route  path="/" element={<Home />}/>
              <Route  path="/login" element={<Login />}/>
              <Route  path="/user" element={<User />}/>
              <Route  path="*" element={<NotFound />}/>
          </Routes>
      </Router>
  );
}

export default App;
