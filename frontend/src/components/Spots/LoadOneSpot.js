
import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { getOneSpot } from "../../store/spots"
import "./Spots.css"

function LoadOneSpot() {

  const dispatch = useDispatch()
  const { spotId } = useParams()

  const spot = useSelector((state)=>{
    return state.spots.singleSpot
  }) 

  useEffect(() => {
    dispatch(getOneSpot(+spotId))
  }, [dispatch, spotId])



  const currentUser = useSelector((state) => state.session.user)
  let owner = false
  if (currentUser?.id === spot.ownerId) owner = true


  if (!Object.values(spot).length) return null


  let displayImages = [...spot.spotImages]

  let previewImage = displayImages.find((image)=>{
    return image.preview===true
  })
  if (!previewImage) {
    previewImage = displayImages[0]
    displayImages.splice(0,1)
  } 


  return (
    <>
      <div className="loadOneSpot-container">

        <div className="loadOneSpot-header-div-above-image">
          <div className="loadOneSpot-header-name"><h1>{spot.name}</h1></div>
          <div className="loadOneSpot-header-detail">
              {spot.avgRating ?
                (<span>★ {spot.avgRating}  ·  </span>):
                (<span>★ New!  ·  </span>)
              }
              <span>{spot.numReviews} reviews  ·  </span>
              <span>Superhost  ·  </span>
              <span>{spot.city}, {spot.state}, {spot.country}</span>
          </div>
        </div>


        <div className="loadOneSpot-images-container">
          <div>
            {
              previewImage &&
              <img className="loadOneSpot-previewImage"
              alt={spot.name} src={previewImage.url}/>
            }
          </div>
        </div>


        <div className="loadOneSpot-below-pictures-div">
          <div className="loadOneSpot-below-picture-div-left-subdiv">
            <h2>Entire Home Hosted by {spot.Owner.firstName}</h2>
            <div className="loadOneSpot-linebreak"></div>
            <div>{spot.description}</div>
          </div>

          <div className="loadOneSpot-floatbox">
            <div className="loadOneSpot-floatbox-header">
              <div><span className="loadOneSpot-floatbox-price">${spot.price}</span> night</div>
              <div className="loadOneSpot-floatbox-review">
                  <span>
                    {spot.avgRating ?
                      (<span className="bold">★ {spot.avgRating}  ·   </span>):
                      (<span style={{color:'red'}} className="bold">★ New!  ·   </span>)
                    }
                  </span>
                  <span>{spot.numReviews} reviews</span>
              </div>
            </div>
          </div>
        </div>

        <div className="loadOneSpot-linebreak long"></div>

        <h2 className="loadOneSpot-review-header">
            <span>
            {spot.avgRating ?
              (<span className="bold">★ {spot.avgRating}  ·   </span>):
              (<span className="bold">★ New  ·   </span>)
            }
            </span>
            <span>{spot.numReviews} reviews</span>
        </h2>


      </div>
    </>
  )
}

export default LoadOneSpot; 

