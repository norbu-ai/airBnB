import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllSpots, resetSpots } from "../../store/spots"
import SpotCards from "./SpotCards"; 
import "./Spots.css"


const LoadAllSpots = () => {
  const dispatch = useDispatch()
  const allSpots = useSelector((state)=> state.spots.allSpots); 

  const allSpotsArr = Object.values(allSpots); 

  // garbage collection 
  useEffect(() => {
    dispatch(getAllSpots()); 
    return () => {
      dispatch(resetSpots())
    }
  }, [dispatch])


  if (!allSpotsArr.length) return null; 
  
  return (
    <>
    <div className="loadAllSpots-container">
      <div className="loadAllSpots-allspots-container">
        {
          allSpotsArr.map(spot => (
            <SpotCards key={spot.id} spot={spot} />
          ))
        }
      </div>
    </div>
    
    
    </>
  )


}

export default LoadAllSpots
