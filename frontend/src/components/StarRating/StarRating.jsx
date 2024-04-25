import { FaStar } from "react-icons/fa";
import './StarRating.css'


const StarRating = ({ rating }) => {
    // console.log(typeof rating)
    if (rating) {
        let decimalRating = rating.toFixed(2)
        return (
            <span className="adjacent">
                <FaStar /> {decimalRating}
            </span>
        )
    }else{
        return (
            <span className="adjacent">
                <FaStar /> New
            </span>
        )
    }

}

export default StarRating
