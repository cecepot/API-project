import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { fetchSpots } from '../../store/spotsReducer'
// import { Tooltip } from 'react-tooltip'
import StarRating from "../StarRating"

// import SpotDetails from "../SpotDetails"
import './SpotList.css'

const SpotsList = () => {
    // console.log({fetchSpots})
    const dispatch = useDispatch()
    const spots = useSelector((state) => state.spotState.Spots)
    // console.log(spots)


    useEffect(() => {
        dispatch(fetchSpots())
    }, [dispatch])

    return (
        <>
            <div className='main-image-container'>
                <img className='main-image' src="https://res.cloudinary.com/dv9oyy79u/image/upload/v1714330065/image_47_exbrvp.jpg" alt="" />
            </div>
            <ul className="tiles">
                {/* The logical && operator ensures that the state is not null before calling map on the spots */}
                {spots && spots.map((spot) => {
                    return <Link to={`spots/${spot.id}`} key={spot.id} className="Link">
                        <li className="spot-container hover">
                            <div className="tooltip-container">
                                <img src={`${spot.previewImage}`} alt="" />
                                <p className="spot-name vt323-regular font-size">{spot.name}</p>
                            </div>
                            <div className="details">
                                <div className="upper-details">
                                    <p>{spot.city}, {spot.state}</p>
                                    <p>{spot.avgRating ? <StarRating rating={spot.avgRating} /> : <StarRating rating={false} />}</p>
                                </div>
                                <p><b>${spot.price}</b> night</p>
                            </div>
                        </li>
                    </Link>
                }
                )}
            </ul>
        </>

    )
}

export default SpotsList
