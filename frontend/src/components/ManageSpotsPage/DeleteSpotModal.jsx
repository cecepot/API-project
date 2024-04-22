import { useDispatch, useSelector } from "react-redux"
import { deleteCurrentSpot } from "../../store/spotsReducer"
import { fetchUserSpots } from '../../store/spotsReducer'
import { useNavigate } from "react-router-dom"
import { useModal } from "../../context/Modal"
const DeleteSpotModal = ({currentSpot}) => {
    const { closeModal } = useModal();
    // console.log(closeModal)
    // const currentSpot = currentSpot
    // console.log(currentSpot)
    const spotId = (currentSpot && currentSpot.id)
    console.log(spotId)
    const navigate = useNavigate()
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
            <button onClick={handleClick}>Yes</button>
            </div>
            <div>
            <button onClick={close}>No</button>
            </div>
        </div>
    )

}

export default DeleteSpotModal
