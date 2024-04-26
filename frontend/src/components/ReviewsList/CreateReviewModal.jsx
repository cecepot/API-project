import { useDispatch} from "react-redux"
import { useModal } from "../../context/Modal"
import { useState } from "react";
import { createNewReview, fetchReviews } from "../../store/reviewsReducer";
import { fetchCurrentSpot } from "../../store/spotsReducer";

const CreateReviewModal = ({id}) => {
    const [reviewText, setReviewText] = useState('')
    const [starRating, setStarRating] = useState('')
    const [errors, setErrors] = useState({})
    const [oneReviewError, setOneReviewError]= useState('')
    const dispatch = useDispatch()
    // console.log(id)

    const { closeModal } = useModal();


    const handleSubmit = async(e) =>{
        e.preventDefault()

        const reviewPayload = {}
        if(reviewText) reviewPayload.review = reviewText
        if(starRating) reviewPayload.stars = starRating
        console.log(reviewPayload)

        const newReview = await dispatch(createNewReview(reviewPayload, id)).catch(
            async (res) => {
                const data = await res.json();
                // console.log(res)
                if (data && data.errors) {
                    setErrors(data.errors);
                }
                if(data && res.status !== 201){
                    setOneReviewError(data.message)
                }
            }
        )
        // console.log(errors)
        if(newReview){
            dispatch(fetchReviews(id))
            dispatch(fetchCurrentSpot(id))
           return closeModal()
        }
    }


    return (
        <div >
            <form onSubmit={handleSubmit}>
                <h1>How was your stay?</h1>
                <div>
                <p className='error'>{oneReviewError && `${oneReviewError}`}</p>
                <p className='error'>{errors.review && `${errors.review}`}</p>
                    <label>
                        {/* <p className='error'>{errors.description && `${errors.description}`}</p> */}
                        <textarea placeholder='Leave your review here ...'
                            required
                            onChange={e=>setReviewText(e.target.value)}
                            // value={description}
                            // Set the description variable to the value in the input box
                            // onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                    </label>
                </div>
                <div>
                <p className='error'>{errors.starRating && `${errors.starRating}`}</p>
                    <input type="number"
                    required
                    min='1'
                    max='5'
                    onChange={e=>setStarRating(e.target.value)}/>
                </div>
                <button type="submit">Submit Your Review</button>
            </form>
        </div>
    )
}

export default CreateReviewModal
