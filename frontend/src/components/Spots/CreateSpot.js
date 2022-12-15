import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { createNewSpot, addSpotImage } from "../../store/spots"
import { countries } from "./countries"

import "./Spots.css"

function CreateSpot() {

  const dispatch = useDispatch()
  const history = useHistory()

  const currentUser = useSelector((state) => {
    return state.session.user
  })

  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [country, setCountry] = useState("")
  const [lat, setLat] = useState("")
  const [lng, setLng] = useState("")
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [url, setUrl] = useState("")

  const [errors, setErrors] = useState([])
  const [hasSubmitted, setHasSubmitted] = useState(false)

  //check for logged in status
  useEffect(() => {
    if (currentUser) setErrors([])
    else setErrors(["You must be logged in to host new spot"])
  }, [currentUser])


  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors([])
    setHasSubmitted(true)

    let errorsArr = []

    if (!address.length) errorsArr.push("please enter street address")
    if (!city.length) errorsArr.push("please enter city")
    if (!state.length) errorsArr.push("please enter state")
    if (!country.length) errorsArr.push("please select a country")
    // if (!lat.length || lat > 90 || lat < -90) errorsArr.push("please enter a valid latitude between -90 and 90")
    // if (!lng.length || lng > 180 || lng < -180) errorsArr.push("please enter a valid longitude between -180 and 180")
    if (!name.length || name.length > 50) errorsArr.push("please enter a valid name fewer than 50 characters long")
    if (!description.length || description.length > 255) errorsArr.push("please enter a valid description fewer than 255 characters long")
    if (!price || price <=0) errorsArr.push("please enter a valid price greater than 0")
    if (!url.length || url.length > 255 || !url.includes(".jpg"||".jpeg"||".png"||".gif")) errorsArr.push("please enter a valid image url fewer than 255 characters long")

    setErrors(errorsArr)

    const spotInfo = { address, city, state, country, lat: 90, lng: 90, name, description, price, url }; 
    const imageInfo = ({ url, preview: true})

    const newSpot = await dispatch(createNewSpot(spotInfo, imageInfo))

    if (newSpot) {
      await dispatch(addSpotImage(newSpot.id, imageInfo))
      reset()
      history.push("/myspots")
    }
  }

  const reset = () => {
    setAddress("")
    setCity("")
    setState("")
    setCountry("")
    setLat("")
    setLng("")
    setName("")
    setDescription("")
    setPrice("")
    setUrl("")
    setErrors([])
    setHasSubmitted(false)
  }

  const cancelHandler = (e) => {
    e.preventDefault()
    history.push("/")
  }

  return (
    <div className="form-container">
      <h2 className="form-header">
        Create Spot
      </h2>

        <div className="validation-errors">
          {
          hasSubmitted &&
          errors?.map((error)=>(<div key={error}>{error}</div>))
          }
        </div>

      <div className="form form-input-line-break">
        <form onSubmit={handleSubmit}>
          <label>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <div className="form-input-break"></div>
          <label>
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </label>
          <div className="form-input-break"></div>
          <label>
            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </label>
          <div className="form-input-break"></div>
          <label>
            <input
              type="text"
              placeholder="State"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </label>
          <div className="form-input-break"></div>
          <label>
            <select
              type="text"
              placeholder="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option value="" selected disabled>
                Select a Country
              </option>
              {countries.map((ele)=>(<option>{ele}</option>))}
            </select>
          </label>
          {/* <label>
            <input
              type="number"
              placeholder="Latitude"
              value={lat}
              onChange={(e) => setLat(e.target.value)}
            />
          </label>
          <label>
            <input
              type="number"
              placeholder="Longitude"
              value={lng}
              onChange={(e) => setLng(e.target.value)}
            />
          </label> */}
          <div className="form-input-break"></div>
          <label>
            <textarea
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <div className="form-input-break"></div>
          <label>
            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
          <div className="form-input-break"></div>
          <label>
            <input
              type="text"
              placeholder="Image URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </label>

          <div className="form-input-break"></div>
          <button
          className="submit-button"
          >
            Create
          </button>
          <button
          onClick={cancelHandler}
          className="submit-button"
          >
            Cancel
          </button>
        </form>
        </div>
    </div>
  )
}

export default CreateSpot; 
