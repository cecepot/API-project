import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { fetchReviews } from '../../../store/reviewsReducer'


const ReviewsList = ({avgStarRating, ownerId}) => {
    const { spotId } = useParams()
    const dispatch = useDispatch()
    // console.log(spotId)
    const reviews = useSelector((state) => state.reviewState.Reviews)
    const user = useSelector((state)=>state.session.user)
    // console.log(reviews)
    useEffect(() => {
        dispatch(fetchReviews(spotId))
    }, [dispatch, spotId])

    return (<>
        <h1>{avgStarRating}(stars) reviews</h1>
        {(user && user.id !== ownerId) && <button>Post Your Review</button>}
        {
            reviews.map((review) => {
                return (<div key={review.id}>
                    <p>{review && review.User.firstName}</p>
                    <p>{review && (review.createdAt).split(' ')[0]}</p>
                    <p>{review && review.review}</p>
                </div>
                )
            })
        }
    </>)
}


export default ReviewsList
