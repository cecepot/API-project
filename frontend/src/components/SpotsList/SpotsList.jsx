import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { fetchSpots } from '../../store/spotsReducer'
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
            <ul className="tiles">
                {/* The logical && operator ensures that the state is not null before calling map on the spots */}
                {spots && spots.map((spot) => {
                    return <Link to={`spots/${spot.id}`} key={spot.id} className="Link">
                        <li className="spot-container">
                            <div className="tooltip-container">
                                <img src={`${spot.previewImage}`} alt="" />
                                <p className="spot-name">{spot.name}</p>
                            </div>
                            <div className="details">
                                <div className="upper-details">
                                    <p>{spot.city}, {spot.state}</p>
                                    <p>{spot.avgRating ? <StarRating rating={spot.avgRating}/> : <StarRating rating={false}/> }</p>
                                </div>
                                <p>{spot.price} night</p>
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
