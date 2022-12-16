import { csrfFetch } from './csrf';


/* ------------ action type constants ------------ */

const LOAD_ALL_SPOTS = "spots/LOAD_ALL_SPOTS"
const LOAD_USER_SPOTS = "spots/LOAD_USER_SPOTS"
const LOAD_ONE_SPOT = "spots/LOAD_ONE_SPOT"
const CREATE_SPOT = "spots/CREATE_SPOT"
const UPDATE_SPOT = "spots/UPDATE_SPOT"
const DELETE_SPOT = "spots/DELETE_SPOT"
const ADD_SPOT_IMAGE = "spots/ADD_SPOT_IMAGE"
const RESET_SPOTS = "spots/RESET_SPOTS"


/* ------------ action creators ------------ */

const loadAllSpots = (spots) => {
  return {
    type: LOAD_ALL_SPOTS,
    spots
  }
}

const loadUserSpots = (spots) => {
  return {
    type: LOAD_USER_SPOTS,
    spots
  }
}

const loadOneSpot = (spot) => {
  return {
    type: LOAD_ONE_SPOT,
    spot
  }
}

const createSpot = (spot) => {
  return {
    type: CREATE_SPOT,
    spot
  }
}

const updateSpot = (spot) => {
  return {
    type: UPDATE_SPOT,
    spot
  }
}

const deleteSpot = (spotId) => {
  return {
    type: DELETE_SPOT,
    spotId
  }
}

const createSpotImage = (image) => {
  return {
    type: ADD_SPOT_IMAGE,
    image
  }
}


export const resetSpots = () => {
  return {
    type: RESET_SPOTS
  }
}


/* ------------ thunk action creators ------------ */

// load all spots thunk
export const getAllSpots = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots")

  if (response.ok) {
    const spots = await response.json() //array
    dispatch(loadAllSpots(spots))
    // return spots
  }
}

// load user spots thunk
export const getUserSpots = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots/current")
  if (response.ok) {
    const spots = await response.json() 
    dispatch(loadUserSpots(spots))
  }
}

// load one spot thunk
export const getOneSpot = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`)
  if (response.ok) {
    const spot = await response.json()
    dispatch(loadOneSpot(spot))
  }
}

// create new spot thunk
export const createNewSpot = (spotInfo, imageInfo) => async (dispatch) => {
  const response = await csrfFetch("/api/spots", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(spotInfo)
  })


  if (response.ok) {
    const newspot = await response.json()
    dispatch(createSpot(newspot))
    return newspot
  }
}

// update spot thunk
export const editSpot = (myspot, spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: "PUT",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(myspot)
  })

  if (response.ok) {
    const spot = await response.json()
    dispatch(updateSpot(spot))
    return spot
  }
}

// delete spot thunk
export const removeSpot = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: "DELETE"
  })

  if (response.ok) {
    dispatch(deleteSpot(spotId))
  }
}

// add image thunk
export const addSpotImage = (spotId, imageObj) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/images`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify (
      imageObj
    )
  })

  if (response.ok) {
    const image = await response.json()
    dispatch(createSpotImage(image))
    return image
  }
}

/* ------------ main Reducer ------------ */

const initialState = {
  allSpots:{},
  singleSpot:{}
}

const spotsReducer = (state = initialState, action) => {
  let newState
  switch (action.type){
    
    case LOAD_ALL_SPOTS:
      newState = {...state}
      const normalizedSpots = {}
      action.spots.Spots.forEach((spot) => normalizedSpots[spot.id] = spot)
      newState.allSpots = normalizedSpots
      newState.singleSpot = {}
      return newState

    case LOAD_USER_SPOTS:
      newState = {...state}
      const normalizedUserSpots = {}
      action.spots.Spots.forEach((spot) => normalizedUserSpots[spot.id] = spot)
      newState.allSpots = normalizedUserSpots
      newState.singleSpot = {}
      return newState

    case LOAD_ONE_SPOT:
      newState = {...state}
      newState.singleSpot = action.spot
      return newState

    case CREATE_SPOT:
      newState = {...state}
      newState.allSpots = {...state.allSpots, [action.spot.id]: action.spot}
      return newState

    case UPDATE_SPOT:
      newState = {...state}
      const updatedSpot = {...newState.allSpots[action.spot.id], ...action.spot}
      newState.singleSpot = {...state.singleSpot, ...updateSpot}
      newState.allSpots = {...state.allSpots, [action.spot.id]: updatedSpot}
      return newState

    case DELETE_SPOT:
      newState = {...state}
      newState.allSpots = {...state.allSpots}
      newState.singleSpot = {...state.singleSpot}
      delete newState.allSpots[action.spotId]
      if (newState.singleSpot.id === action.spotId) newState.singleSpot = {}
      return newState

    case ADD_SPOT_IMAGE:
      newState = {...state}
      newState.allSpots = {...state.allSpots}
      newState.singleSpot = {...state.singleSpot}
      newState.singleSpot.SpotImages = [action.image]
      return newState

    case RESET_SPOTS:
      newState = {...state}
      newState.allSpots = {}
      return newState

    default:
      return state
  }
}


export default spotsReducer
