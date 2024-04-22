import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { fetchUserSpots } from '../../store/spotsReducer'
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem"
import DeleteSpotModal from "./DeleteSpotModal"


const ManageSpots = () => {
    const dispatch = useDispatch()
    const spots = useSelector((state) => state.spotState.Spots)


    // console.log(spots)
    useEffect(() => {
        dispatch(fetchUserSpots())
    }, [dispatch])

    return (
        <>
            <h1>Manage Spots</h1>
            <ul className="tiles">
                {/* The logical && operator ensures that the state is not null before calling map on the spots */}
                {spots && spots.map((spot) => {
                    return (
                        <div>
                            <Link to={`../spots/${spot.id}`} key={spot.id} className="Link">
                                <li className="spot-container">
                                    <div className="tooltip-container">
                                        <img src={`${spot.previewImage}`} alt="" />
                                        <p className="spot-name">{spot.name}</p>
                                    </div>
                                    <div className="details">
                                        <div className="upper-details">
                                            <p>{spot.city}, {spot.state}</p>
                                            <p>{spot.avgRating ? spot.avgRating : 'New'}</p>
                                        </div>
                                        <p>{spot.price} night</p>
                                    </div>
                                </li>
                            </Link>
                            <div>
                                <button>Update</button>
                                <button>
                                    <OpenModalMenuItem
                                        itemText='Delete'
                                        modalComponent={<DeleteSpotModal currentSpot={spot}/>} />
                                </button>
                            </div>
                        </div>
                    )

                }
                )}
            </ul>
        </>
    )

}

export default ManageSpots
