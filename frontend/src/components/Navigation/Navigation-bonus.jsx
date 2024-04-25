import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton-bonus';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <ul className='nav-bar'>
      <li>
      <NavLink className='Link' to="/">
      <div className='adjacent'>
          <img
            className="logo"
            src="https://res.cloudinary.com/dv9oyy79u/image/upload/v1714093936/31758_recreate_this_exact_image_but_with_a_white_backgro_xl-1024-v1-0-fotor-bg-remover-20240425211145_k5r5y2.png"
            alt="soul society logo"
          />
          <h2 className="navbar-title">Soul Society</h2>
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
  );
}

export default Navigation;
