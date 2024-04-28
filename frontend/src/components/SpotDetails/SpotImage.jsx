

const SpotImage = ({spot}) =>{
    // console.log(spot)
    let imageArray
    if (spot && spot.SpotImages){
        imageArray = [...spot.SpotImages]
    }
//  console.log(imageArray)


return(
    <>
   <div className="image-grid">
    {imageArray && (imageArray[0] && <img loading="lazy" className="a" src={imageArray[0].url} alt="" /> )}
    {imageArray && (imageArray[1] && <img loading="lazy" className="b" src={imageArray[1].url} alt="" /> )}
    {imageArray && (imageArray[2] && <img loading="lazy" className="c" src={imageArray[2].url} alt="" /> )}
    {imageArray && (imageArray[3] && <img loading="lazy" className="d" src={imageArray[3].url} alt="" /> )}
    {imageArray && (imageArray[4] && <img loading="lazy" className="e" src={imageArray[4].url} alt="" /> )}
   </div>
    </>
)
}

export default SpotImage
