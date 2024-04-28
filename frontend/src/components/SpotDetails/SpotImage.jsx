

const SpotImage = ({spot}) =>{
    console.log(spot)
    let imageArray
    if (spot.SpotImages){
        imageArray = [...spot.SpotImages]
    }
 console.log(imageArray)


return(
    <>
   <div className="image-grid">
    {imageArray[0] && <img className="a" src={imageArray[0].url} alt="" /> }
    {imageArray[1] && <img className="b" src={imageArray[1].url} alt="" /> }
    {imageArray[2] && <img className="c" src={imageArray[2].url} alt="" /> }
    {imageArray[3] && <img className="d" src={imageArray[3].url} alt="" /> }
    {imageArray[4] && <img className="e" src={imageArray[4].url} alt="" /> }
   </div>
    </>
)
}

export default SpotImage
