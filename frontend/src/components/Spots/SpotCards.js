import { Link } from "react-router-dom"
import "./Spots.css"


function SpotCards({spot}) {
  return (
    <div>
      <Link style={{ textDecoration: "none", color: "black" }} to={`/spots/${spot.id}`}>

        <div className="spotCard-image-container">
        {spot.previewImage ?
          (<div><img src={spot.previewImage} /></div>) :
          (<div><img src='image' alt="noimage" /></div>)
        }
        </div>

        <div className="spotCard-spot-info-container">

          <div className="spotCard-spot-detail-info">
            <div className="spotCard-spot-location-detail">
              {spot.city}, {spot.state}
            </div>
            <div className="spotCard-spot-ratings">
              {spot.avgRating ? 
              (<span>★ {spot.avgRating}</span>): 
              (<span style={{color: 'red'}}>New!</span>)
              }
            </div>
          </div>
      
          <div className="spotCard-spot-price">
            ${spot.price} <span></span>
          </div>
        </div>

      </Link>
    </div>
  )
}

export default SpotCards; 
