import React from 'react'
import {Link} from "react-router-dom"
import {HashLink} from "react-router-hash-link"
const Header = () => {
  return (
    <nav>
        <h1>TechStar.</h1>
        <main>
            <HashLink to={"/#home"}>Home</HashLink>
            <Link to={"/contact"}>Contact</Link>
            <a href={"/#about"}>About</a>
            <Link to={"/#brands"}>Brands</Link>
            <Link to={"/services"}>Services</Link>
            
        </main>
    </nav>
  )
}

export default Header
