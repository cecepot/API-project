import { useEffect} from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, NavLink } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { fetchUserSpots } from '../../store/spotsReducer'
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem"
import DeleteSpotModal from "./DeleteSpotModal"
import { FaStar } from "react-icons/fa";

const ManageSpots = () => {
    const dispatch = useDispatch()
    const spots = useSelector((state) => state.spotState.Spots)
    const navigate = useNavigate()

    // console.log(spots)
    useEffect(() => {
        dispatch(fetchUserSpots())
    }, [dispatch])

    const handleClick = (spot)=>{
        navigate(`../spots/${spot.id}/edit`, {state: spot})
    }

    if(spots){
        if(spots.length === 0){
            return(
                <>
    <NavLink className='Link vt323-regular' to='/spots' >Create a new spot</NavLink>
                </>
            )
        }
    }

    return (
        <>
            <h1 className="vt323-regular">Manage Spots</h1>
            <ul className="tiles">
                {/* The logical && operator ensures that the state is not null before calling map on the spots */}
                {spots && spots.map((spot) => {
                    return (
                        <div key={spot.id}>
                            <Link to={`../spots/${spot.id}`}  className="Link">
                                <li className="spot-container">
                                    <div className="tooltip-container">
                                        <img src={`${spot.previewImage}`} alt="" />
                                        <p className="spot-name">{spot.name}</p>
                                    </div>
                                    <div className="details">
                                        <div className="upper-details">
                                            <p>{spot.city}, {spot.state}</p>
                                            <p>{spot.avgRating ? <span><FaStar />{spot.avgRating}</span>  : 'New'}</p>
                                        </div>
                                        <p><span className="bold">{spot.price}</span> night</p>
                                    </div>
                                </li>
                            </Link>
                            <div>
                                <button className='red hover'onClick={(e)=>{
                                    e.preventDefault()
                                    // console.log(spot)
                                    // const clickedSpot = spot
                                    handleClick(spot)
                                }}>Update</button>
                                <button className='red hover'>
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
