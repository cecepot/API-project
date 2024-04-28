

const SpotImage = ({ spot }) => {
    // console.log(spot)
    let imageArray
    if (spot && spot.SpotImages) {
        imageArray = [...spot.SpotImages]
    }
    //  console.log(imageArray)


    return (
        <>
            <div className="image-grid">
                <div className="a">
                    {imageArray && (imageArray[0] && <img loading="lazy"  src={imageArray[0].url} alt="" />)}
                </div>
                <div className="b">
                    {imageArray && (imageArray[1] && <img loading="lazy"  src={imageArray[1].url} alt="" />)}
                </div>
                <div className="c">
                    {imageArray && (imageArray[2] && <img loading="lazy"  src={imageArray[2].url} alt="" />)}
                </div>
                <div className="d">
                    {imageArray && (imageArray[3] && <img loading="lazy"  src={imageArray[3].url} alt="" />)}
                </div>
                <div className="e">
                    {imageArray && (imageArray[4] && <img loading="lazy"  src={imageArray[4].url} alt="" />)}
                </div>
            </div>
        </>
    )
}

export default SpotImage
