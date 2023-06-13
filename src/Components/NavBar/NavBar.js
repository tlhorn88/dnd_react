import './NavBar.css';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';

const links = [
  { path: '/', text: 'About' },

  { path: 'randomRecipe', text: 'Random Recipes' },
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
        {/* <li>
          <Link to="https://www.google.com" target="_blank" className='navItem'>
            Portfolio
          </Link>
        </li> */}
        <li>
          <form className="searchField">
            <label>
              <input
                type="text"
                name="name"
                placeholder="enter search item"
                onChange={handleInputChange}
                
              />
            </label>
            <input
              type="submit"
              value=""
              onClick={handleSubmit}
              style={{ display: 'none' }}
            />
            <SearchIcon onClick={handleSubmit} className="searchIcon" />
          </form>
        </li>
      </ul>
    </div>
  );
}

export default NavBar;
