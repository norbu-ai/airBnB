import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getOneSpot } from "../../store/spots";
import "./Spots.css";
import noimage from "./noimage.jpeg";

import ReviewFormModal from "../Reviews/ReviewFormModal";
import LoadSpotReviews from "../Reviews/LoadSpotReviews";

function LoadOneSpot() {
  const dispatch = useDispatch();
  const { spotId } = useParams();

  const spot = useSelector((state) => {
    return state.spots.singleSpot;
  });

  const reviews = useSelector((state) => {
    return state.reviews.spot;
  });

  useEffect(() => {
    // spotId parameter used here
    dispatch(getOneSpot(+spotId));
  }, [dispatch, spotId, reviews]);

  const currentUser = useSelector((state) => state.session.user);
  let owner = false;
  if (currentUser?.id === spot.ownerId) owner = true;

  if (!Object.values(spot).length) return null;

  let displayImages = [...spot.SpotImages];
  let previewImage = displayImages.find((image) => {
    return image.preview === true;
  });
  if (!previewImage) {
    previewImage = displayImages[0];
    displayImages.splice(0, 1);
  } else {
    displayImages.splice(displayImages.indexOf(previewImage), 1);
  }

  let nonPreviewCount = displayImages.length;
  if (nonPreviewCount < 4) {
    for (let i = 3; i >= nonPreviewCount; i--) {
      displayImages[i] = { url: noimage };
    }
  }

  return (
    <>
      <div className="loadOneSpot-container">
        <div className="loadOneSpot-header-div-above-image">
          <div className="loadOneSpot-header-name">
            <h1>{spot.name}</h1>
          </div>
          <div className="loadOneSpot-header-detail">
            {spot.avgStarRating ? (
              <span>★ {spot.avgStarRating} · </span>
            ) : (
              <span>★ New! · </span>
            )}
            <span>{spot.numReviews} reviews · </span>
            <span>Superhost · </span>
            <span>
              {spot.city}, {spot.state}, {spot.country}
            </span>
          </div>
        </div>

        <div className="loadOneSpot-images-container">
          <div>
            {/* {
              previewImage &&
              <img className="loadOneSpot-previewImage"
              alt={spot.name} src={previewImage.url}/>
            } */}
            {previewImage ? (
              <img
                className="loadOneSpot-previewImage"
                alt={spot.name}
                src={previewImage.url}
              />
            ) : (
              <img src={noimage} alt="image not available" />
            )}
          </div>

          <div className="loadOneSpot-other-images-container">
            {displayImages.length ? (
              displayImages.map((image) => (
                <img
                  className="loadOneSpot-other-image"
                  key={image.id}
                  src={image.url}
                />
              ))
            ) : (
              <div>listing has no other images</div>
            )}
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
              <div>
                <span className="loadOneSpot-floatbox-price">
                  ${spot.price}
                </span>{" "}
                night
              </div>
              <div className="loadOneSpot-floatbox-review">
                <span>
                  {spot.avgStarRating ? (
                    <span className="bold">★ {spot.avgStarRating} · </span>
                  ) : (
                    <span style={{ color: "red" }} className="bold">
                      ★ New! ·{" "}
                    </span>
                  )}
                </span>
                <span>{spot.numReviews} reviews</span>

                {/* testing button in the floatbox  */}
                {/* <button style={{backgroundColor:'red', color:'white'}}>Create Review</button> */}
              </div>
            </div>

            <div
              style={{
                color: "red",
                padding: "0px 18px 13px 18px",
              }}
            >
              Every booking includes free protection from Host cancellations,
              listing inaccuracies, and other issues like trouble checking in.
            </div>

            {/* <button style={{
              display: 'flex', 
              backgroundColor: 'rgb(255, 90, 96)',
              border: '1px rgb(255, 90, 96) solid',
              color: 'white', 
              marginTop: 20, 
              marginRight: 80, 
              marginLeft: 120, 
              fontSize: 15, 
              fontWeight: 'bolder', 
              paddingLeft: 25,
              paddingTop: 5, 
              borderRadius: '6px', 
              border: 'none', 
              height: 35, 
              width: 110
            }}
            onClick={()=>alert('booking feature coming soon!')}
            >Reserve</button> */}

            {/* <form>
              <div>
              <label>
                <input />CHECK-IN
              </label>
              <label>
                <input />CHECKOUT
              </label>
              </div>
              <label>GUESTS
                <select disabled>
                  <option>1 guest</option>
                </select>
              </label>
            </form>
            <button>Reserve</button> */}
          </div>
        </div>

        <div className="loadOneSpot-linebreak long"></div>

        <h2 className="loadOneSpot-review-header">
          <span>
            {spot.avgStarRating ? (
              <span className="bold">★ {spot.avgStarRating} · </span>
            ) : (
              <span className="bold">★ New · </span>
            )}
          </span>
          <span>{spot.numReviews} reviews</span>
        </h2>

        {/* only show "create review" button to NON-owner of spot */}
        <div>
          {currentUser && !owner && <ReviewFormModal spotId={spotId} />}
        </div>

        <div className="loadOneSpot-reviews-container">
          <LoadSpotReviews spotId={spotId} />
        </div>
      </div>
    </>
  );
}

export default LoadOneSpot;
