import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import PageNotFound from "./components/PageNotFound";
import Footer from "./components/Footer";

import LoadAllSpots from "./components/Spots/LoadAllSpots";
import CreateSpot from "./components/Spots/CreateSpot";
import LoadOneSpot from "./components/Spots/LoadOneSpot";



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

            <Route path="/newspot">
              <CreateSpot />
            </Route>

            <Route path="/spots/:spotId">
              <LoadOneSpot />
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