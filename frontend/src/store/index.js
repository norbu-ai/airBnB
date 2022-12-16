import { legacy_createStore as createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from './session';
import spotsReducer from './spots';
import reviewsReducer from './reviews';


const rootReducer = combineReducers({
    session: sessionReducer,
    spots: spotsReducer, 
    reviews: reviewsReducer
});


let enhancer;

// Initialize an enhancer variable that will be set to different store enhancers 
// depending on if the Node environment is in development or production
if (process.env.NODE_ENV === 'production') {
    enhancer = applyMiddleware(thunk);
} else {
    const logger = require('redux-logger').default;
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
};



export default configureStore;