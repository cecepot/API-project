import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import './SpotDetails.css'
import { useEffect } from 'react'
import { fetchCurrentSpot } from '../../store/spotsReducer'
import ReviewsList from "../ReviewsList/ReviewsList"
import StarRating from '../StarRating'
import SpotImage from './SpotImage'


const SpotDetails = () => {
    const { spotId } = useParams()
    const dispatch = useDispatch()
    // console.log(spotId)

    useEffect(() => {
        dispatch(fetchCurrentSpot(spotId))
    }, [dispatch, spotId])

    const currentSpot = useSelector((state) => state.spotState.spot)



    return (
        <div>
            <div>
                <div>
                    <h1 className='vt323-regular'>{currentSpot && currentSpot.name}</h1>
                    <p>{currentSpot && currentSpot.city}, {currentSpot && currentSpot.state}, {currentSpot && currentSpot.country}</p>
                    <div>
                    {currentSpot && <SpotImage spot ={currentSpot}/>}
                    </div>
                </div>
                <div className='spot-info'>
                    <div className='info-upper'>
                        <p>Hosted by <b>{currentSpot && currentSpot.Owner.firstName} {currentSpot && currentSpot.Owner.lastName}</b></p>
                        <p className='description'>{currentSpot && currentSpot.description}</p>
                    </div>
                    <div className='reserve-card'>
                        <div className='card-upper'>
                            <p><b>${currentSpot && currentSpot.price}</b> night</p>
                            <p className='row upper-left'>{currentSpot ? <StarRating rating={currentSpot.avgStarRating} /> : <StarRating rating={false} />}  {currentSpot && (currentSpot.numReviews !== 0 && (currentSpot.numReviews > 1 ? <span className='adjacent full'><span> . </span>{currentSpot.numReviews} reviews</span> : <span className='adjacent full'><span> . </span>{currentSpot.numReviews} review</span>))}</p>
                        </div>
                        <div className='button-div bottom'>
                            <button onClick={e => { e.preventDefault; alert('Feature coming soon') }} className=' red hover reserve-button'>Reserve</button>
                        </div>
                    </div>
                </div>
            </div>
            <div >
                {currentSpot && <ReviewsList spot={currentSpot} />}
            </div>
        </div>
    )
}

export default SpotDetails
