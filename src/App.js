import './App.css';
import Home from './component/Home/Home';
import Users from './component/Users/Users';
import Login from './component/Login/Login';
import Logout from './component/Logout/Logout';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import NotFound from "./component/NotFound/NotFound";
import NavigationBar from "./component/NavigationBar/NavigationBar";
import Products from "./component/Products/Products";

function App() {
  return (
      <Router>
          <NavigationBar />
          <Routes>
              <Route  path="/" element={<Home />}/>
              <Route  path="/login" element={<Login />}/>
              <Route  path="/users" element={<Users />}/>
              <Route  path="/logout" element={<Logout />}/>
              <Route  path="/products" element={<Products />}/>
              <Route  path="*" element={<NotFound />}/>
          </Routes>
      </Router>
  );
}

export default App;
