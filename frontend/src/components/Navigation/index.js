import React, { useState } from "react"
import { NavLink } from "react-router-dom"
import { useSelector } from "react-redux"
import ProfileButton from "./ProfileButton"
import AuthenticateMe from "./AuthenticateMe"
import LoginFormModal from "../LoginFormModal"
import SignupFormModal from "../SignupFormModal"
import logo from './earth_logo.png'; 
import "./Navigation.css"

const Navigation = ({ isLoaded }) => {
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showSignupModal, setShowSignupModal] = useState(false);
  
  const currentUser = useSelector(state => state.session.user)
  let sessionLinks

  if (currentUser) {
    sessionLinks = (
      <ProfileButton user={currentUser} />
    )
  } else {
    sessionLinks = (
      <AuthenticateMe
        setShowLoginModal={setShowLoginModal}
        setShowSignupModal={setShowSignupModal}
      />
    )
  }

  // renders everything above the line break between navigation and load-content
  return (
    <div>
        <LoginFormModal
          showLoginModal={showLoginModal}
          setShowLoginModal={setShowLoginModal}
        />

        <SignupFormModal
          showSignupModal={showSignupModal}
          setShowSignupModal={setShowSignupModal}
        />

          <NavLink exact to="/" style={{textDecoration:'none'}}>
            <div className='logo-name'>
              <img className="logo" src={logo} />
              <span>Yonder</span>
            </div>
          </NavLink>
  

          <div className="sessionlinks">
            {sessionLinks}
          </div>

        <div className="nav-break-line"></div>
    </div>
  )
}

export default Navigation
