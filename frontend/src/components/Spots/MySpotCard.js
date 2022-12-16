import { Link, useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { editSpot, removeSpot } from "../../store/spots"
import "./Spots.css"

function MySpotCard ({spot}) {
  const dispatch = useDispatch()
  const history = useHistory()

  
  const currentUser = useSelector((state) => state.session.user)
  let owner = false
  if (currentUser?.id === spot.ownerId) owner = true


  const deleteSpotHandler = async () => {
    if (window.confirm("Are you sure you want to delete this spot?")) {
      await dispatch(removeSpot(spot.id))
    }
  }

  const editSpotHandler = async () => {
    history.push(`/myspots/edit/${spot.id}`)
  }


  return (
    <div>
      <Link style={{ textDecoration: "none", color: "black" }} to={`/spots/${spot.id}`}>

      <div className="myspotcard-spot-image-container">
        {spot.previewImage ?
          (<div><img src={spot.previewImage} /></div>) :
          (<div><img src="null" alt="noimage" /></div>)
        }
        </div>

        <div className="myspotcard-spot-info">

          <div className="myspotcard-spot-header">
            <div className="myspotcard-spot-location">
              {spot.city}, {spot.state}
            </div>

            <div className="myspotcard-spot-rating">
              {spot.avgRating ?
                (<span>★ {spot.avgRating}</span>):
                (<span style={{color:'red'}}>★ New!</span>)
              }
            </div>
          </div>
    
          <div className="myspotcard-spot-price">
            ${spot.price} <span>night</span>
          </div>
        </div>

      </Link>

       {/* only show edit/delete buttons to owner of spot */}
        <div className="myspotcard-buttons-container">
            {owner && (
              <>
                <button
                className="myspotcard-buttons"
                onClick={editSpotHandler}>
                  Edit
                </button>
                <button
                className="myspotcard-buttons"
                onClick={deleteSpotHandler}>
                  Delete
                </button>
              </>
            )}
          </div>

    </div>
  )
}

export default MySpotCard; 

/*
    allSpots: {
      [spotId]: {
          id,
          ownerId,
          address,
          city,
          state,
          country
          lat,
          lng,
          name,
          description,
          price,
          avgRating,
          previewImage
      },
      optionalOrderedList: []
    }
 */
