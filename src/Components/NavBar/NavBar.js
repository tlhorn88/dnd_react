import './NavBar.css';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const links = [
  { path: '/', text: 'About' },
  { path: 'page2', text: 'Cocktail Search' },
  // { path: 'randomRecipe', text: 'Random Recipe' },
];

function NavBar() {
  const navigate = useNavigate();
  const [queryText, changeQueryText] = useState();

  const handleInputChange = (e) => {
    changeQueryText(e.target.value);
    console.log('target value!!', e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (queryText) {
      navigate(`/page3?searchName=${queryText}`);
    }
  };

  return (
    <div className="navBar">
      <ul className="navBarList">
        {links.map((link) => {
          return (
            <li key={link.text}>
              <NavLink className="navItem" to={link.path}>
                {link.text}
              </NavLink>
            </li>
          );
        })}
        <li>
          <Link to="https://www.google.com" target="_blank">
            Portfolio
          </Link>
        </li>
        <li>
          <form>
            <label>
              <input type="text" name="name" onChange={handleInputChange} />
            </label>
            <input type="submit" value="Submit" onClick={handleSubmit} />
          </form>
        </li>
      </ul>
    </div>
  );
}

export default NavBar;
