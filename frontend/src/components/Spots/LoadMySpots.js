import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect } from "react-router-dom"
import { getUserSpots, resetSpots } from "../../store/spots"
import MySpotCard from "./MySpotCard"
import "./Spots.css"



function LoadMySpots() {

  const dispatch = useDispatch()
  const currentUser = useSelector((state) => state.session.user)
  const spots = useSelector((state)=>state.spots.allSpots) 
  const spotsArr = Object.values(spots) 

  useEffect(() => {
    dispatch(getUserSpots())
    return () => {
      dispatch(resetSpots())
    }
  }, [dispatch])


  if (!currentUser) return <Redirect to="/" />

  return (
    <>
      <div className="myspots-header">
        {
          spotsArr.length === 0 ?
          (<>
            <h1>My Spots</h1>
            <h4>You Don't Have Any Spots!</h4>
          </>):
          <h1>My Spots</h1>
        }
      </div>

      <div className="myspots-container">
        <div className="myspots-allspots-container myspots">
          {
            spotsArr.map((spot) => (
              <MySpotCard key={spot.id} spot={spot} />
            ))
          }
        </div>
      </div>

    </>
  )
}

export default LoadMySpots; 
