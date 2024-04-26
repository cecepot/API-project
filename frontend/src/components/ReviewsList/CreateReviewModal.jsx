import { useDispatch } from "react-redux"
import { useModal } from "../../context/Modal"
import { useEffect, useState } from "react";
import { createNewReview, fetchReviews } from "../../store/reviewsReducer";
import { fetchCurrentSpot } from "../../store/spotsReducer";
import { FaStar } from "react-icons/fa";
import './Review.css'


const CreateReviewModal = ({ id }) => {
    const [reviewText, setReviewText] = useState('')
    const [starRating, setStarRating] = useState('')
    const [activeRating, setActiveRating] = useState()
    const [errors, setErrors] = useState({})
    const [oneReviewError, setOneReviewError] = useState('')
    const [class1, setClass1] = useState('empty')
    const [class2, setClass2] = useState('empty')
    const [class3, setClass3] = useState('empty')
    const [class4, setClass4] = useState('empty')
    const [class5, setClass5] = useState('empty')

    const dispatch = useDispatch()
    // console.log(id)

    const { closeModal } = useModal();

    console.log(starRating)


    // useEffect(()=>{
    //     // setActiveRating(starRating)
    //     const onchange = (number) => {
    //         setStarRating(number)
    //     }
    // },[starRating])


    useEffect(() => {
        if (activeRating == 1 || starRating >= 1) {
            setClass1('filled')
        }else{
            setClass1('empty')
        }

        if (activeRating == 2 || starRating >= 2) {
            setClass1('filled')
            setClass2('filled')
        }else{
            setClass2('empty')
        }

        if (activeRating == 3 || starRating >= 3) {
            setClass1('filled')
            setClass2('filled')
            setClass3('filled')
        }else{
            setClass3('empty')
        }

        if (activeRating == 4 || starRating >= 4) {
            setClass1('filled')
            setClass2('filled')
            setClass3('filled')
            setClass4('filled')
        }else{
            setClass4('empty')
        }

        if (activeRating == 5 || starRating >= 5) {
            setClass1('filled')
            setClass2('filled')
            setClass3('filled')
            setClass4('filled')
            setClass5('filled')
        }else{
            setClass5('empty')
        }
    }, [activeRating, starRating, class1, class2, class3, class4, class5])

    const onChange = (num) => {
        // setStarRating(num)
        setStarRating(num)
    }






    const handleSubmit = async (e) => {
        e.preventDefault()

        const reviewPayload = {}
        if (reviewText) reviewPayload.review = reviewText
        if (starRating) reviewPayload.stars = starRating
        console.log(reviewPayload)

        const newReview = await dispatch(createNewReview(reviewPayload, id)).catch(
            async (res) => {
                const data = await res.json();
                // console.log(res)
                if (data && data.errors) {
                    setErrors(data.errors);
                }
                if (data && res.status !== 201) {
                    setOneReviewError(data.message)
                }
            }
        )
        // console.log(errors)
        if (newReview) {
            dispatch(fetchReviews(id))
            dispatch(fetchCurrentSpot(id))
            return closeModal()
        }
    }


    return (
        <div >
            <form onSubmit={handleSubmit}>
                <h1>How was your stay?</h1>
                <div>
                    <p className='error'>{oneReviewError && `${oneReviewError}`}</p>
                    <p className='error'>{errors.review && `${errors.review}`}</p>
                    <label>
                        {/* <p className='error'>{errors.description && `${errors.description}`}</p> */}
                        <textarea placeholder='Leave your review here ...'
                            required
                            onChange={e => setReviewText(e.target.value)}
                        // value={description}
                        // Set the description variable to the value in the input box
                        // onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </label>
                </div>
                <div>
                    <p className='error'>{errors.starRating && `${errors.starRating}`}</p>
                        <div className="rating-input row">
                            <div className={class1} onClick={() => onChange('1')} onMouseEnter={() => { setActiveRating('1') }} onMouseLeave={() => { setActiveRating('') }} >
                                <FaStar />
                            </div>
                            <div className={class2} onClick={() => onChange('2')} onMouseEnter={() => { setActiveRating('2') }} onMouseLeave={() => { setActiveRating('') }}>
                                <FaStar  />
                            </div>
                            <div className={class3} onClick={() => onChange('3')} onMouseEnter={() => { setActiveRating('3') }} onMouseLeave={() => { setActiveRating('') }}>
                                <FaStar  />
                            </div>
                            <div className={class4} onClick={() => onChange('4')} onMouseEnter={() => { setActiveRating('4') }} onMouseLeave={() => { setActiveRating('') }}>
                                <FaStar  />
                            </div>
                            <div className={class5} onClick={() => onChange('5')} onMouseEnter={() => { setActiveRating('5') }} onMouseLeave={() => { setActiveRating('') }} >
                                <FaStar />
                            </div>
                    </div>
                </div>
                <button type="submit">Submit Your Review</button>
            </form>
        </div>
    )
}

export default CreateReviewModal
