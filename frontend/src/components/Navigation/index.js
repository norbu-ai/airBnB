import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

export default function Navigation({ isLoaded }){
    const sessionUser = useSelector((state) => state.session.user);
    /*
    if there is a session-user, render a logout button component
    if there is !session-user, show navlinks to login & signup routes
    after logging in, the navigation bar should have the links to 
    login and signup replaced with the Font Awesome user icon 
    
    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <li>       
                <ProfileButton user={sessionUser} />
            </li>
        );
    } else {
        sessionLinks = (
        <li>

            <OpenModalButton 
                buttonText="Log In"
                modalComponent={<LoginFormModal />}
            />

            <OpenModalButton
                buttonText="Sign Up"
                modalComponent={<SignupFormModal />}
            />

        </li>
        );
    }
    */

    return (
        <ul>
            <li><NavLink exact to="/">Home</NavLink></li>
            {isLoaded && (
                <li>
                    <ProfileButton user={sessionUser} />
                </li>
            )}
        </ul>
    );
}

