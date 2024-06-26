import {BrowserRouter as Router,Route,Routes} from "react-router-dom"
import Header from "./components/Header";
import Home from "./components/home"
import Footer from "./components/Footer";
import Contact from "./components/Contact";
import Services from "./components/Services.jsx";

import "./styles/App.scss"
import "./styles/Header.scss"
import "./styles/Home.scss"
import "./styles/contact.scss"
function App() {

  return (
    <Router>
    <Header/>
      <Routes>
        <Route path="/"  element={<Home/>}/>
        <Route path="contact" element={<Contact/>}/>
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
