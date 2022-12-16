import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import PageNotFound from "./components/PageNotFound";
import Footer from "./components/Footer";

import LoadAllSpots from "./components/Spots/LoadAllSpots";
import LoadOneSpot from "./components/Spots/LoadOneSpot";
import CreateSpot from "./components/Spots/CreateSpot";
import LoadMySpots from "./components/Spots/LoadMySpots";
import EditSpot from "./components/Spots/EditSpot";
import LoadMyReviews from "./components/Reviews/LoadMyReviews";


function App() {

  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <div className='app'>

        <Navigation isLoaded={isLoaded} />
        {isLoaded && (
          <Switch>

            <Route exact path="/">
              <LoadAllSpots />
            </Route>

            <Route exact path="/newspot">
              <CreateSpot />
            </Route>

            <Route exact path="/myspots">
              <LoadMySpots />
            </Route>

            <Route path="/myspots/edit/:spotId">
              <EditSpot />
            </Route>

            <Route path="/spots/:spotId">
              <LoadOneSpot />
            </Route>

            <Route path="/myreviews">
              <LoadMyReviews />
            </Route>

            <Route>
              <PageNotFound />
            </Route>
            
          </Switch>
        )}
        <Footer />
      </div>
    </>
  );
}

export default App;