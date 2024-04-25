import { useDispatch} from "react-redux"
import { fetchCurrentSpot } from "../../store/spotsReducer"
import { deleteCurrentReview, fetchReviews } from "../../store/reviewsReducer"
import { useModal } from "../../context/Modal"
const DeleteReviewModal = ({id, spotId}) => {
    const { closeModal } = useModal();
    // console.log(closeModal)
    // const currentSpot = currentSpotReview
    // console.log(currentSpot)
    const reviewId = (id && id)
    // console.log(spotId)
    const dispatch = useDispatch()
    const handleClick = async(e) =>{
        e.preventDefault()

        await dispatch(deleteCurrentReview(reviewId))
        dispatch(fetchCurrentSpot(spotId))
        dispatch(fetchReviews(spotId))
        closeModal()
    }

    const close = (e) =>{
        e.preventDefault()
        return closeModal()
    }

    return (
        <div >
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to delete this review?</p>
            <div>
            <button onClick={handleClick}>Yes</button>
            </div>
            <div>
            <button onClick={close}>No</button>
            </div>
        </div>
    )

}

export default DeleteReviewModal
