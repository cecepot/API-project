// ~()Get all spots~
const LOAD_SPOTS = 'spots/loadSpots'
// ~()Get current spot~
const LOAD_CURRENTSPOT = 'spot/loadCurrentSpot'

// ~()Get all spots~
export const loadSpots = (spots) => {
    return {
        type: LOAD_SPOTS,
        spots
    }
}
// ~()Get current spot~
export const currentSpot = (spot)=>{
    return {
        type: LOAD_CURRENTSPOT,
        spot
    }
}


// ~()Get all spots~
export const fetchSpots = () => async (dispatch) => {
    const res = await fetch('/api/spots')
    const spots = await res.json()
    dispatch(loadSpots(spots))//<== the data fetched from the backend server is what is passed into the loadspots as an argument
}
// ~()Get current spot~
export const fetchCurrentSpot = (spotId) => async (dispatch) =>{
    const res = await fetch(`/api/spots/${spotId}`)
    const spot = await res.json()
    dispatch(currentSpot(spot))
}


const initialState = {}

const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        // ~()Get all spots~
        case LOAD_SPOTS:
            return { ...state, ...action.spots}
        case LOAD_CURRENTSPOT:
            return { ...action.spot}
        default:
            return state
    }
}

export default spotsReducer
