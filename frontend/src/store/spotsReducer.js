import { csrfFetch } from "./csrf"

// ~()Get all spots~
const LOAD_SPOTS = 'spots/loadSpots'
// ~()Get current spot~
const LOAD_CURRENTSPOT = 'spot/loadCurrentSpot'
// ~()Create a spot~
const CREATE_SPOT = 'spot/createSpot'

// ~()Get all spots~
export const loadSpots = (spots) => {
    return {
        type: LOAD_SPOTS,
        spots
    }
}
// ~()Get current spot~
export const currentSpot = (spot) => {
    return {
        type: LOAD_CURRENTSPOT,
        spot
    }
}
// ~()Create a new spot~
export const createSpot = (newSpot) => {
    return {
        type: CREATE_SPOT,
        newSpot
    }
}


// ~()Get all spots~
export const fetchSpots = () => async (dispatch) => {
    const res = await fetch('/api/spots')
    const spots = await res.json()
    dispatch(loadSpots(spots))//<== the data fetched from the backend server is what is passed into the loadspots as an argument
}
// ~()Get current spot~
export const fetchCurrentSpot = (spotId) => async (dispatch) => {
    const res = await fetch(`/api/spots/${spotId}`)

    if (res.ok) {
        const spot = await res.json()
        dispatch(currentSpot(spot))
    }
}
// ~()Create a new spot~
export const CreatNewSpot = (Spotpayload) => async (dispatch) => {

    const res = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Spotpayload)
    })
    if(!res.ok){
            const errors = await res.json()
            // console.log(errors)
            return errors
            // throw new Error(errors)
    }
        const newSpot = await res.json()
        dispatch(createSpot(newSpot))
        return newSpot
}


const initialState = {}

const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        // ~()Get all spots~
        case LOAD_SPOTS:
            return { ...state, ...action.spots }
        // ~()Get current spot~
        case LOAD_CURRENTSPOT:
            return { ...state, spot: { ...action.spot } }
        // ~()Create a new spot~
        case CREATE_SPOT:
            return {
                ...state, ...action.newSpot
            }
        default:
            return state
    }
}

export default spotsReducer
