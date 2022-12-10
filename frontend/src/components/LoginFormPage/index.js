import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './LoginForm.css';

function LoginFormPage() {

    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    // if there is a current session user in the Redux store, then
    // redirect the user to the "/" path if trying to access the LoginFormPage
    if (sessionUser) return <Redirect to="/" />;

    const handleSubmit = async(e) => {
        e.preventDefault();
        /*
            - dispatch the login thunk action with the form input values
            -if incorrect password, display error message
        */
        setErrors([]);
        return dispatch(sessionActions.login({ credential, password }))
        .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
        });
    }

    return (
        <form onSubmit={handleSubmit}>


        <fieldset style={{border:'1px solid red'}}>
            <legend style={{color: 'red'}}>Fill out your information</legend>


        <ul>
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <label>
            Username or Email:
            <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
            />
        </label><br/>
        <label>
            Password:
            <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />
        </label><br/>
        <button type="submit">Log In</button>

    
        </fieldset>
        </form>
    );
}

export default LoginFormPage;