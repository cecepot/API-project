import { csrfFetch } from "./csrf"

// ~()Get all spots~
const LOAD_SPOTS = 'spots/loadSpots'
// ~()Get current spot~
const LOAD_CURRENTSPOT = 'spot/loadCurrentSpot'
// ~()Create a spot~
const CREATE_SPOT = 'spot/createSpot'
// ~()Get all spots of the current user~
const MANAGE_SPOT = 'spot/manageSpot'
// ~()Get all spots of the current user~
const DELETE_SPOT = 'spot/deleteSpot'


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
// ~()Manage a spot~
export const manageSpot = (spot) => {
    return {
        type: MANAGE_SPOT,
        spot
    }
}
export const deleteSpot = (spot) => {
    return {
        type: DELETE_SPOT,
        spot
    }
}
// ~()Create a new spot~
// export const createImage = (SpotImage) => {
//     return {
//         type: CREATE_SPOTIMAGE,
//         image
//     }
// }

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
export const CreatNewSpot = (Spotpayload) => async dispatch => {

    const res = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Spotpayload)
    })
    if (!res.ok) {
        const errors = await res.json()
        // console.log(errors)
        return errors
        // throw new Error(errors)
    }
    const newSpot = await res.json()
    dispatch(createSpot(newSpot))
    return newSpot
}
// ~()Create spot image~
// const images = []
export const CreateSpotImage = (imagePayload, spotId, newSpot) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/images`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(imagePayload)
    })
    if (!res.ok) {
        const errors = await res.json()
        // console.log(errors)
        return errors
        // throw new Error(errors)
    }
    const spotImage = await res.json()
    // dispatch(createImage(spotImage))
    // images.push(spotImage.url)
    dispatch(createSpot(newSpot))
    return spotImage
}
// ~()Get current user's spots spots~
export const fetchUserSpots = () => async (dispatch) => {
    const res = await csrfFetch('/api/spots/current')
    const spots = await res.json()
    dispatch(loadSpots(spots))//<== the data fetched from the backend server is what is passed into the loadspots as an argument
}
// ~()Delete a spot~
export const deleteCurrentSpot = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    })
    const spot = await res.json()
    dispatch(deleteSpot(spot))//<== the data fetched from the backend server is what is passed into the loadspots as an argument
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
        // ~()Manage your spot~
        case MANAGE_SPOT:
            return { ...state, spot: { ...action.spot } }
        // ~()Delete your spot~
        case DELETE_SPOT:
            return { ...state }
        default:
            return state
    }
}

export default spotsReducer
