import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { fetchReviews } from '../../store/reviewsReducer'
import StarRating from '../StarRating'
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem"
import CreateReviewModal from './CreateReviewModal'
import DeleteReviewModal from './DeleteReviewModal'




const ReviewsList = ({spot}) => {
    const { spotId } = useParams()
    // console.log(spotId)
    const dispatch = useDispatch()
    // console.log(spotId)

    const user = useSelector((state) => state.session.user)
    let showButton = true
    if(!user){
        showButton = false
    }
    if(user && user.id == spot.ownerId){
        showButton = false
    }


    const reviews = useSelector((state) => state.reviewState.reviews.Reviews)
    // console.log(reviews)
    useEffect(() => {
        dispatch(fetchReviews(spotId))
    }, [dispatch, spotId])


    return (
        <>
            <h1 className='adjacent'>reviews <span><StarRating rating={spot.avgStarRating}/></span>.{spot.numReviews > 1 ? <span className='fit'>{spot.numReviews} reviews</span> : <span className='fit'>{spot.numReviews} review</span>}</h1>
            {showButton &&
                <button>
                    <OpenModalMenuItem
                        itemText='Post Your Review'
                        modalComponent={<CreateReviewModal id={spotId} />}
                    />
                </button>
            }
            {(reviews && reviews.length === 0) && <p>Be the first to post a review!</p>}
            {
                reviews && reviews.map((review) => {
                    return (<div key={review.id}>
                        <p>{review && review.User.firstName}</p>
                        <p>{review && (review.createdAt).split(' ')[0]}</p>
                        <p>{review && review.review}</p>
                        {
                            user.id == review.userId &&
                            <button >
                                <OpenModalMenuItem
                                itemText='Delete'
                                modalComponent={<DeleteReviewModal id ={review.id} spotId ={review.spotId}/>}
                                />
                            </button>
                        }
                    </div>
                    )
                })
            }
        </>
    )
}


export default ReviewsList
