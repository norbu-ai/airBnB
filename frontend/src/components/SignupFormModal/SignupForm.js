import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css'; 

function SignupForm({ onClose, setShowSignupModal }) {
    // form controlled input-fields
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [firstName, setFirstname] = useState("")
    const [lastName, setLastname] = useState("")
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);

    
    const sessionUser = useSelector((state) => state.session.user);
    // if there is a current session user in Redux-store, then
    // redirect the user to "/" path if trying to access SignupFormPage 
    if (sessionUser) return <Redirect to="/" />;

    const handleSubmit = async(e) => {
        e.preventDefault();
        /*
            - confirm password, then
            - dispatch the signup thunk action with the form input values
            -if incorrect password, display error message
        */
        if (password === confirmPassword) {
        setErrors([]);
        return dispatch(sessionActions.signup({ email, username, firstName, lastName, password }))
            .then(() => setShowSignupModal(false))
            .catch(async (res) => {
            const data = await res.json();
            const errorsArr = Object.values(data.errors); 
            if (data && errorsArr.length) setErrors(errorsArr);
            });
        }
        return setErrors(['Confirm Password field must be the same as the Password field']);
    };

    // console.log('errors: ', errors)

    return (
        <>
            <h1>Sign Up</h1>
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
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                // required
                />
            </label><br/>
            <label>
                <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                // required
                />
            </label><br/>
            <label>
                <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstname(e.target.value)}
                // required
                />
            </label><br/>

            <label>
                <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastname(e.target.value)}
                // required
                />
            </label><br/>
            <label>
                <input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                // required
                />
            </label><br/>
            <label>
                <input
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                // required
                />
            </label><br/>
            <button className='signup-btn' type="submit">Sign Up</button>

            </fieldset>
            </form>
        </>
    );
}

export default SignupForm;