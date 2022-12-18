import React, { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { logout } from "../../store/session"


const ProfileButton = ({ user }) => {
  const dispatch = useDispatch()
  const history = useHistory()
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

  useEffect(() => {

  }, [user])

  const logoutUser = (e) => {
    e.preventDefault()
    dispatch(logout())
    history.push('/')
  }

  // renders navigation + loggedin profile dropdown menu 
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

          <div className="profile-dropdown-div-after-loggedin">

            <div className="profile-dropdown-session-user-wrapper">

              <div className="profile-dropdown-session-user-detail">{user.username}</div>
              <div className="profile-dropdown-session-user-detail">{user.email}</div>
            </div>

            <div className='profile-dropdown-linebreak'></div>

            <div className="logged-dropdown-menu-below-currentuser-detail">
              <div onClick={()=>history.push("/newspot")}>Create Spot</div>
            </div>
            
            <div className="logged-dropdown-menu-below-currentuser-detail">
              <div onClick={()=>history.push("/myspots")}>My Spots</div>
            </div>

            <div className="logged-dropdown-menu-below-currentuser-detail">
              <div onClick={()=>history.push("/myreviews")}>My Reviews</div>
            </div>



            {/* <div className="logged-dropdown-menu-below-currentuser-detail">
              <div onClick={()=>history.push("/myreviews")}>My Reviews</div>
            </div> */}

            <div className="logged-dropdown-menu-below-currentuser-detail">
              <div onClick={logoutUser}>Log Out</div>
            </div>


          </div>

        )}

      </div>
    </>
  )
}

export default ProfileButton