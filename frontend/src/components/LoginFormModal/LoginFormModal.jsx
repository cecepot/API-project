import { useState, useEffect } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './LoginForm.css';

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  // ADD STATE FOR DISABLING LOGIN BUTTON
  const [disabled, setDisabled] = useState(true)

  //UPDATE STATE OF DISABLED TO BE TRUE IF CREDENTIALS OR PASSWORD ARE LONGER THAN 3
useEffect(()=>{
  if(credential.length >= 4 && password.length >= 6){
    setDisabled(false)
  }
},[password, credential])

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
          setCredential('')
          setPassword('')
          setDisabled(true)
        }
      });
  };

  //CREATING THE DEMO USER
  const handleClick = (e)=>{
    e.preventDefault()
    // alert('howdy!')
    setErrors({});
    const credential ='Demo-lition'
   const password = 'password'
    return dispatch(sessionActions.login({credential, password}))
    .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  }

  return (
    <>
      <h1 className='black'>Log In</h1>
      <form className='form-container' onSubmit={handleSubmit}>
        <div>
          <input
            placeholder='Username or Email'
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            placeholder='Password'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errors.credential && <p className='error'>{errors.credential}</p>}
        </div>
        <div>
          <button type="submit" disabled={disabled}>Log In</button>
        </div>
        <div>
          <button className='hover red' onClick={handleClick}>Log in as Demo User</button>
        </div>
      </form>
    </>
  );
}

export default LoginFormModal;
