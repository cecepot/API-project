import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { updateCurrentSpot } from '../../store/spotsReducer'


export const UpdateSpot = () => {
    const {spotId} = useParams()
    // console.log({spotId})
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
    const [errors, setErrors] = useState({});
    const handlesubmit = async (e) => {
        e.preventDefault()

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


        const Spotpayload = {}
        if (address) Spotpayload.address = address
        if (city) Spotpayload.city = city
        if (state) Spotpayload.state = state
        if (country) Spotpayload.country = country
        if (lat) Spotpayload.lat = lat
        if (lng) Spotpayload.lng = lng
        if (name) Spotpayload.name = name
        if (description) Spotpayload.description = description
        if (price){Spotpayload.price = price}
        // console.log(previewImage)


        const updatedSpot = await dispatch(updateCurrentSpot(Spotpayload, spotId)).catch(
            async (res) => {
                const data = await res.json();
                // console.log(data)
                if (data && data.errors) {
                    setErrors(data.errors);
                    // console.log(errors)
                }
            }
        )
        console.log(updatedSpot)

        if (!errors.length) {
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
                                // Set the city variable to the value in the input box
                                onChange={(e) => setCity(e.target.value)} />
                        </label>
                        <label>
                            <p className='error'>{errors.state && `${errors.state}`}</p>
                            State
                            <input type="text"
                            required
                            value={state}
                                // Set the state variable to the value in the input box
                                onChange={(e) => setState(e.target.value)} />
                        </label>
                    </div>
                    <div className='side-by-side'>
                        <label>
                            <p className='error'>{errors.lng && `${errors.lng}`}</p>
                            Longitude
                            <input type="text"
                            required
                            value={lng}
                                // Set the longitude variable to the value in the input box
                                onChange={(e) => setLng(e.target.value)} />
                        </label>
                        <label>
                            <p className='error'>{errors.lat && `${errors.lat}`}</p>
                            Latitude
                            <input type="text"
                            required
                            value={lat}
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
                            <textarea placeholder='Please write at least 30 characters'
                            required
                            value={description}
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
                            <textarea placeholder='Name of your spot'
                            required
                            value={name}
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
                            $<textarea placeholder='Price per night (USD)'
                            required
                            value={price}
                                // Set the description variable to the value in the input box
                                onChange={(e) => {
                                    setPrice(e.target.value)
                                    } }></textarea>
                        </label>
                    </div>
                    <div>
                        <button type='submit'>Update Spot</button>
                    </div>
                </form>
            </div>
        </>
    )
}


export default UpdateSpot
