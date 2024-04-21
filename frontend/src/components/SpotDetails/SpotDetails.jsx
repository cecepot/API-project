import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import './SpotDetails.css'
import { useEffect } from 'react'
import { fetchCurrentSpot } from '../../store/spotsReducer'


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
            <h1>You are now on the spot details page</h1>
            <h2>{currentSpot && currentSpot.name}</h2>
            <p>{currentSpot && currentSpot.city}, {currentSpot && currentSpot.state}, {currentSpot && currentSpot.country}</p>
            <div className='image-grid' >
                {currentSpot && currentSpot.SpotImages.map((image) => {
                    return <img key={image.id} src={`${image.url}`} alt="" />
                })}
            </div>
            <div className='spot-info'>
                <div className='info-upper'>
                    <p>Hosted by {currentSpot && currentSpot.Owner.firstName} {currentSpot && currentSpot.Owner.lastName}</p>
                    <p>{currentSpot && currentSpot.description}</p>
                </div>
                <div className='reserve-card'>
                    <div className='card-upper'>
                        <p>${currentSpot && currentSpot.price} night</p>
                        <p>{currentSpot && currentSpot.avgStarRating} {currentSpot && currentSpot.numReviews} reviews</p>
                    </div>
                    <div className='button-div'>
                        <button className='reserve-button'>Reserve</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SpotDetails
