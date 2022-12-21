import { useState } from "react"
import { AiOutlineRight, AiOutlineLeft } from 'react-icons/ai';

const slides = [
  { url: "https://i.imgur.com/qeX6zya.jpg" },
  { url: "https://i.imgur.com/XHG4uWD.jpg" },
  { url: "https://i.imgur.com/BrotgYi.jpg" },
  { url: "https://i.imgur.com/l809yPd.png" },
  { url: "https://i.imgur.com/ndLG7I6.jpg" },
]



export function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(1)

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex);
  }

  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1
    setCurrentIndex(newIndex);
  }



  const slideStyles = {
    width: "100%",
    height: "100%",
    transition: "all .4s ease-in-out",
    backgroundImage: `url(${slides[currentIndex].url})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center"
  }

  return (
    <div className="carousel" style={{ height: "80vh" }}>
      <div className="slides" style={{ height: "100%" }}>
        <div className="slide" style={slideStyles}>
          <div className="content">
            <h1>{slides[currentIndex].content}</h1>
          </div>
          <div className="righ-arrow" onClick={goToNext}><AiOutlineRight size={50} /></div>
          <div className="left-arrow" onClick={goToPrevious}><AiOutlineLeft size={50} /></div>
        </div>
      </div>
    </div>
  )
}
