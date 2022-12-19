import { Link, useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { editSpot, getOneSpot, removeSpot } from "../../store/spots"
import noimage from './noimage.jpeg'; 
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

  // const spotToEdit = async() => {
  //   await dispatch(getOneSpot(spot.id))
  // }


  return (
    <div>
      <Link style={{ textDecoration: "none", color: "black" }} to={`/spots/${spot.id}`}>

      <div className="spotCard-image-container">
        {spot.previewImage ?
          (<div><img src={spot.previewImage} /></div>) :
          (<div><img src={noimage} alt="image not available" /></div>)
        }
        </div>

        <div className="spotCard-spot-info-container">

          <div className="spotCard-spot-detail-info">
            <div className="spotCard-spot-location-detail">
            {spot.name}
            </div>
            <div className="spotCard-spot-ratings">
              {spot.avgRating ? 
              (<span>★ {spot.avgRating}</span>): 
              (<span style={{color: 'red'}}>New!</span>)
              }
            </div>
          </div>

          <div className="spotCard-spot-country">
            {`${spot.name}, ${spot.state}`}
          </div>
      
          <div className="spotCard-spot-price">
            ${spot.price} <span></span>
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
