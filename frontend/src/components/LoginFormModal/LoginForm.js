import React, { useState } from "react"
import { useDispatch } from "react-redux"
import * as sessionActions from "../../store/session"

import "./LoginForm.css"

function LoginForm({onClose, setShowLoginModal}) {
  const dispatch = useDispatch()

  const [credential, setCredential] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrors([])
    return dispatch(sessionActions.login({ credential, password }))
      .then(() => setShowLoginModal(false))
      .catch(
        async (res) => {
          const data = await res.json()
          if (data && data.message) setErrors([data.message])
        }
      )
  }

  return (
    <div className="modal-form-wrapper">
      <form onSubmit={handleSubmit}>

        <div className="modal-header">Log In</div>
        <div className="line-break"></div>
        <div className="modal-subheader">Welcome to Yonder</div>

        <div className="validation-errors">
          {errors.length > 0 && errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </div>

        <div className="form-input-wrapper">
          <label className="field">
            Username or Email
            <input
              type="text"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              required
            />
          </label>

          {/* <div className="form-input-line-break"></div> */}

          <label className="field">
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <button className="modal-submit-button" type="submit">Log In</button>
      </form>
    </div>
  )
}

export default LoginForm