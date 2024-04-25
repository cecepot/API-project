import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useLocation} from 'react-router-dom'
import { updateCurrentSpot } from '../../store/spotsReducer'





export const UpdateSpot = () => {
    // console.log({spotId})
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const data = location.state
    const spotId = data.id
    console.log(data)
    // console.log(currentSpot)

    const [address, setAddress] = useState(data.address)
    const [city, setCity] = useState(data.city)
    const [state, setState] = useState(data.state)
    const [country, setCountry] = useState(data.country)
    const [lat, setLat] = useState(data.lat)
    const [lng, setLng] = useState(data.lng)
    const [name, setName] = useState(data.name)
    const [description, setDescription] = useState(data.description)
    const [price, setPrice] = useState(data.price)
    const [errors, setErrors] = useState({});
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
        }
        // reset()

        console.log(price)
        const Spotpayload = {}
        if (address) Spotpayload.address = address
        if (city) Spotpayload.city = city
        if (state) Spotpayload.state = state
        if (country) Spotpayload.country = country
        if (lat) Spotpayload.lat = lat
        if (lng) Spotpayload.lng = lng
        if (name) Spotpayload.name = name
        if (description) Spotpayload.description = description
        if (price){Spotpayload.price =price}
        // console.log(previewImage)


        const updatedSpot = await dispatch(updateCurrentSpot(Spotpayload, spotId)).catch(
            async (res) => {
                const data = await res.json();
                // console.log(data)
                if (data && data.errors) {
                    setErrors(data.errors)
                    // console.log(errors)
                }
            }
        )
        // console.log(updatedSpot)

        if (updatedSpot) {
            reset()
            navigate(`/spots/${updatedSpot.id}`)
        }


    }





    return (
        <>
            <div className="form-container">
                <h1>Update your Spot</h1>
                <p>Where&apos;s your place loacated?</p>
                <p>Guests will only get your exact address once theyve booked a reservation</p>
                <form onSubmit={handlesubmit}>
                    <div>
                        <p className='error'>{errors.country && `${errors.country}`}</p>
                        <label>
                            Country
                            <input type="text"
                            required
                            value={country}
                            placeholder='country'
                                // Set the country variable to the value in the input box
                                onChange={(e) => setCountry(e.target.value)} />
                        </label>
                    </div>
                    <div>
                        <label>
                            <p className='error'>{errors.address && `${errors.address}`}</p>
                            Street Address
                            <input type="text"
                            required
                            value={address}
                            placeholder='address'
                                // Set the country variable to the value in the input box
                                onChange={(e) => setAddress(e.target.value)} />
                        </label>
                    </div>
                    <div className='side-by-side'>
                        <label>
                            <p className='error'>{errors.city && `${errors.city}`}</p>
                            city
                            <input type="text"
                            required
                            value={city}
                            placeholder='city'
                                // Set the city variable to the value in the input box
                                onChange={(e) => setCity(e.target.value)} />
                        </label>
                        <label>
                            <p className='error'>{errors.state && `${errors.state}`}</p>
                            State
                            <input type="text"
                            required
                            value={state}
                            placeholder='state'
                                // Set the state variable to the value in the input box
                                onChange={(e) => setState(e.target.value)} />
                        </label>
                    </div>
                    <div className='side-by-side'>
                        <label>
                            <p className='error'>{errors.lng && `${errors.lng}`}</p>
                            Longitude
                            <input type="number"
                            required
                            min = '-180'
                            max = '180'
                            step = '0.000001'
                            value={lng}
                            placeholder='longitude'
                                // Set the longitude variable to the value in the input box
                                onChange={(e) => setLng(e.target.value)} />
                        </label>
                        <label>
                            <p className='error'>{errors.lat && `${errors.lat}`}</p>
                            Latitude
                            <input type="number"
                            required
                            min = '-90'
                            max = '90'
                            step = '0.000001'
                            value={lat}
                            placeholder='latitude'
                                // Set the latitude variable to the value in the input box
                                onChange={(e) => setLat(e.target.value)} />
                        </label>
                    </div>
                    <div>
                        <p>Describe your place to guests</p>
                        <p>Mention the best features of your space, any special amentities like
                            fast wifi or parking, and what you love about the neighborhood.</p>
                    </div>
                    <div>
                        <label>
                            <p className='error'>{errors.description && `${errors.description}`}</p>
                            <textarea
                            required
                            value={description}
                            placeholder='description needs a minimum of thirty characters'
                                // Set the description variable to the value in the input box
                                onChange={(e) => setDescription(e.target.value)}></textarea>
                        </label>
                    </div>
                    <div>
                        <p>Create a title for your spot</p>
                        <p>Catch guests&apos; attention with a spot title that highlights what makes
                            your place special.</p>
                    </div>
                    <div>
                        <label>
                            <p className='error'>{errors.name && `${errors.name}`}</p>
                            <textarea
                            required
                            value={name}
                            placeholder='name of your spot'
                                // Set the name variable to the value in the input box
                                onChange={(e) => setName(e.target.value)}></textarea>
                        </label>
                    </div>
                    <div>
                        <p>Set a base price for your spot</p>
                        <p>Competitive pricing can help your listing stand out and rank higher
                            in search results</p>
                    </div>
                    <div>
                        <label>
                            <p className='error'>{errors.price && `${errors.price}`}</p>
                            $<input
                            type = 'number'
                            step="0.01"
                            min = '1.00'
                            required
                            value={price}
                            placeholder='price per night (USD)'
                                // Set the description variable to the value in the input box
                                onChange={(e) => {
                                    setPrice(e.target.value)
                                    } }></input>
                        </label>
                    </div>
                    <div>
                        <button type='submit' >Update Spot</button>
                    </div>
                </form>
            </div>
        </>
    )
}


export default UpdateSpot
