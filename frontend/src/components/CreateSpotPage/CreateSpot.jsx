import './CreateSpot.css'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { CreatNewSpot} from '../../store/spotsReducer'
import { useNavigate } from 'react-router-dom'



const CreateSpot = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [country, setCountry] = useState('')
    const [lat, setLat] = useState('')
    const [lng, setLng] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [previewImage, setPreviewImage] = useState('')
    const [image1, setImage1] = useState('')
    const [image2, setImage2] = useState('')
    const [image3, setImage3] = useState('')
    const [image4, setImage4] = useState('')
    const [errors, setErrors] = useState({});
    const [imageError, setImageError] = useState('')
    // const[bool, setBool]= useState(false)
    // const [descriptionErr, setDescriptionErr] = useState('')

    // const handleDescription = (e)=>{
    //     setDescription(e.target.value)
    //     if(e.target.value.length < 30){
    //         setDescriptionErr('description needs a minimum of thirty characters')
    //         setBool(true)
    //     }else{
    //         setDescriptionErr('')
    //         setBool(false)
    //     }
    // }


    const handlesubmit = async (e) => {
        e.preventDefault()
        setErrors({})
        const Spotpayload = {
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price
        }
        // console.log(previewImage)
        const imageArray = []
        if (!previewImage) {
            const err = new Error('This field is required')
            setImageError(err.message)
            //  console.log(imageError)
        }

        previewImage && imageArray.push(previewImage)
        image1 && imageArray.push(image1)
        image2 && imageArray.push(image2)
        image3 && imageArray.push(image3)
        image4 && imageArray.push(image4)
        // console.log(imageArray)
        // console.log(JSON.stringify(imageArray[0]))

        const reset = () => {
            setAddress('')
            setCity('')
            setState('')
            setCountry('')
            setLat('')
            setLng('')
            setName('')
            setDescription('')
            setPrice('')
            setPreviewImage('')
            setImage1('')
            setImage2('')
            setImage3('')
            setImage4('')
        }

        let allImages = []
        // console.log(imageArray)
        if (imageArray.length) {
            imageArray.forEach((image) => {
                allImages.push({ url: image })
            })
        }
        // console.log({allImages})
        let newSpot;
        newSpot = await dispatch(CreatNewSpot(Spotpayload, allImages)).catch(
            async (res) => {
                const data = await res.json();
                // console.log(data)
                if (data && data.errors) {
                    setErrors(data.errors);
                    // console.log(errors)
                }
            }
        )

        if (newSpot) {
            reset()
            navigate(`/spots/${newSpot.id}`)
        }

        // console.log({newSpot})



    }



    return (
        <>
            <div className="form-container">
                <h1>Create a new spot</h1>
                <h2>Where&apos;s your place located?</h2>
                <p>Guests will only get your exact address once they&apos;ve booked a reservation</p>
                <form  className='column'onSubmit={handlesubmit}>
                    <div className='color'>
                        <p className='error'>{errors.country && `${errors.country}`}</p>
                        <label>
                            Country
                            <br />
                            <input className='label' type="text"
                            // required
                            value={country}
                            placeholder='country'
                                // Set the country variable to the value in the input box
                                onChange={(e) => setCountry(e.target.value)} />
                        </label>
                    </div>
                    <div className='color'>
                        <label>
                            <p className='error'>{errors.address && `${errors.address}`}</p>
                            Street Address
                            <br />
                            <input className='label' type="text"
                            // required
                            value={address}
                            placeholder='address'
                                // Set the country variable to the value in the input box
                                onChange={(e) => setAddress(e.target.value)} />
                        </label>
                    </div>
                    <div className='side-by-side color'>
                        <label>
                            <p className='error'>{errors.city && `${errors.city}`}</p>
                            City
                            <br />
                            <input className='label' type="text"
                            //  required
                             value={city}
                             placeholder='city'
                                // Set the city variable to the value in the input box
                                onChange={(e) => setCity(e.target.value)} />
                        </label>
                        <label>
                            <p className='error'>{errors.state && `${errors.state}`}</p>
                            State
                            <br />
                            <input className='label' type="text"
                            // required
                            placeholder='state'
                            value={state}
                                // Set the state variable to the value in the input box
                                onChange={(e) => setState(e.target.value)} />
                        </label>
                    </div>
                    <div className='side-by-side color'>
                        <label>
                            <p className='error'>{errors.lng && `${errors.lng}`}</p>
                            Longitude
                            <br />
                            <input className='label' type="text"
                            placeholder='longitude'
                            //  min = '-180'
                            //  max = '180'
                            //  required
                             value={lng}
                                // Set the longitude variable to the value in the input box
                                onChange={(e) => setLng(e.target.value)} />
                        </label>
                        <label>
                            <p className='error'>{errors.lat && `${errors.lat}`}</p>
                            Latitude
                            <br />
                            <input className='label' type="text"
                            placeholder='latitude'
                            // min = '-90'
                            // max = '90'
                            // required
                            value={lat}
                                // Set the latitude variable to the value in the input box
                                onChange={(e) => setLat(e.target.value)} />
                        </label>
                    </div>
                    <hr />
                    <div>
                        <h2>Describe your place to guests</h2>
                        <p>Mention the best features of your space, any special amentities like
                            fast wifi or parking, and what you love about the neighborhood.</p>
                    </div>
                    <div>
                        <label>
                            <p className='error'>{errors.description && `${errors.description}`}</p>
                            <textarea className='label' placeholder='Please write at least 30 characters'
                            // required
                            value={description}
                            // minLength= '30'
                                // Set the description variable to the value in the input box
                                onChange={(e) => setDescription(e.target.value)}></textarea>
                        </label>
                    </div>
                    <hr />
                    <div>
                        <h2>Create a title for your spot</h2>
                        <p>Catch guests&apos; attention with a spot title that highlights what makes
                            your place special.</p>
                    </div>
                    <div>
                        <label>
                            <p className='error'>{errors.name && `${errors.name}`}</p>
                            <textarea className='label' placeholder='Name of your spot'
                            // required
                            // maxLength= '50'
                            value={name}
                                // Set the name variable to the value in the input box
                                onChange={(e) => setName(e.target.value)}></textarea>
                        </label>
                    </div>
                    <hr />
                    <div>
                        <h2>Set a base price for your spot</h2>
                        <p>Competitive pricing can help your listing stand out and rank higher
                            in search results</p>
                    </div>
                    <div>
                        <label>
                            <p className='error'>{errors.price && `${errors.price}`}</p>
                            $<input className='label'
                            type='text'
                            placeholder='Price per night (USD)'
                            // required
                            // min = '1'
                            // step='0.01'
                            value={price}
                                // Set the description variable to the value in the input box
                                onChange={(e) => setPrice(e.target.value)}></input>
                        </label>
                    </div>
                    <hr />
                    <div>
                        <h2>Liven up your spot with photos</h2>
                        <p>Submit a link to at least one photo to publish your spot.</p>
                    </div>
                    <div>
                        <label>
                            <p className='error'>{imageError && `${imageError}`}</p>
                            <input className='label' type="url" placeholder='Preview Image URL'
                            required
                            value={previewImage}
                                onChange={(e) => setPreviewImage(e.target.value)} />
                        </label>
                    </div>
                    <div>
                        <label>
                            <input className='label' type="url" placeholder='Image URL'
                                onChange={(e) => setImage1(e.target.value)} />
                        </label>
                    </div>
                    <div>
                        <label>
                            <input className='label' type="url" placeholder='Image URL'
                                onChange={(e) => setImage2(e.target.value)} />
                        </label>
                    </div>
                    <div>
                        <label>
                            <input className='label' type="url" placeholder='Image URL'
                                onChange={(e) => setImage3(e.target.value)} />
                        </label>
                    </div>
                    <div>
                        <label>
                            <input className='label' type="url" placeholder='Image URL'
                                onChange={(e) => setImage4(e.target.value)} />
                        </label>
                    </div>
                    <div>
                        <button type='submit' className='red hover'>Create Spot</button>
                    </div>
                </form>
            </div>
        </>
    )
}


export default CreateSpot
