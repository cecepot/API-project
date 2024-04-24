// import { csrfFetch } from "./csrf"



// ~()Get all reviews for a spot~
const LOAD_REVIEWS = 'spots/loadReviews'


// ~()Get all spots~
export const loadReviews = (reviews) => {
    return {
        type: LOAD_REVIEWS,
        reviews
    }
}

// ~()Get all reviews for a spot~
export const fetchReviews = (spotId) => async (dispatch) => {
    const res = await fetch(`/api/spots/${spotId}/reviews`)

    if (res.ok) {
        const reviews= await res.json()
        dispatch(loadReviews(reviews))
    }
}




const initialState = {}
const reviewsReducer = (state = initialState, action) =>{
    switch(action.type){
         // ~()Get all reviews for a spot~
         case LOAD_REVIEWS:
            return { ...state, ...action.reviews }

    default:
            return state
    }
}

export default reviewsReducer
