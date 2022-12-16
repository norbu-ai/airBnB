import { csrfFetch } from './csrf';

/* ------------ action type constants ------------ */

const LOAD_SPOT_REVIEWS = "REVIEWS/LOAD_SPOT_REVIEWS"
const LOAD_USER_REVIEWS = "REVIEWS/LOAD_USER_REVIEWS"
const CREATE_REVIEW = "REVIEWS/CREATE_REVIEW"
const UPDATE_REVIEW = "REVIEWS/UPDATE_REVIEW"
const DELETE_REVIEW = "REVIEWS/DELETE_REVIEW"
const ADD_REVIEW_IMAGE = "REVIEWS/ADD_REVIEW_IMAGE"


/* ------------ action creators ------------ */

const loadSpotReviews = (reviews) => {
  return {
    type: LOAD_SPOT_REVIEWS,
    reviews
  }
}

const loadUserReviews = (reviews) => {
  return {
    type: LOAD_USER_REVIEWS,
    reviews
  }
}

const createReview = (review) => {
  return {
    type: CREATE_REVIEW,
    review
  }
}

const updateReview = (review) => {
    return {
        type: UPDATE_REVIEW,
        review
      }
    }

const deleteReview = (reviewId) => {
  return {
    type: DELETE_REVIEW,
    reviewId
  }
}

const addReviewImage = (image, reviewId) => {
  return {
    type: ADD_REVIEW_IMAGE,
    image,
    reviewId
  }
}

/* ------------ thunk action creators ------------ */

// load all spot reviews thunk
export const getSpotReviews = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`)

  if (response.ok) {
    const data = await response.json() 
    const reviewsArr = data.Reviews
    dispatch(loadSpotReviews(reviewsArr))
    return data
  }
}

// load all user reviews thunk
export const getUserReviews = () => async (dispatch) => {
  const response = await csrfFetch("/api/reviews/current")
  if (response.ok) {
    /*
    {"Reviews": [
      {
        "id": 1,
        "userId": 1,
        "spotId": 1,
        "review": "This was an awesome spot!",
        "stars": 5,
        "User": {"id":, "firstName":, "lastName": },
        "Spot": { id, ownerId, add, city, state, coun, lat, lng,    name, price, previewImage: url },
        "ReviewImages": [{"id": ,"url": }, {}, {}]
      }
    ]}
    */
    const data = await response.json()
    const reviewsArr = data.Reviews 
    dispatch(loadUserReviews(reviewsArr))
    return data
  }
}

// create new review thunk
export const createNewReview = (newreview, spotId, user) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(newreview)
  })

  if (response.ok) {
    /* response from backend: "newreview"
      {
        "id": 1,
        "userId": 1,
        "spotId": 1,
        "review": "This was an awesome spot!",
        "stars": 5,
        "createdAt": "2021-11-19 20:39:36",
        "updatedAt": "2021-11-19 20:39:36"
      }
    */

// vs. structure in reducer state:
//   spot: {
//     [reviewId]: { id, userId, spotId, review, stars,
//                   User: { id, firstName, lastName },
//                   ReviewImages: [ { id, url }, {}, {} ] }
//   }

    const newreview = await response.json()

    const userInfo = {}
    userInfo.id = user.id
    userInfo.firstName = user.firstName
    userInfo.lastName = user.lastName

    newreview.User = userInfo
    newreview.ReviewImages = []

    dispatch(createReview(newreview))
    return newreview 
  } else {
    const result = await response.json()
    return result
  }
}

// // update review thunk
// export const editreview = (myreview, reviewId) => async (dispatch) => {
//   const response = await csrfFetch(`/api/reviews/${reviewId}`, {
//     method: "PUT",
//     headers: {"Content-Type": "application/json"},
//     body: JSON.stringify(myreview)
//   })

//   if (response.ok) {
//     const review = await response.json()
//     dispatch(acUpdatereview(review))
//     return review
//   }
// }

// delete review thunk
export const removeReview = (reviewId) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "DELETE"
  })

  if (response.ok) {
    dispatch(deleteReview(reviewId))
  }
}

// add image thunk
export const createReviewImage = (reviewId, imageObj) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${reviewId}/images`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify (
      imageObj
    )
  })
  if (response.ok) {
    // response image is: { id: reviewId, url: imageURL}
    const image = await response.json()
    dispatch(addReviewImage(image, reviewId))
    return image
  }
}


/* ------------ main Reducer ------------ */

const initialState = {
  spot:{},
  user:{}
}

const reviewsReducer = (state = initialState, action) => {
  let newState
  switch (action.type){

    case LOAD_SPOT_REVIEWS:
      newState = {...state}
      const normalizedReviews = {}
      //payload = reviews = [{}, {}]
      action.reviews.forEach((review) => normalizedReviews[review.id] = review)
      newState.spot = normalizedReviews
      newState.user = {}
      return newState

    case LOAD_USER_REVIEWS:
      newState = {...state}
      const normalizedUserReviews = {}
      //payload = reviews = [{}, {}]
      action.reviews.forEach((review) => normalizedUserReviews[review.id] = review)
      newState.user = normalizedUserReviews
      newState.spot = {}
      return newState

    case CREATE_REVIEW:
      // console.log("REVIEWSREDUCER CREATE REVIEW BEGIN:", state)
      newState = {...state}
      newState.user = {...state.user}
      newState.spot = {...state.spot, [action.review.id]: action.review}
      // console.log("REVIEWSREDUCER CREATE REVIEW BEGIN:", newState)
      return newState

    case DELETE_REVIEW:
      newState = {...state}
      newState.spot = {...state.spot}
      newState.user = {...state.user}
      delete newState.spot[action.reviewId]
      delete newState.user[action.reviewId]
      return newState

    case ADD_REVIEW_IMAGE:
      newState = {...state}
      newState.spot = {...state.spot}
      newState.user = {...state.user}
      newState.spot[action.reviewId].ReviewImages = [action.image]
      // newState.user[action.reviewId].ReviewImages = [action.image]
      return newState

    default:
      return state
  }
}


export default reviewsReducer

// reviews: {
//   spot: {
//     [reviewId]: { id, userId, spotId, review, stars,
//                   User: { id, firstName, lastName },
//                   ReviewImages: [ { id, url }, {}, {} ] }
//   },
//   user: {
//     [reviewId]: { id, userId, spotId, review, stars,
//                   User: { id, firstName, lastName },
//                   Spot: { id, ownerId, add, city, state, coun,
//                           lat, lng, name, price,
//                           previewImage },
//                   ReviewImages: [ { id, url }, {}, {} ] }
//   }
// }
