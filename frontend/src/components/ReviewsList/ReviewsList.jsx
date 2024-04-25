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
    const userId = user && user.id

    const reviews = useSelector((state) => state.reviewState.reviews.Reviews)
    // console.log(reviews)
    const sortedReviews = reviews && reviews.sort((a, b)=>b.id - a.id)
    // console.log(sortedReviews)

    useEffect(() => {
        dispatch(fetchReviews(spotId))
    }, [dispatch, spotId])


    return (
        <>
            <h1 className='adjacent'>reviews <span><StarRating rating={spot.avgStarRating}/></span>.{spot.numReviews > 1 || spot.numReviews === 0 ? <span className='fit'>{spot.numReviews} reviews</span> : <span className='fit'>{spot.numReviews} review</span>}</h1>
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
                reviews && sortedReviews.map((review) => {
                    return (<div key={review.id}>
                        <p>{review && review.User.firstName}</p>
                        <p>{review && new Date((review.createdAt).split(' ')[0]).toLocaleDateString('en-us',{month:'long', year:'numeric'})}</p>
                        <p>{review && review.review}</p>
                        {
                            userId == review.userId &&
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
