import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { useNavigate } from 'react-router-dom' //<== so that logging out sends the user to the home page
import { NavLink } from 'react-router-dom';
import { IoIosMenu } from "react-icons/io";


function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);
  const navigate = useNavigate() //<== call useNavigate to send the user to the home page after logging out. Navigate does not work in this case
  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    navigate('/')
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
    <div className='adjacent'>
      {user &&  <NavLink className='Link vt323-regular color hover' to='/spots' >Create a new spot</NavLink>} {/*link to creating a spot*/}
      <button className='adjacent profile-button red hover' onClick={toggleMenu}>
        <IoIosMenu />
        <i className="fas fa-user-circle" />
      </button>
    </div>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <div className='menu-box vt323-regular'>
            <li className='no-dot'>{user.username}</li>
            <li className='no-dot'>Hello, {user.firstName}</li>  {/* ADD A GREETING WHEN THE USER IS LOGGED IN */}
            <li className='no-dot'>{user.email}</li>
            <NavLink to='/spots/current' className='no-dot Link menu-link'>manage spots</NavLink>
            <li className='no-dot'>
              <button className='red hover' onClick={logout}>Log Out</button>
            </li>
          </div >
        ) : (
          <div className='menu-box'>
            <OpenModalMenuItem
              itemText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
            <OpenModalMenuItem
              itemText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </div >
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
