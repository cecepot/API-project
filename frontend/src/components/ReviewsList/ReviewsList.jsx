import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { fetchReviews } from '../../store/reviewsReducer'
import StarRating from '../StarRating'
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem"
import CreateReviewModal from './CreateReviewModal'
import DeleteReviewModal from './DeleteReviewModal'




const ReviewsList = ({ spot }) => {
    const { spotId } = useParams()
    // console.log(spotId)
    const dispatch = useDispatch()
    // console.log(spotId)
    const user = useSelector((state) => state.session.user)
    let showButton = true
    let showText = false


    if (!user) {
        showButton = false
    }
    if (user && user.id == spot.ownerId) {
        showButton = false
    }
    const userId = user && user.id



    const reviews = useSelector((state) => state.reviewState.reviews.Reviews)
    // console.log(reviews)

    if (reviews) {
        if (reviews.length === 0 && userId !== spot.ownerId) {
            showText = true
        }
    }

    if (user) {
        reviews && reviews.map((review) => {
            if ((userId !== spot.ownerId) && review.userId == userId) { showButton = false }
        })
    }
    // reviews && reviews.map((review)=>{
    //     if(review.userId == userId){
    //         showButton = false
    //     }
    // })
    const sortedReviews = reviews && reviews.sort((a, b) => b.id - a.id)
    // console.log(sortedReviews)

    useEffect(() => {
        dispatch(fetchReviews(spotId))
    }, [dispatch, spotId])


    return (
        <>
            <h1 className='adjacent'>reviews <span><StarRating rating={spot.avgStarRating} /></span>{spot.numReviews !== 0 && (spot.numReviews > 1 ? <span className='adjacent width'><span> . </span><span className='adjacent'>{spot.numReviews} reviews</span></span> : <span className='adjacent width'><span> . </span><span className='adjacent'>{spot.numReviews} review</span></span>)}</h1>
            <hr className='bottom' />
            {showButton &&
                <button className='red hover'>
                    <OpenModalMenuItem
                        itemText='Post Your Review'
                        modalComponent={<CreateReviewModal id={spotId} />}
                    />
                </button>
            }
            {showText && <p>Be the first to post a review!</p>}
            <div>
                {
                    reviews && sortedReviews.map((review) => {

                        return (
                            <div key={review.id} className='inner-container bottom'>

                                <h3>{review && review.User.firstName}</h3>
                                <p>{review && new Date((review.createdAt).split(' ')[0]).toLocaleDateString('en-us', { month: 'long', year: 'numeric' })}</p>
                                <p>{review && review.review}</p>
                                {
                                    userId == review.userId &&
                                    <button className='red hover'>
                                        <OpenModalMenuItem
                                            itemText='Delete'
                                            modalComponent={<DeleteReviewModal id={review.id} spotId={review.spotId} />}
                                        />
                                    </button>
                                }
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}


export default ReviewsList
