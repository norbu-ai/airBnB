import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { createNewReview, createReviewImage } from "../../../store/reviews"
import "./AddReview.css"

function ReviewForm ({spotId, setShowModal}) {

  const dispatch = useDispatch()
  const history = useHistory()

  const [review, setReview] = useState("")
  const [stars, setStars] = useState(5)
  const [errors, setErrors] = useState([])
  const [url, setUrl] = useState("")

  const [hasSubmitted, setHasSubmitted] = useState(false)


  const currentUser = useSelector((state) => state.session.user)

  useEffect(() => {
    if (currentUser) setErrors([])
    else setErrors(["You must be logged in to leave a review"])
  }, [currentUser])


  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors([])
    setHasSubmitted(true)

    const errorsArr = []

    if (!review.length || review.length > 255) errorsArr.push("please enter a valid review fewer than 255 characters long")
    if (!url) errorsArr.push("please enter an image url")
    // if (url.length && (url.length > 255 || !url.includes(".jpg"||".jpeg"||".png"||".gif"))) errorsArr.push("please enter an image url")
    

    setErrors(errorsArr)

    if (errorsArr.length) return

    const reviewInfo = { review, stars, url }

    const newReview = await dispatch(createNewReview(reviewInfo, spotId, currentUser))
      .catch(async (res) => {
        const message = await res.json()
        const messageErrors = []
        if (message) {
          messageErrors.push(message.message)
          setErrors(messageErrors)
        }
      })
    if (newReview && !url.length) setShowModal(false)

    if (newReview && url.length && !errorsArr.length) {
      const imageObj = ({url: url})
      await dispatch(createReviewImage(newReview.id, imageObj))
      .then(()=>setShowModal(false))

      reset()
      history.push(`/spots/${spotId}`)
    }
  }

  const reset = () => {
    setReview("")
    setStars(5)
    setUrl("")
    setErrors([])
    setHasSubmitted(false)
  }

  return (
    <div>
      <div className="review-modal-subheader">Create Review</div>

      <div className="validation-errors">
        {
        hasSubmitted &&
        errors &&
        errors.map((error)=>(<div key={error}>{error}</div>))
        }
      </div>

      <form onSubmit={handleSubmit}>
      <div className="form-input-wrapper">

            <label className="review-field">
              Rating:&nbsp;
              <div className="rating-input">
                <select
                  type="number"
                  value={stars}
                  onChange={(e) => setStars(e.target.value)}
                >
                  <option value="" selected disabled>
                    Select a Rating
                  </option>
                  {[1,2,3,4,5].map((num)=>(<option>{num}</option>))}
                </select>
              </div>
            </label>

            {/* <div className="form-input-break"></div> */}


            <label className="review-field">
              Image URL:
              <input
                type="url"
                value={url}
                // placeholder="(optional)"
                onChange={(e) => setUrl(e.target.value)}
              />
            </label>


            {/* <div className="form-input-break"></div> */}

            <label className="review-field">
              Review:
              <textarea
                type="text"
                value={review}
                onChange={(e) => setReview(e.target.value)}
              />
            </label>
            
            
        </div>

        <button
        // disabled={
        //   hasSubmitted &&
        //   errors.length > 0 ? true : false
        // }
        className="modal-submit-button"
        >
          Create Review
        </button>


      </form>

    </div>
  )
}

export default ReviewForm; 
