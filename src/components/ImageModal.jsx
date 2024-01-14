
const ImageModal = (props) => {

  return (
    <div className="overlay">
      <div className="image-modal">
        <img src={props.image} alt="" />
      </div>
    </div> 
  )
}

export default ImageModal;