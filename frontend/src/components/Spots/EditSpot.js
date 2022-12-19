import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { editSpot, getOneSpot, addSpotImage } from "../../store/spots"
import { countries } from "./countries"
import "./Spots.css"

function EditSpot () {

  const { spotId } = useParams()
  const dispatch = useDispatch()
  const history = useHistory()

  const spot = useSelector((state) => state.spots.singleSpot)
  const currentUser = useSelector((state) => state.session.user)

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

  useEffect(() => {
    dispatch(getOneSpot(+spotId))
  }, [dispatch, spotId])

  useEffect(() => {
    if (currentUser) {
      if (currentUser.id === spot.ownerId) setErrors([])
      else setErrors(["You are not the owner of this spot"])
    }
    else setErrors(["You must be logged in to update a spot"])
  }, [currentUser, spot])

  useEffect(() => {
    if (spot) {
      setAddress(spot.address)
      setCity(spot.city)
      setState(spot.state)
      setCountry(spot.country)
      setLat(spot.lat)
      setLng(spot.lng)
      setName(spot.name)
      setDescription(spot.description)
      setPrice(spot.price)
      // setUrl(spot.SpotImages[0].url)
    }
  }, [spot])



  const handleSubmit = async (e) => {

    e.preventDefault()
    setHasSubmitted(true)

    const errorsArr = []

    if (!address.length) errorsArr.push("please enter street address")
    if (!city.length) errorsArr.push("please enter city")
    if (!state.length) errorsArr.push("please enter state")
    if (!country.length) errorsArr.push("please enter country")
    if (!name.length || name.length > 50) errorsArr.push("please enter a valid name fewer than 50 characters long")
    if (!description.length) errorsArr.push("please enter a description")
    if (!price || price <= 0) errorsArr.push("please enter a valid price greater than 0")
    // if (!url.length || url.length > 255) errorsArr.push("please enter a valid image url")

    setErrors(errorsArr)

    const spotInfo = {
      ...spot,
      address, city, state, country, name, description, price, url: spot.SpotImages[0].url
    }


    const updatedSpot = await dispatch(editSpot(spotInfo, +spotId))

    if (updatedSpot) {
      console.log("COMPONENT HANDLESUBMIT, AFTER THUNK AC RETURNS PROMISE, updatedSpot:", updatedSpot)

      reset()
      history.push("/myspots")
    }

  }

  const reset = () => {
    setAddress("")
    setCity("")
    setState("")
    setCountry("")
    // setLat("")
    // setLng("")
    setName("")
    setDescription("")
    setPrice("")
    // setUrl("")
    setErrors([])
    setHasSubmitted(false)
  }

  const cancelButton = (e) => {
    e.preventDefault()
    history.push("/myspots")
  }


  if (!Object.values(spot).length) return null

  return (
    <div className="editSpot-form-wrapper">
      <h2 className="editSpot-header">
        Edit Your Spot Info:
      </h2>
      <div className="validation-errors">
          {
          hasSubmitted &&
          errors?.map((error)=>(<div key={error}>{error}</div>))
          }
      </div>

      <div className="editSpot-form-container form-input-wrapper">
      <form onSubmit={handleSubmit}>


        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        {/* <div className="form-input-break"></div> */}

        <label>
          Address:
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </label>
        {/* <div className="form-input-break"></div> */}

        <label>
          City:
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </label>
        {/* <div className="form-input-break"></div> */}

        <label>
          State:
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </label>
        {/* <div className="form-input-break"></div> */}

        <label>
          Country:
          <div className="select-country">
            <select
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              >
              <option value="" selected disabled>
                Select a Country
              </option>
              {countries.map((ele)=>(<option>{ele}</option>))}
            </select>
          </div>
        </label>
        {/* <label>
          Latitude:
          <input
            type="number"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
          />
        </label>
        <label>
          Longitude:
          <input
            type="number"
            value={lng}
            onChange={(e) => setLng(e.target.value)}
          />
        </label> */}
        {/* <div className="form-input-break"></div> */}


        <label>
          Price:
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>
        {/* <div className="form-input-break"></div> */}


        <label>
          Description:
          <textarea
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        {/* <div className="form-input-break"></div> */}

        <button className="editSpot-submitBtn">Update</button>
        <button onClick={cancelButton} className="editSpot-submitBtn">Cancel</button>

      </form>
    </div>
    </div>
  )
}

export default EditSpot; 