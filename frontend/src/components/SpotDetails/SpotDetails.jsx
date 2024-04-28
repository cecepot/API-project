import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import './SpotDetails.css'
import { useEffect } from 'react'
import { fetchCurrentSpot } from '../../store/spotsReducer'
import ReviewsList from "../ReviewsList/ReviewsList"
import StarRating from '../StarRating'

const SpotDetails = () => {
    const { spotId } = useParams()
    const dispatch = useDispatch()
    // console.log(spotId)
    const currentSpot = useSelector((state) => state.spotState.spot)

    useEffect(() => {
        dispatch(fetchCurrentSpot(spotId))
    }, [dispatch, spotId])

    //    console.log(currentSpot)
    return (
        <>
            <h1 className='vt323-regular'>{currentSpot && currentSpot.name}</h1>
            <p>{currentSpot && currentSpot.city}, {currentSpot && currentSpot.state}, {currentSpot && currentSpot.country}</p>
            <div className='image-grid' >
                {currentSpot && currentSpot.SpotImages.map((image) => {
                    return <img key={image.id} src={`${image.url}`} alt="" />
                })}
            </div>
            <div className='spot-info'>
                <div className='info-upper'>
                    <p>Hosted by {currentSpot && currentSpot.Owner.firstName} {currentSpot && currentSpot.Owner.lastName}</p>
                    <p className='description'>{currentSpot && currentSpot.description}</p>
                </div>
                <div className='reserve-card'>
                    <div className='card-upper'>
                        <p>${currentSpot && currentSpot.price} night</p>
                        <p className='row upper-left'>{currentSpot ? <StarRating rating={currentSpot.avgStarRating}/> : <StarRating rating={false}/> }  { currentSpot && (currentSpot.numReviews!== 0  && (currentSpot.numReviews > 1 ? <span className='adjacent full'><span> . </span>{currentSpot.numReviews} reviews</span> : <span className='adjacent full'><span> . </span>{currentSpot.numReviews} review</span>))}</p>
                    </div>
                    <div className='button-div'>
                        <button onClick={e=>{e.preventDefault; alert('Feature coming soon')}} className='reserve-button'>Reserve</button>
                    </div>
                </div>
            </div>
            <div>
            {currentSpot && <ReviewsList spot={currentSpot}/>}
            </div>
        </>
    )
}

export default SpotDetails
