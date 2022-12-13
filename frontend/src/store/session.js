import { csrfFetch } from './csrf';


/* ------------ action type constants ------------ */

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';


/* ------------ action creators ------------ */

const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user,
    };
};

const removeUser = () => {
    return {
        type: REMOVE_USER,
    };
};


/* ------------ thunk action creators ------------ */

// signup user: thunk action for the POST /api/users
export const signup = (user) => async (dispatch) => {
    const { username, email, firstName, lastName, password } = user;
    const response = await csrfFetch("/api/users", {
        method: "POST",
        body: JSON.stringify({
            username,
            email,
            firstName, 
            lastName, 
            password,
        }),
    });
    const data = await response.json();
    dispatch(setUser(data.user));
    // dispatch(setUser(data));
    return response;
};



// login user: thunk action for the POST /api/session
export const login = (user) => async (dispatch) => {
    const { credential, password } = user;
    const response = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({
            credential,
            password,
        }),
    });
    const data = await response.json();
    dispatch(setUser(data.user));
    // dispatch(setUser(data));
    return response;
};


// logout user: thunk action for the DELETE /api/session
export const logout = () => async (dispatch) => {
    const response = await csrfFetch('/api/session', {
        method: 'DELETE',
    });
    dispatch(removeUser());
    return response;
};


// restore session: thunk action for the GET /api/session
export const restoreUser = () => async dispatch => {
    const response = await csrfFetch('/api/session');
    const data = await response.json();
    dispatch(setUser(data.user));
    // dispatch(setUser(data));
    return response;
};


/* ------------ session Reducer ------------ */

const initialState = { user: null };
const sessionReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_USER:
            newState = Object.assign({}, state);
            newState.user = action.payload;
            return newState;
        case REMOVE_USER:
            newState = Object.assign({}, state);
            newState.user = null;
            return newState;
        default:
            return state;
    }
};

export default sessionReducer;