import './CreateSpot.css'

const CreateSpot = () => {
    return (
        <>
            <div className="form-container">
                <p>Create a spot!</p>
                <h1>Create a new spot</h1>
                <p>Where&apos;s your place loacated?</p>
                <p>Guests will only get your exact address once theyve booked a reservation</p>
                <form action="">
                    <div>
                        <label>
                            Country
                            <input type="text" />
                        </label>
                    </div>
                    <div>
                        <label>
                            Street Address
                            <input type="text" />
                        </label>
                    </div>
                    <div className='side-by-side'>
                        <label>
                            city
                            <input type="text" />
                        </label>
                        <label>
                            State
                            <input type="text" />
                        </label>
                    </div>
                    <div className='side-by-side'>
                        <label>
                            Longitude
                            <input type="text" />
                        </label>
                        <label>
                            Latitude
                            <input type="text" />
                        </label>
                    </div>
                    <div>
                        <p>Describe your place to guests</p>
                        <p>Mention the best features of your space, any special amentities like
                            fast wifi or parking, and what you love about the neighborhood.</p>
                    </div>
                    <div>
                        <label>
                            <textarea placeholder='Please write at least 30 characters'></textarea>
                        </label>
                    </div>
                    <div>
                        <p>Create a title for your spot</p>
                        <p>Catch guests&apos; attention with a spot title that highlights what makes
                            your place special.</p>
                    </div>
                    <div>
                        <label>
                            <textarea placeholder='Name of your spot'></textarea>
                        </label>
                    </div>
                    <div>
                        <p>Set a base price for your spot</p>
                        <p>Competitive pricing can help your listing stand out and rank higher
                            in search results</p>
                    </div>
                    <div>
                        <label>
                            $<textarea placeholder='Price per night (USD)'></textarea>
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
                </form>
            </div>
        </>
    )
}


export default CreateSpot
