
const ImageModal = (props) => {


  const handleClick = () => {
    props.setIsOpen(false)
  }

  return props.isOpen ? (
    <div className="overlay" onClick={handleClick}>
      <div className="image-modal">
        <img onClick={handleClick} src={props.image} />
      </div>
    </div> 
  ) :
  null
}

export default ImageModal;