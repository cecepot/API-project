import './CreateSpot.css'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { CreatNewSpot } from '../../store/spotsReducer'
// import {useNavigate} from 'react-router-dom'

const CreateSpot = () => {
    const dispatch = useDispatch()
    // const navigate = useNavigate()
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


          return  dispatch(CreatNewSpot(Spotpayload)).catch(
            async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                  setErrors(data.errors);
                  console.log(errors)
                }
              }
          )


    }



    return (
        <>
            <div className="form-container">
                <p>Create a spot!</p>
                <h1>Create a new spot</h1>
                <p>Where&apos;s your place loacated?</p>
                <p>Guests will only get your exact address once theyve booked a reservation</p>
                <form onSubmit={handlesubmit}>
                    <div>
                        <p className='error'>{errors.country && `${errors.country}`}</p>
                        <label>
                            Country
                            <input type="text"
                                // Set the country variable to the value in the input box
                                onChange={(e) => setCountry(e.target.value)} />
                        </label>
                    </div>
                    <div>
                        <label>
                        <p className='error'>{errors.address && `${errors.address}`}</p>
                            Street Address
                            <input type="text"
                                // Set the country variable to the value in the input box
                                onChange={(e) => setAddress(e.target.value)} />
                        </label>
                    </div>
                    <div className='side-by-side'>
                        <label>
                        <p className='error'>{errors.city && `${errors.city}`}</p>
                            city
                            <input type="text"
                                // Set the city variable to the value in the input box
                                onChange={(e) => setCity(e.target.value)} />
                        </label>
                        <label>
                        <p className='error'>{errors.state && `${errors.state}`}</p>
                            State
                            <input type="text"
                                // Set the state variable to the value in the input box
                                onChange={(e) => setState(e.target.value)} />
                        </label>
                    </div>
                    <div className='side-by-side'>
                        <label>
                        <p className='error'>{errors.lng && `${errors.lng}`}</p>
                            Longitude
                            <input type="text"
                                // Set the longitude variable to the value in the input box
                                onChange={(e) => setLng(e.target.value)} />
                        </label>
                        <label>
                        <p className='error'>{errors.lat && `${errors.lat}`}</p>
                            Latitude
                            <input type="text"
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
                                // Set the description variable to the value in the input box
                                onChange={(e) => setPrice(e.target.value)}></textarea>
                        </label>
                    </div>
                    <div>
                        <p>Liven up your spot with photos</p>
                        <p>Submit a link to at least one photo to publish your spot.</p>
                    </div>
                    <div>
                        <label>
                            <input type="text" placeholder='Preview Image URL' />
                        </label>
                    </div>
                    <div>
                        <label>
                            <input type="text" placeholder='Image URL' />
                        </label>
                    </div>
                    <div>
                        <label>
                            <input type="text" placeholder='Image URL' />
                        </label>
                    </div>
                    <div>
                        <label>
                            <input type="text" placeholder='Image URL' />
                        </label>
                    </div>
                    <div>
                        <label>
                            <input type="text" placeholder='Image URL' />
                        </label>
                    </div>
                    <div>
                        <button type='submit'>Create Spot</button>
                    </div>
                </form>
            </div>
        </>
    )
}


export default CreateSpot
