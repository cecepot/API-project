import { useDispatch} from "react-redux"
import { deleteCurrentSpot } from "../../store/spotsReducer"
import { fetchUserSpots } from '../../store/spotsReducer'
import { useModal } from "../../context/Modal"
import './ManageSpots.css'

const DeleteSpotModal = ({currentSpot}) => {
    const { closeModal } = useModal();
    // console.log(closeModal)
    // const currentSpot = currentSpot
    // console.log(currentSpot)
    const spotId = (currentSpot && currentSpot.id)
    console.log(spotId)
    const dispatch = useDispatch()
    const handleClick = async(e) =>{
        e.preventDefault()

        await dispatch(deleteCurrentSpot(spotId))
        .then (closeModal)
        dispatch(fetchUserSpots())
    }

    const close = (e) =>{
        e.preventDefault()
        return closeModal()
    }

    return (
        <div >
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to remove this spot
                from the listings?
            </p>
            <div>
            <button className="delete" onClick={handleClick}>Yes (Delete Spot)</button>
            </div>
            <div>
            <button className='keep' onClick={close}>No (Keep Spot)</button>
            </div>
        </div>
    )

}

export default DeleteSpotModal
