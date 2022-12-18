
import React, { useState, useEffect } from "react"
import DemoUser from "../DemoUser"


const AuthenticateMe = ({setShowLoginModal, setShowSignupModal}) => {
  const [showMenu, setShowMenu] = useState(false)

  const openMenu = () => {
    if (showMenu) return
    setShowMenu(true)
  }

  useEffect(() => {
    if (!showMenu) return
    const closeMenu = () => setShowMenu(false)
    document.addEventListener("click", closeMenu)
    return () => document.removeEventListener("click", closeMenu)
  }, [showMenu])


  // render navigation + notLoggedIn profile dropdown menu 
  return (
    <>
      <div className="nav-earth-profile-div">

      <div className="globe-login">
          <button className="become-host-button" onClick={()=>alert('upcoming feature!')}>Become a Host</button>
          <i className='fa fa-globe' onClick={()=>alert("upcoming feature!")} />
          <button onClick={openMenu} className="profile-login-btn-div-with-icons">
              <i id='bars' className="fa-solid fa-bars"></i>
              <i className="fa-solid fa-user"></i>
          </button>
        </div>

        {
          showMenu && (

          <div className="profile-dropdown-div-not-loggedin">

            <div className="select-login-type">
              {/* <LoginFormModal /> */}
              <div className="login-button"
              onClick={() => setShowLoginModal(true)}>
                Log In
              </div>
            </div>

            <div className="select-login-type">
              {/* <SignupFormModal /> */}
              <div className="signup-button"
              onClick={() => setShowSignupModal(true)}>
                Sign Up
              </div>

            </div>

            <div className="select-login-type">
              <DemoUser />
            </div>
          </div>

        )}

      </div>
    </>
  )
}

export default AuthenticateMe; 
