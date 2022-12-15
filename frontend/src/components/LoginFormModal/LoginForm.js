import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import './LoginForm.css';


function LoginForm({ onClose, setShowLoginModal }) {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    
    // if there is a current session user in the Redux store, then
    // redirect the user to the "/" path if trying to access the LoginFormPage
    // const sessionUser = useSelector(state => state.session.user);
    // if (sessionUser) return <Redirect to="/" />;

    const handleSubmit = async(e) => {
        e.preventDefault();
        /*
            - dispatch the login thunk action with the form input values
            -if incorrect password, display error message
        */
        setErrors([]);
        return dispatch(sessionActions.login({ credential, password }))
        .then(() => {
            setShowLoginModal(false);
            // alert('Log In Successful')
        })
        .catch(async (res) => {
            const data = await res.json();
            const errorsArr = Object.values(data.errors); 
            if (data && errorsArr.length) setErrors(errorsArr);
        });
    }

    return (
        <>
            <h1>Log In</h1>
            <form onSubmit={handleSubmit}>


            <fieldset style={{border:'1px solid red'}}>
                <legend style={{color: 'red'}}>Fill out your information</legend>


            <ul>
                {errors.length > 0 && errors.map((error, idx) => (
                    <li key={idx}>{error}</li>
                ))}
            </ul>
            <label>
                <input
                type="text"
                placeholder="Username or Email"
                value={credential}
                onChange={(e) => setCredential(e.target.value)}
                // required
                />
            </label><br/>
            <label>
                <input
                type="password"
                placeholder='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                // required
                />
            </label><br/>

            <button className='login-btn' type="submit">Log In</button>
        
            </fieldset>
            </form>
        </>
    );
}


export default LoginForm; 