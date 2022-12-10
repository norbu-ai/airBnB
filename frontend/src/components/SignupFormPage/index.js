import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";

function SignupFormPage() {
    // form controlled input-fields
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [firstName, setFirstname] = useState("")
    const [lastName, setLastname] = useState("")
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);

    // if there is a current session user in Redux-store, then
    // redirect the user to "/" path if trying to access SignupFormPage 
    if (sessionUser) return <Redirect to="/" />;

    const handleSubmit = (e) => {
        e.preventDefault();
        /*
            - confirm password, then
            - dispatch the signup thunk action with the form input values
            -if incorrect password, display error message
        */
        if (password === confirmPassword) {
        setErrors([]);
        return dispatch(sessionActions.signup({ email, username, firstName, lastName, password }))
            .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
            });
        }
        return setErrors(['Confirm Password field must be the same as the Password field']);
    };

    return (
        <form onSubmit={handleSubmit}>

        <fieldset style={{border:'1px solid red'}}>
            <legend style={{color: 'red'}}>Fill out your information</legend>

        <ul>
            {errors.map((error, idx) => (<li key={idx}>{error}</li>))}
        </ul>
        <label>
            Email:
            <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            />
        </label><br/>
        <label>
            Username:
            <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            />
        </label><br/>
        <label>
            First Name:
            <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstname(e.target.value)}
            required
            />
        </label><br/>

        <label>
            Last Name:
            <input
            type="text"
            value={lastName}
            onChange={(e) => setLastname(e.target.value)}
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
        <label>
            Confirm Password:
            <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            />
        </label><br/>
        <button type="submit">Sign Up</button>

        </fieldset>
        </form>
    );
}

export default SignupFormPage;