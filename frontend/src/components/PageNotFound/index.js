import React from "react"
import { useHistory } from "react-router-dom"
import "./PageNotFound.css"

function PageNotFound() {
  const history = useHistory()

  return (
    <div className="wrapper-center">
      <div className="notfound-header">
        <h1>Page Not Found</h1>
      </div>

      <div
        className="logo-back"
        onClick={() => history.push("/")}
      ></div>
    </div>
  )
}

export default PageNotFound; 
