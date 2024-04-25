import { csrfFetch } from "./csrf"



// ~()Get all reviews for a spot~
const LOAD_REVIEWS = 'spots/loadReviews'
// ~()Create a review  for a spot~
const CREATE_REVIEW = 'spots/createReview'
// ~()Get all spots of the current user~
const DELETE_REVIEW = 'spot/deleteReview'



// ~()Get all spots~
export const loadReviews = (reviews) => {
    return {
        type: LOAD_REVIEWS,
        reviews
    }
}
// ~()Create review~
export const createReview = (newReview) => {
    return {
        type: CREATE_REVIEW,
        newReview
    }
}
// ~()Delete a review~
export const deleteReview= (review) => {
    return {
        type: DELETE_REVIEW,
        review
    }
}



// ~()Get all reviews for a spot~
export const fetchReviews = (spotId) => async (dispatch) => {
    const res = await fetch(`/api/spots/${spotId}/reviews`)

    if (res.ok) {
        const reviews= await res.json()
        dispatch(loadReviews(reviews))
    }
    return res
}
// ~()Create a review for a spot~
export const createNewReview = (reviewsPayload, id) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${id}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reviewsPayload)
    })
    if (!res.ok) {
        const errors = await res.json()
        // console.log(errors)
        return errors
        // throw new Error(errors)
    }

        const newReview = await res.json()
        dispatch(createNewReview(newReview))
    return res
}
// ~()Delete a review~
export const deleteCurrentReview = (reviewId) => async (dispatch) => {
    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    })
    const review = await res.json()
    dispatch(deleteReview(review))//<== the data fetched from the backend server is what is passed into the loadspots as an argument
}





const initialState = {reviews: {}}
const reviewsReducer = (state = initialState, action) =>{
    switch(action.type){
         // ~()Get all reviews for a spot~
         case LOAD_REVIEWS:
            return { ...state, reviews: {...action.reviews} }
        // ~()Get all reviews for a spot~
        case CREATE_REVIEW:
            return { ...state, ...action.newReview }
        // ~()Delete review for a spot~
        case DELETE_REVIEW:
            return { ...state }
    default:
            return state
    }
}

export default reviewsReducer
