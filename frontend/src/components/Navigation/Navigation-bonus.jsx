import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton-bonus';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <>
    <ul className='nav-bar'>
      <li>
      <NavLink className='Link' to="/">
      <div className='adjacent'>
          <img
            className="logo hover"
            src="https://res.cloudinary.com/dv9oyy79u/image/upload/v1714314775/image_35_-fotor-bg-remover-20240428103237_migdho.png"
            alt="soul society logo"
          />
          <h1 className="navbar-title vt323-regular hover">SOULSOCIETY</h1>
        </div>
        </NavLink>
        {/* <NavLink to="/">Home</NavLink> */}
      </li>
      {isLoaded && (
        <li>
          <ProfileButton user={sessionUser} />
        </li>
      )}
    </ul>
    </>
  );
}

export default Navigation;
