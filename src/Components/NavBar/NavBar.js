import './NavBar.css';
import { NavLink, Link } from "react-router-dom";

const links = [
  { path: '/', text: 'Page1' },
  { path: 'page2', text: 'Page2'},
  { path: 'page3', text: 'Page3'},
];

function NavBar() {
  return (
    <div className="navBar">
      <ul className="navBarList">
        {links.map((link) => {
          return (
            <li  key={link.text}>

              <NavLink className="navItem" to={link.path}>{link.text}</NavLink>
            </li>
          )
        })}
        <li>
          <Link to="https://www.google.com" target="_blank">External Test</Link>
        </li>
      </ul>
    </div>
  )
};

export default NavBar;