import React from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
const Header = () => {
  return (
    <div className="header">
      <header className="hide-when-mobile">
        <h1>
          <Link to="/">Store Locations </Link>
        </h1>
        <nav>
          <ul className="flex">
            <li className="main-list">
              <NavLink className="main-link" to="/Widget">
                Widget
              </NavLink>
            </li>
            {/* <li className="main-list">
              <NavLink className="main-link" to="/MapTest">
                Test
              </NavLink>
            </li> */}
            <li className="main-list">
              <NavLink className="main-link" to="/Map">
                Map
              </NavLink>
            </li>
            <li className="main-list">
              <NavLink className="main-link" to="/Home">
                Home
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Header;
